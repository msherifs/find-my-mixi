import { formOptions } from "@tanstack/react-form-start";
import z from "zod";

export const zLoginForm = z.object({
	email: z.email({ error: "errors.email" }),
	password: z.string({ error: "errors.required" }),
});

export const loginFormOptions = formOptions({
	defaultValues: {
		email: "",
		password: "",
	},
});

export const zRegisterForm = z.object({
	firstName: z
		.string({ error: "errors.required" })
		.min(2, { error: "errors.tooShort" }),
	lastName: z
		.string({ error: "errors.required" })
		.min(2, { error: "errors.tooShort" }),
	email: z.email({ error: "errors.email" }),
	password: z
		.string({ error: "errors.required" })
		.min(6, { error: "errors.password_criteria" }),
});

export const registerFormOptions = formOptions({
	defaultValues: {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	},
});
