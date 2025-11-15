import { formOptions } from "@tanstack/react-form-start";
import z from "zod";
import { ContactUsTopic } from "@/server/db/enums";

export const zContactUsForm = z.object({
	email: z.email({ error: "errors.email" }).trim().toLowerCase(),
	topic: z.enum(ContactUsTopic),
	message: z
		.string({ error: "errors.required" })
		.min(1, { error: "errors.required" })
		.max(1000, { error: "errors.tooLong" })
		.trim(),
});

export const contactUsFormOptions = formOptions({
	defaultValues: {
		email: "",
		topic: "",
		message: "",
	},
});
