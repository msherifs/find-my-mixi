"use client";

import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { CatRequestDocument } from "@/server/db/schema";
import { PresumedOwnerDetails } from "./details-sheet";

export type PresumedOwnerResult = Pick<
	CatRequestDocument,
	"catDetails" | "userDetails" | "location"
> & {
	id: string;
	presumedOwnerName: string;
	presumedOwnerPhone: string;
	presumedOwnerEmail: string;
};

const columns: ColumnDef<PresumedOwnerResult>[] = [
	{
		accessorKey: "presumedOwnerName",
		header: "Full Name",
		cell: ({ row }) => (
			<p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">
				{row.original.presumedOwnerName}
			</p>
		),
	},
	{
		accessorKey: "presumedOwnerPhone",
		header: "Phone",
		cell: ({ row }) => (
			<p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">
				{row.original.presumedOwnerPhone}
			</p>
		),
	},
	{
		accessorKey: "presumedOwnerEmail",
		header: "Email",
		cell: ({ row }) => (
			<p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">
				{row.original.presumedOwnerEmail}
			</p>
		),
	},
	{
		accessorKey: "catDetails.name",
		header: "Cat Name",
		cell: ({ row }) => (
			<p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">
				{row.original.catDetails.name}
			</p>
		),
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <PresumedOwnerDetails submission={row.original} />,
	},
];

interface PresumedOwnersTableProps {
	data: PresumedOwnerResult[];
	pageNumber: number;
	pageSize: number;
	totalRecords: number;
}

export const PresumedOwnersTable = ({
	data,
	pageNumber,
	pageSize,
	totalRecords,
}: PresumedOwnersTableProps) => {
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
					to: "/admin/contact-us",
					search: { pageNumber: nextPage, pageSize: nextPageSize },
				})
			}
		/>
	);
};
