"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { type UserRole } from "@/server/db/enums";
import { ColumnDef } from "@tanstack/react-table";

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
		cell: ({ row }) => {
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

export const UserTable = ({ data }: { data: User[] }) => {
	return <DataTable columns={columns} data={data} pageSize={10} />;
};
