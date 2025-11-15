import { createServerFn } from "@tanstack/react-start";
import { findCatRequestsPaginated } from "@/server/db/queries";
import { zPagination } from "../shared-schemas";

export const getCatRequestsFn = createServerFn({ method: "GET" })
	.inputValidator(zPagination)
	.handler(async ({ data }) => {
		const { pageNumber, pageSize } = data;
		const { catRequests, count } = await findCatRequestsPaginated(
			{},
			{ pageNumber, pageSize },
		);

		return {
			catRequests: catRequests.map((request) => ({
				...request,
				_id: undefined,
				id: request._id.toHexString(),
			})),
			count,
		};
	});
