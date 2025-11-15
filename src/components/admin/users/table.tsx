"use client";

import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
		id: "actions",
		header: "Actions",
		cell: () => {
			return (
				<div className="flex items-center gap-2">
					<Button variant="outlined" size="sm">
						Edit
					</Button>
					<Button variant="destructive" size="sm">
						Delete
					</Button>
				</div>
			);
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
