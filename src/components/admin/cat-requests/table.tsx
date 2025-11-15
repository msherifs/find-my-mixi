"use client";

import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { CatFormType } from "@/server/db/enums";

export type CatRequestRow = {
	id: string;
	requestType: CatFormType;
	userFullName: string;
	phone: string;
	email: string;
	catName: string;
};

export const columns: ColumnDef<CatRequestRow>[] = [
	{
		accessorKey: "userFullName",
		header: "Full Name",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "catName",
		header: "Cat Name",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<Button
						variant="outlined"
						size="sm"
						onClick={() => console.log(row.original.id)}
					>
						Delete
					</Button>
				</div>
			);
		},
	},
];

interface CatRequestsTableProps {
	data: CatRequestRow[];
	pageNumber: number;
	pageSize: number;
	totalRecords: number;
}

export const CatRequestsTable = ({
	data,
	pageNumber,
	pageSize,
	totalRecords,
}: CatRequestsTableProps) => {
	const navigate = useNavigate();

	return (
		<DataTable
			columns={columns}
			data={data}
			pageSize={pageSize}
			pageNumber={pageNumber}
			totalRecords={totalRecords}
			loadPage={(nextPage, nextPageSize) =>
				navigate({
					to: "/admin/cat-requests",
					search: { pageNumber: nextPage, pageSize: nextPageSize },
				})
			}
		/>
	);
};
