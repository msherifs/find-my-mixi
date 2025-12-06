"use client";

import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { UserRole } from "@/server/db/enums";

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	role: UserRole;
	email: string;
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
