import z from "zod";

export const zPagination = z.object({
	pageNumber: z.number().min(1).default(1),
	pageSize: z.number().min(1).max(100).default(10),
});
