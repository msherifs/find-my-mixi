"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { type CatFormType } from "@/server/db/enums";
import { ColumnDef } from "@tanstack/react-table";

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

export const CatRequestsTable = ({ data }: { data: CatRequestRow[] }) => {
  return <DataTable columns={columns} data={data}></DataTable>;
};
