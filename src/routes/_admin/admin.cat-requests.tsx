import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import z from "zod";
import { CatRequestsTable } from "@/components/admin/cat-requests/table";
import MixiSelect from "@/components/shared/mixi-select";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { formatEnumString } from "@/lib/utils";
import { CatFormStatus, CatFormType } from "@/server/db/enums";
import { getCatRequestsFn } from "@/server/functions/admin/cat-requests";

export const Route = createFileRoute("/_admin/admin/cat-requests")({
	component: RouteComponent,
	validateSearch: z.object({
		pageNumber: z.coerce.number().min(1).max(100).default(1),
		pageSize: z.coerce.number().min(1).max(100).default(10),
		type: z.enum(CatFormType).optional(),
		status: z.enum(CatFormStatus).optional(),
		searchTerm: z.string().optional(),
	}),
	loaderDeps: ({ search }) => [search],
	loader: async ({ deps }) => {
		const { pageNumber, pageSize, type, status, searchTerm } = deps[0];
		return await getCatRequestsFn({
			data: { pageNumber, pageSize, type, status, searchTerm },
		});
	},
});

function RouteComponent() {
	const { catRequests, count } = Route.useLoaderData();
	const { pageNumber, pageSize, type, status, searchTerm } = Route.useSearch();
	const [filters, setFilters] = useState({ type, status, searchTerm });
	const navigate = Route.useNavigate();
	const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

	useEffect(() => {
		navigate({
			search: {
				pageNumber: 1,
				pageSize,
				searchTerm: debouncedSearchTerm,
				type: filters.type,
				status: filters.status,
			},
		});
	}, [debouncedSearchTerm, pageSize, filters.type, filters.status, navigate]);

	return (
		<div className="space-y-4 p-4">
			<h1 className="font-extrabold text-2xl">Cat Requests</h1>
			<div className="flex items-center gap-4">
				<Input
					placeholder="Search by name or email"
					value={filters.searchTerm}
					onChange={(e) =>
						setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
					}
					className="w-[400px] border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
				/>
				<MixiSelect
					placeholder={"Filter by Type"}
					options={Object.values(CatFormType).map((type) => ({
						label: type === CatFormType.FIND_MY_CAT ? "Lost Cat" : "Found Cat",
						value: type,
					}))}
					onChange={(value) => {
						setFilters((prev) => ({
							...prev,
							type: value as CatFormType | undefined,
						}));
					}}
					value={filters.type}
					className="w-[200px]! flex-0"
					selectClassName="h-auto!"
				/>
				<MixiSelect
					placeholder={"Filter by Status"}
					options={Object.values(CatFormStatus).map((status) => ({
						label: formatEnumString(status),
						value: status,
					}))}
					onChange={(value) => {
						setFilters((prev) => ({
							...prev,
							status: value as CatFormStatus | undefined,
						}));
					}}
					value={filters.status}
					className="w-[200px]! flex-0"
					selectClassName="h-auto!"
				/>
			</div>
			<CatRequestsTable
				data={catRequests}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
