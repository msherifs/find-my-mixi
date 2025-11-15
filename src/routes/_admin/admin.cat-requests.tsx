import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { CatRequestsTable } from "@/components/admin/cat-requests/table";
import { CatFormType } from "@/server/db/enums";
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

	// disabled for now
	// const rows = catRequests.map((request) => ({
	// 	id: request.id,
	// 	requestType: request.type,
	// 	userFullName: request.userDetails.name,
	// 	phone: request.userDetails.phone,
	// 	email: request.userDetails.email,
	// 	catName: request.catDetails.name,
	// }));

	const rows = [
		{
			id: "1",
			requestType: CatFormType.FIND_MY_CAT,
			userFullName: "John Doe",
			phone: "123-456-7890",
			email: "john.doe@example.com",
			catName: "Fluffy",
		},
	];

	return (
		<div>
			<h1 className="p-4 font-extrabold">Cat Requests</h1>
			<CatRequestsTable
				data={rows}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
