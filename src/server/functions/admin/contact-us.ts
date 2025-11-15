import { createServerFn } from "@tanstack/react-start";
import { findContactUsSubmissionsPaginated } from "@/server/db/queries";
import { zPagination } from "../shared-schemas";

export const getContactUsSubmissionsFn = createServerFn({ method: "GET" })
	.inputValidator(zPagination)
	.handler(async ({ data }) => {
		const { pageNumber, pageSize } = data;
		const { contactUsSubmissions, count } =
			await findContactUsSubmissionsPaginated({}, { pageNumber, pageSize });

		return {
			contactUsSubmissions: contactUsSubmissions.map((submission) => ({
				id: submission._id.toHexString(),
				email: submission.email,
				topic: submission.topic,
				message: submission.message,
				createdAt: submission.createdAt?.toISOString() ?? "",
			})),
			count,
		};
	});
