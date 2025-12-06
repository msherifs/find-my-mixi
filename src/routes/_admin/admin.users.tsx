import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import z from "zod";
import { UserTable } from "@/components/admin/users/table";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { getUsersFn } from "@/server/functions/admin/users";

export const Route = createFileRoute("/_admin/admin/users")({
	component: RouteComponent,
	validateSearch: z.object({
		pageNumber: z.coerce.number().min(1).max(100).default(1),
		pageSize: z.coerce.number().min(1).max(100).default(10),
		searchTerm: z.string().optional(),
	}),
	loaderDeps: ({ search }) => [search],
	loader: async ({ deps }) => {
		const { pageNumber, pageSize, searchTerm } = deps[0];
		return getUsersFn({ data: { pageNumber, pageSize, searchTerm } });
	},
});

function RouteComponent() {
	const { users, count } = Route.useLoaderData();
	const { pageNumber, pageSize, searchTerm } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [inputValue, setInputValue] = useState(searchTerm || "");
	const debouncedSearchTerm = useDebounce(inputValue, 500);

	useEffect(() => {
		navigate({
			search: { pageNumber: 1, pageSize, searchTerm: debouncedSearchTerm },
		});
	}, [debouncedSearchTerm, pageSize, navigate]);

	return (
		<div className="space-y-4 p-4">
			<h1 className="font-extrabold text-2xl">Users</h1>
			<Input
				placeholder="Search users by name or email"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="w-[400px] border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
			/>
			<UserTable
				data={users}
				pageNumber={pageNumber}
				pageSize={pageSize}
				totalRecords={count}
			/>
		</div>
	);
}
