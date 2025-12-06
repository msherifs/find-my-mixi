import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { findUsersPaginated } from "@/server/db/queries";
import { zPagination } from "../shared-schemas";

const searchParamsSchema = z
	.object({
		searchTerm: z.string().optional(),
	})
	.extend(zPagination.shape);

export const getUsersFn = createServerFn({ method: "GET" })
	.inputValidator(searchParamsSchema)
	.handler(async ({ data }) => {
		const { pageSize, pageNumber, searchTerm } = data;
		const { users, count } = await findUsersPaginated(
			{
				...(searchTerm && {
					$or: [
						{ firstName: { $regex: searchTerm, $options: "i" } },
						{ lastName: { $regex: searchTerm, $options: "i" } },
						{ email: { $regex: searchTerm, $options: "i" } },
					],
				}),
			},
			{ pageNumber, pageSize },
		);

		return {
			users: users.map((u) => ({
				...u,
				_id: undefined,
				id: u._id.toHexString(),
			})),
			count,
		};
	});
