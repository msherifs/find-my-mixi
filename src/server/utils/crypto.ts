import { hash, verify } from "argon2";

export async function hashPassword(password: string) {
  return await hash(password);
}

export async function verifyPassword(hash: string, password: string) {
  return await verify(hash, password);
}

export function generateOTP(numberOfDigits: number) {
  const min = Math.pow(10, numberOfDigits - 1);
  const max = Math.pow(10, numberOfDigits) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}
