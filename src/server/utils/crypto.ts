import { createHash, randomBytes } from "node:crypto";
import { hash, verify } from "argon2";

export async function hashPassword(password: string) {
	return await hash(password);
}

export async function verifyPassword(hash: string, password: string) {
	return await verify(hash, password);
}

export function generateOTP(numberOfDigits: number) {
	const min = 10 ** (numberOfDigits - 1);
	const max = 10 ** numberOfDigits - 1;
	return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export function generateSecureToken(length = 32): string {
	return randomBytes(length).toString("hex");
}

export function hashToken(token: string): string {
	return createHash("sha256").update(token).digest("hex");
}
