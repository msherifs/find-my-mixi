"use client";

import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { ContactUsTopic } from "@/server/db/enums";
import { ContactUsDetailsSheet } from "./details-sheet";

export type ContactUsSubmissionRow = {
	id: string;
	email: string;
	topic: ContactUsTopic;
	message: string;
	createdAt: string;
};

const columns: ColumnDef<ContactUsSubmissionRow>[] = [
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "topic",
		header: "Topic",
	},
	{
		accessorKey: "createdAt",
		header: "Received",
		cell: ({ row }) => {
			const date = row.original.createdAt
				? new Date(row.original.createdAt)
				: null;

			return <span>{date ? date.toLocaleString() : "Not available"}</span>;
		},
	},
	{
		accessorKey: "message",
		header: "Message",
		cell: ({ row }) => (
			<p className="line-clamp-2 max-w-sm text-sm text-muted-foreground">
				{row.original.message}
			</p>
		),
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <ContactUsDetailsSheet submission={row.original} />,
	},
];

interface ContactUsTableProps {
	data: ContactUsSubmissionRow[];
	pageNumber: number;
	pageSize: number;
	totalRecords: number;
}

export const PresumedOwnersTable = ({
	data,
	pageNumber,
	pageSize,
	totalRecords,
}: ContactUsTableProps) => {
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
