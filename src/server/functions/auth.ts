/** biome-ignore-all lint/correctness/useHookAtTopLevel: this is a server component file */
import {
	forgotPasswordFormOptions,
	loginFormOptions,
	registerFormOptions,
	resetPasswordFormOptions,
	zForgotPasswordForm,
	zLoginForm,
	zRegisterForm,
	zResetPasswordForm,
} from "@/forms/auth";
import { UserRole } from "@/server/db/enums";
import {
	deletePasswordReset,
	findPasswordReset,
	findUser,
	insertPasswordReset,
	insertUser,
	invalidatePreviousResets,
} from "@/server/db/queries";
import { PasswordReset, User } from "@/server/db/schema";
import {
	generateSecureToken,
	hashPassword,
	hashToken,
	verifyPassword,
} from "@/server/utils/crypto";
import { sendPasswordResetEmail } from "@/server/utils/mailgun";
import {
	createServerValidate,
	getFormData,
	ServerValidateError,
} from "@tanstack/react-form-start";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import z from "zod";
import { useAppSession } from "../auth";
import { LiteralError } from "../error";
import { checkRateLimit } from "../utils/rate-limiter";

const loginServerValidate = createServerValidate({
	...loginFormOptions,
	onServerValidate: async ({ value }) => {
		const { email, password } = zLoginForm.parse(value);

		const user = await findUser({ email });
		if (!user) {
			return "login.invalid_credentials";
		}

		if (!(await verifyPassword(user.hashedPassword, password))) {
			return "login.invalid_credentials";
		}
	},
});

const registerServerValidate = createServerValidate({
	...registerFormOptions,
	onServerValidate: async ({ value }) => {
		const { email } = zRegisterForm.parse(value);

		const existingUser = await findUser({ email });
		if (existingUser) {
			return "errors.duplicate_email";
		}
	},
});

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new LiteralError("MALFORMED_REQUEST");
		}

		return data;
	})
	.handler(async (ctx) => {
		try {
			const { email } = await loginServerValidate(ctx.data);

			const user = await findUser({ email });
			if (!user) {
				throw new LiteralError("INVALID_CREDENTIALS");
			}
			const session = await useAppSession();
			await session.update({
				userId: user._id.toHexString(),
				role: user.role,
			});

			return redirect({ to: "/map" });
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response;
			}
			return "Internal Server Error";
		}
	});

export const registerFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new LiteralError("MALFORMED_REQUEST");
		}
		return data;
	})
	.handler(async (ctx) => {
		try {
			const { firstName, lastName, email, password } =
				await registerServerValidate(ctx.data);

			const hashedPassword = await hashPassword(password);
			const user = await insertUser({
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				email,
				hashedPassword,
				role: UserRole.USER,
			});

			const session = await useAppSession();
			await session.update({
				userId: user._id.toHexString(),
				role: user.role,
			});

			return redirect({ to: "/map" });
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response;
			}
			console.error(error);
			return "Internal Server Error";
		}
	});

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	const session = await useAppSession();
	await session.clear();
	return { success: true };
});

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await useAppSession();

		if (!session.data.userId) {
			return {
				user: null,
			};
		}

		const user = await findUser({ _id: new ObjectId(session.data.userId) });

		if (!user) {
			return {
				user: null,
			};
		}

		return {
			user: {
				id: user._id.toHexString(),
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
			},
		};
	},
);

export const getFormFn = createServerFn({ method: "GET" }).handler(async () => {
	return getFormData();
});

const forgotPasswordServerValidate = createServerValidate({
	...forgotPasswordFormOptions,
	onServerValidate: async ({ value }) => {
		zForgotPasswordForm.parse(value);
		// No validation errors - we don't reveal if email exists
		return undefined;
	},
});

export const forgotPasswordFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new LiteralError("MALFORMED_REQUEST");
		}
		return data;
	})
	.handler(async (ctx) => {
		try {
			const { email } = await forgotPasswordServerValidate(ctx.data);

			// Find user by email
			const user = await findUser({ email });

			if (user) {
				// Generate secure random token
				const token = generateSecureToken(32);
				const hashedToken = hashToken(token);

				// Invalidate previous tokens
				await invalidatePreviousResets(user._id);

				// Create expiration date (1 hour from now)
				const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

				// Store hashed token in database
				await insertPasswordReset(user._id, hashedToken, expiresAt);

				// Send password reset email
				await sendPasswordResetEmail(email, token);
			}

			// Always return success to prevent email enumeration
			return { success: true, email };
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response;
			}
			console.error(error);
			return { success: false, error: "Internal Server Error" };
		}
	});

const resetPasswordServerValidate = createServerValidate({
	...resetPasswordFormOptions,
	onServerValidate: async ({ value }) => {
		const { password, confirmPassword } = zResetPasswordForm.parse(value);

		if (password !== confirmPassword) {
			return "errors.passwords_do_not_match";
		}

		return undefined;
	},
});

export const resetPasswordFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new LiteralError("MALFORMED_REQUEST");
		}
		return data;
	})
	.handler(async (ctx) => {
		try {
			const { password, token } = await resetPasswordServerValidate(ctx.data);

			// Hash the token to find it in database
			const hashedToken = hashToken(token);

			// Find the reset token
			const resetRecord = await findPasswordReset(hashedToken);

			if (!resetRecord) {
				return { success: false, error: "INVALID_TOKEN" };
			}

			// Check if token is expired
			if (resetRecord.expiresAt < new Date()) {
				// Delete expired token
				await deletePasswordReset(resetRecord._id);
				return { success: false, error: "INVALID_TOKEN" };
			}

			// Find the user
			const user = await findUser({ _id: resetRecord.userId });

			if (!user) {
				return { success: false, error: "INVALID_TOKEN" };
			}

			// Update user password
			const newHashedPassword = await hashPassword(password);
			await User.updateOne(
				{ _id: user._id },
				{ $set: { hashedPassword: newHashedPassword } },
			);

			// Delete the token document
			await deletePasswordReset(resetRecord._id);

			return { success: true };
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response;
			}
			console.error(error);
			return { success: false, error: "Internal Server Error" };
		}
	});

export const resendResetEmailFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			email: z.email(),
		}),
	)
	.handler(async (ctx) => {
		const { email } = ctx.data;

		const user = await findUser({ email });
		if (!user) {
			return {};
		}

		const key = `resend:email:${user._id}`;
		const can = checkRateLimit(key, 2, 60 * 1000 * 5);
		if (!can) {
			return { success: false, error: "RATE_LIMIT_EXCEEDED" };
		}

		const resetAttempt = await PasswordReset.findOne({ userId: user._id });
		if (!resetAttempt) {
			return { success: false, error: "NO_RESET_ATTEMPT" };
		}

		await sendPasswordResetEmail(user.email, resetAttempt.token);
		return { success: true };
	});
