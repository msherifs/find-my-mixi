import {
	createServerValidate,
	getFormData,
	ServerValidateError,
} from "@tanstack/react-form-start";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { contactUsFormOptions, zContactUsForm } from "@/forms/contact-us";
import { insertContactUsSubmission } from "@/server/db/queries";
import { LiteralError } from "../error";
import { getCookie } from "@tanstack/react-start/server";

const contactUsServerValidate = createServerValidate({
	...contactUsFormOptions,
	onServerValidate: zContactUsForm,
});

export const submitContactUsFn = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new LiteralError("MALFORMED_REQUEST");
		}

		return data;
	})
	.handler(async (ctx) => {
		try {
			const { email, topic, message } = await contactUsServerValidate(ctx.data);

			await insertContactUsSubmission({
				email,
				topic,
				message,
			});

			const lang = getCookie("language") || "en";

			return redirect({ to: "/$lang/contact-us", params: { lang }});
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response;
			}

			console.error(error);
			return "Internal Server Error";
		}
	});

export const getContactUsFormFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return getFormData();
	},
);
