import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CatFormStatus, CatFormType } from "@/server/db/enums";
import {
	findCatRequestById,
	findCatRequestsPaginated,
	findPresumedOwnersPaginated,
	updateCatRequestStatus,
} from "@/server/db/queries";
import { zPagination } from "../shared-schemas";

const searchParamsSchema = z
	.object({
		searchTerm: z.string().optional(),
		type: z.enum(CatFormType).optional(),
		status: z.enum(CatFormStatus).optional(),
	})
	.extend(zPagination.shape);

export const getCatRequestsFn = createServerFn({ method: "GET" })
	.inputValidator(searchParamsSchema)
	.handler(async ({ data }) => {
		const { pageNumber, pageSize } = data;
		const { catRequests, count } = await findCatRequestsPaginated(
			{
				...(data.searchTerm && {
					$or: [
						{ "userDetails.name": { $regex: data.searchTerm, $options: "i" } },
						{ "userDetails.email": { $regex: data.searchTerm, $options: "i" } },
						{ "userDetails.phone": { $regex: data.searchTerm, $options: "i" } },
						{ "catDetails.name": { $regex: data.searchTerm, $options: "i" } },
					],
				}),
				...(data.type && { type: data.type }),
				...(data.status && { status: data.status }),
			},
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

const presumedOwnersSearchParamsSchema = z
	.object({
		searchTerm: z.string().optional(),
	})
	.extend(zPagination.shape);

export const getPresumedOwnersFn = createServerFn({ method: "GET" })
	.inputValidator(presumedOwnersSearchParamsSchema)
	.handler(async ({ data }) => {
		const { pageNumber, pageSize, searchTerm } = data;
		const { presumedOwners, count } = await findPresumedOwnersPaginated(
			{
				...(searchTerm && {
					$or: [
						{ "presumedOwners.email": { $regex: searchTerm, $options: "i" } },
						{ "presumedOwners.name": { $regex: searchTerm, $options: "i" } },
						{ "presumedOwners.phone": { $regex: searchTerm, $options: "i" } },
					],
				}),
			},
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
