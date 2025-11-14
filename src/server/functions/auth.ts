/** biome-ignore-all lint/correctness/useHookAtTopLevel: this is a server component file */
import {
	createServerValidate,
	getFormData,
	ServerValidateError,
} from "@tanstack/react-form-start";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import {
	loginFormOptions,
	registerFormOptions,
	zLoginForm,
	zRegisterForm,
} from "@/forms/auth";
import { UserRole } from "@/server/db/enums";
import { findUser, insertUser } from "@/server/db/queries";
import { hashPassword, verifyPassword } from "@/server/utils/crypto";
import { useAppSession } from "../auth";
import { LiteralError } from "../error";

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

			throw redirect({ to: "/map" });
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response;
			}
			console.error(error);
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
