"use client";

import { useNavigate, useRouter } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { formatEnumString } from "@/lib/utils";
import { CatFormType } from "@/server/db/enums";
import type { CatRequestDocument } from "@/server/db/schema";
import { CatRequestDetailsSheet } from "./details-sheet";

export type CatRequestRow = Omit<CatRequestDocument, "_id"> & { id: string };

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
	const router = useRouter();

	const handleRefetchData = () => {
		router.invalidate();
	};

	const columns: ColumnDef<CatRequestRow>[] = [
		{
			accessorKey: "requestType",
			header: "Request Type",
			cell: ({ row }) => {
				const type =
					row.original.type === CatFormType.FIND_MY_CAT
						? "Lost Cat"
						: "Found Cat";
				return <span>{type}</span>;
			},
		},
		{
			accessorKey: "userFullName",
			header: "Full Name",
			cell: ({ row }) => <span>{row.original.userDetails.name}</span>,
		},
		{
			accessorKey: "phone",
			header: "Phone",
			cell: ({ row }) => <span>{row.original.userDetails.phone}</span>,
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => <span>{row.original.userDetails.email}</span>,
		},
		{
			accessorKey: "catName",
			header: "Cat Name",
			cell: ({ row }) => <span>{row.original.catDetails.name ?? "-"}</span>,
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const status = row.original.status as string;

				const statusStyles: Record<string, string> = {
					APPROVED:
						"border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
					REJECTED: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
					SUBMITTED: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
				};

				return (
					<Badge
						className={`font-bold ${statusStyles[status] || "text-slate-600"}`}
					>
						{formatEnumString(status)}
					</Badge>
				);
			},
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				return (
					<CatRequestDetailsSheet
						request={row.original}
						onUpdate={handleRefetchData}
					/>
				);
			},
		},
	];

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
