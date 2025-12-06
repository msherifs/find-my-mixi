import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { UserTable } from "@/components/admin/users/table";
import { getUsersFn } from "@/server/functions/admin/users";

export const Route = createFileRoute("/_admin/admin/users")({
	component: RouteComponent,
	validateSearch: z.object({
		pageNumber: z.coerce.number().min(1).max(100).default(1),
		pageSize: z.coerce.number().min(1).max(100).default(10),
	}),
	loaderDeps: ({ search }) => [search],
	loader: async ({ deps }) => {
		const { pageNumber, pageSize } = deps[0];
		return getUsersFn({ data: { pageNumber, pageSize } });
	},
});

function RouteComponent() {
	const { users, count } = Route.useLoaderData();
	const { pageNumber, pageSize } = Route.useSearch();

	return (
		<div className="space-y-4 p-4">
			<h1 className="font-extrabold text-2xl">Users</h1>
			<UserTable
				data={users}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
