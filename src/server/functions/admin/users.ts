import { createServerFn } from "@tanstack/react-start";
import { findUsersPaginated } from "@/server/db/queries";
import { zPagination } from "../shared-schemas";

export const getUsersFn = createServerFn({ method: "GET" })
	.inputValidator(zPagination)
	.handler(async ({ data }) => {
		const { pageSize, pageNumber } = data;
		const { users, count } = await findUsersPaginated(
			{},
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
