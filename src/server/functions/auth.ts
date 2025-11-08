import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import { UserRole } from "@/server/db/enums";
import { findUser, insertUser } from "@/server/db/queries";
import type { UserDocument } from "@/server/db/schema";
import { hashPassword, verifyPassword } from "@/server/utils/crypto";
import { Env } from "../utils/env";
import { signJwtToken } from "../utils/jose";

type PublicUser = Omit<UserDocument, "hashedPassword">;

const sanitizeUser = (user: UserDocument): PublicUser => {
	const { hashedPassword: _hashedPassword, ...publicUser } = user;
	return publicUser;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			email: z.email({ error: "errors.invalidEmail" }),
			password: z
				.string({ error: "errors.passwordRequired" })
				.min(6, { error: "errors.passwordTooShort" })
				.max(100, { error: "errors.passwordTooLong" }),
		}),
	)
	.handler(async ({ data }) => {
		const email = normalizeEmail(data.email);
		const user = await findUser({ email });
		if (!user) {
			throw new Error("Invalid credentials");
		}

		const isValidPassword = await verifyPassword(
			user.hashedPassword,
			data.password,
		);
		if (!isValidPassword) {
			throw new Error("Invalid credentials");
		}

		const { accessToken, expirationDate } = await signJwtToken(
			{
				userId: user._id.toHexString(),
			},
			{ secret: Env.JWT_SECRET },
		);

		setCookie("session_cookie", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: expirationDate.getTime() - Date.now(),
			path: "/",
			sameSite: "lax",
		});

		return {};
	});

export const registerFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			firstName: z
				.string({ error: "errors.firstNameRequired" })
				.min(2, { error: "errors.firstNameTooShort" })
				.max(100, { error: "errors.firstNameTooLong" }),
			lastName: z
				.string({ error: "errors.lastNameRequired" })
				.min(2, { error: "errors.lastNameTooShort" })
				.max(100, { error: "errors.lastNameTooLong" }),
			email: z.email({ error: "errors.invalidEmail" }),
			password: z
				.string({ error: "errors.passwordRequired" })
				.min(6, { error: "errors.passwordTooShort" })
				.max(100, { error: "errors.passwordTooLong" }),
		}),
	)
	.handler(async ({ data }) => {
		const email = normalizeEmail(data.email);
		const existingUser = await findUser({ email });
		if (existingUser) {
			throw new Error("Email already registered");
		}

		const hashedPassword = await hashPassword(data.password);
		const user = await insertUser({
			firstName: data.firstName.trim(),
			lastName: data.lastName.trim(),
			email,
			hashedPassword,
			role: UserRole.USER,
		});

		const { accessToken, expirationDate } = await signJwtToken(
			{
				userId: user._id.toHexString(),
			},
			{ secret: Env.JWT_SECRET },
		);

		setCookie("session_cookie", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: expirationDate.getTime() - Date.now(),
			path: "/",
			sameSite: "lax",
		});
		return {};
	});
