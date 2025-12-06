import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { ContactUsTable } from "@/components/admin/contact-us/table";
import { PresumedOwnersTable } from "@/components/admin/presumed-owners/table";
import { getContactUsSubmissionsFn } from "@/server/functions/admin/contact-us";

export const Route = createFileRoute("/_admin/admin/presumed-owners")({
	component: RouteComponent,
	validateSearch: z.object({
		pageNumber: z.coerce.number().min(1).max(100).default(1),
		pageSize: z.coerce.number().min(1).max(100).default(10),
	}),
	loaderDeps: ({ search }) => [search],
	loader: async ({ deps }) => {
		const { pageNumber, pageSize } = deps[0];
		return await getContactUsSubmissionsFn({
			data: { pageNumber, pageSize },
		});
	},
});

function RouteComponent() {
	const { presumedOwners, count } = Route.useLoaderData();
	const { pageNumber, pageSize } = Route.useSearch();

	return (
		<div className="space-y-4 p-4">
			<h1 className="font-extrabold text-2xl">Presumed Owners</h1>
			<PresumedOwnersTable
				data={presumedOwners}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
