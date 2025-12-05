import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Env } from "./env";

// Global S3 client instance initialized once at module load
export const s3Client = new S3Client({
	endpoint: Env.SPACES_ENDPOINT,
	region: Env.SPACES_REGION,
	credentials: {
		accessKeyId: Env.SPACES_ACCESS_KEY_ID,
		secretAccessKey: Env.SPACES_SECRET_ACCESS_KEY,
	},
});

export interface S3UploadOptions {
	file: Buffer;
	fileName: string;
	contentType: string;
}

export interface S3UploadResult {
	url: string;
	key: string;
}

/**
 * Sanitize filename to prevent path traversal and other security issues
 */
function sanitizeFileName(fileName: string): string {
	// Remove path separators and keep only the filename
	const baseName = fileName.replace(/^.*[\\/]/, "");
	// Replace any remaining problematic characters
	return baseName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

/**
 * Generate a unique file key using timestamp and UUID to prevent collisions
 */
function generateFileKey(fileName: string): string {
	const timestamp = Date.now();
	const uuid = randomUUID();
	const sanitized = sanitizeFileName(fileName);
	return `uploads/${timestamp}-${uuid}-${sanitized}`;
}

/**
 * Upload file to Digital Ocean Spaces using the global S3 client
 */
export async function uploadToS3(
	options: S3UploadOptions,
): Promise<S3UploadResult> {
	const { file, fileName, contentType } = options;

	try {
		// Generate unique key for the file
		const key = generateFileKey(fileName);

		// Create the upload command
		const command = new PutObjectCommand({
			Bucket: Env.SPACES_BUCKET,
			Key: key,
			Body: file,
			ContentType: contentType,
			ACL: "public-read", // Make file publicly accessible
		});

		// Execute the upload
		await s3Client.send(command);

		// Construct the public URL
		// Digital Ocean Spaces URL format: https://{bucket}.{region}.digitaloceanspaces.com/{key}
		const url = `${Env.SPACES_ENDPOINT}/${Env.SPACES_BUCKET}/${key}`;

		return { url, key };
	} catch (error) {
		// Log the full error for debugging
		console.error("S3 upload error:", error);

		// Return user-friendly error messages based on error type
		if (error instanceof Error) {
			const errorMessage = error.message.toLowerCase();

			// Network/connection errors
			if (
				errorMessage.includes("network") ||
				errorMessage.includes("econnrefused") ||
				errorMessage.includes("timeout")
			) {
				throw new Error("Failed to upload file. Please try again.");
			}

			// Authentication errors
			if (
				errorMessage.includes("credentials") ||
				errorMessage.includes("access denied") ||
				errorMessage.includes("forbidden") ||
				errorMessage.includes("unauthorized")
			) {
				throw new Error("Storage service authentication failed");
			}

			// Quota/storage errors
			if (
				errorMessage.includes("quota") ||
				errorMessage.includes("storage") ||
				errorMessage.includes("space")
			) {
				throw new Error("Storage quota exceeded");
			}
		}

		// Generic error for any other cases
		throw new Error("File upload failed. Please try again.");
	}
}
