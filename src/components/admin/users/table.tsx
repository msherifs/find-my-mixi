"use client";

import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { formatEnumString } from "@/lib/utils";
import type { UserRole } from "@/server/db/enums";

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	role: UserRole;
	email: string;
	createdAt: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "firstName",
		header: "First Name",
	},
	{
		accessorKey: "lastName",
		header: "Last Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => <span>{formatEnumString(row.original.role)}</span>,
	},
	{
		accessorKey: "createdAt",
		header: "Resgistered On",
		cell: ({ row }) => {
			const date = row.original.createdAt
				? new Date(row.original.createdAt)
				: null;

			return <span>{date ? date.toLocaleString() : "Not available"}</span>;
		},
	},
];

export const UserTable = (args: {
	data: User[];
	totalRecords: number;
	pageNumber: number;
	pageSize: number;
}) => {
	const { data, totalRecords, pageNumber, pageSize } = args;
	const navigate = useNavigate();

	return (
		<DataTable
			columns={columns}
			data={data}
			pageSize={pageSize}
			totalRecords={totalRecords}
			pageNumber={pageNumber}
			loadPage={(pageNumber, pageSize) =>
				navigate({ to: "/admin/users", search: { pageNumber, pageSize } })
			}
		/>
	);
};
