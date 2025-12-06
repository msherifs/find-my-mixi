import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { ContactUsTopic } from "@/server/db/enums";
import { findContactUsSubmissionsPaginated } from "@/server/db/queries";
import { zPagination } from "../shared-schemas";

const searchParamsSchema = z
	.object({
		searchTerm: z.string().optional(),
		topic: z.enum(ContactUsTopic).optional(),
	})
	.extend(zPagination.shape);

export const getContactUsSubmissionsFn = createServerFn({ method: "GET" })
	.inputValidator(searchParamsSchema)
	.handler(async ({ data }) => {
		const { pageNumber, pageSize, searchTerm, topic } = data;
		const { contactUsSubmissions, count } =
			await findContactUsSubmissionsPaginated(
				{
					...(searchTerm && { email: { $regex: searchTerm, $options: "i" } }),
					...(topic && { topic }),
				},
				{ pageNumber, pageSize },
			);

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
