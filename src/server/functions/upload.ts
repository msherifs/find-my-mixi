import { createServerFn } from "@tanstack/react-start";
import { uploadToS3 } from "@/server/utils/s3";
import { LiteralError } from "../error";

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed file types (images and common document formats)
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

/**
 * Server function that handles file upload requests
 */
export const uploadFileFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new LiteralError("MALFORMED_REQUEST");
		}
		return data;
	})
	.handler(async (ctx) => {
		try {
			// Extract file from FormData
			const file = ctx.data.get("file");

			// Validate that a file was provided
			if (!file || !(file instanceof File)) {
				return "No file provided";
			}

			// Validate file type
			if (!ALLOWED_MIME_TYPES.includes(file.type)) {
				return "File type not supported";
			}

			// Validate file size
			if (file.size > MAX_FILE_SIZE) {
				return "File size exceeds maximum allowed";
			}

			// Convert file to buffer
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Upload to S3
			const result = await uploadToS3({
				file: buffer,
				fileName: file.name,
				contentType: file.type,
			});

			// Return success response with public URL
			return { url: result.url };
		} catch (error) {
			// Log error for debugging
			console.error("Upload handler error:", error);

			// Return error message
			if (error instanceof Error) {
				return error.message;
			}

			return "File upload failed. Please try again.";
		}
	});
