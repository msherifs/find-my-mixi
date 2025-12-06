import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CatFormStatus } from "@/server/db/enums";
import {
	findCatRequestById,
	findCatRequestsPaginated,
	findPresumedOwnersPaginated,
	updateCatRequestStatus,
} from "@/server/db/queries";
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

const updateRequestStatusSchema = z.object({
	catRequestId: z.string().min(1, { error: "errors.required" }),
	status: z.enum([CatFormStatus.APPROVED, CatFormStatus.REJECTED], {
		error: "errors.invalid_status",
	}),
});

export const updateRequestStatusFn = createServerFn({ method: "POST" })
	.inputValidator(updateRequestStatusSchema)
	.handler(async ({ data }) => {
		const { catRequestId, status } = data;

		// Check if cat request exists
		const catRequest = await findCatRequestById(catRequestId);
		if (!catRequest) {
			throw new Error("Cat request not found");
		}

		// Update the status
		await updateCatRequestStatus(catRequestId, status);

		return { success: true };
	});

export const getPresumedOwnersFn = createServerFn({ method: "GET" })
	.inputValidator(zPagination)
	.handler(async ({ data }) => {
		const { pageNumber, pageSize } = data;
		const { presumedOwners, count } = await findPresumedOwnersPaginated(
			{},
			{ pageNumber, pageSize },
		);

		return {
			presumedOwners: presumedOwners.map((owner) => ({
				...owner,
				_id: undefined,
				id: owner._id.toHexString(),
			})),
			count,
		};
	});
