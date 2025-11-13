/** biome-ignore-all lint/correctness/useHookAtTopLevel: false */
import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { zLoginForm, zRegisterForm } from "@/forms/auth";
import { UserRole } from "@/server/db/enums";
import { findUser, insertUser } from "@/server/db/queries";
import { hashPassword, verifyPassword } from "@/server/utils/crypto";
import { useAppSession } from "../auth";
import { LiteralError } from "../error";

// const loginServerValidate = createServerValidate({
// 	...loginFormOptions,
// 	onServerValidate: async (data) => {
// 		const { email, password } = zLoginForm.parse(data);

// 		if (typeof email !== "string" || typeof password !== "string") {
// 			throw new LiteralError("MALFORMED_REQUEST");
// 		}

// 		const user = await findUser({ email });
// 		if (!user) return "INVALID_CREDENTIALS";

// 		const ok = await verifyPassword(user.hashedPassword, password);
// 		if (!ok) return "INVALID_CREDENTIALS";
// 	},
// });

// const registerServerValidate = createServerValidate({
//   ...registerFormOptions,
//   onServerValidate: zRegisterForm,
// });

export const getIsAuthenticated = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await useAppSession();

		return Boolean(session.data.userId);
	},
);

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator(zLoginForm)
	.handler(async (ctx) => {
		const { email, password } = ctx.data;

		const user = await findUser({ email });
		if (!user) {
			throw new LiteralError("INVALID_CREDENTIALS");
		}

		const isValidPassword = await verifyPassword(user.hashedPassword, password);
		if (!isValidPassword) {
			throw new LiteralError("INVALID_CREDENTIALS");
		}

		const session = await useAppSession();
		await session.update({
			userId: user._id.toHexString(),
			role: user.role,
		});

		return { success: true };
	});

export const registerFn = createServerFn({ method: "POST" })
	.inputValidator(zRegisterForm)
	.handler(async (ctx) => {
		const { firstName, lastName, email, password } = ctx.data;
		const existingUser = await findUser({ email });
		if (existingUser) {
			throw new LiteralError("EMAIL_ALREADY_USED");
		}

		const hashedPassword = await hashPassword(password);
		const user = await insertUser({
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email,
			hashedPassword,
			role: UserRole.USER,
		});

		const session = await useAppSession();
		session.update({
			userId: user._id.toHexString(),
			role: user.role,
		});

		return { success: true };
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
