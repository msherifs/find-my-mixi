import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { CatRequestsTable } from "@/components/admin/cat-requests/table";
import { getCatRequestsFn } from "@/server/functions/admin/cat-requests";

export const Route = createFileRoute("/_admin/admin/cat-requests")({
	component: RouteComponent,
	validateSearch: z.object({
		pageNumber: z.coerce.number().min(1).max(100).default(1),
		pageSize: z.coerce.number().min(1).max(100).default(10),
	}),
	loaderDeps: ({ search }) => [search],
	loader: async ({ deps }) => {
		const { pageNumber, pageSize } = deps[0];
		return await getCatRequestsFn({ data: { pageNumber, pageSize } });
	},
});

function RouteComponent() {
	const { catRequests, count } = Route.useLoaderData();
	const { pageNumber, pageSize } = Route.useSearch();

	return (
		<div className="space-y-4 p-4">
			<h1 className="font-extrabold text-2xl">Cat Requests</h1>
			<CatRequestsTable
				data={catRequests}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
