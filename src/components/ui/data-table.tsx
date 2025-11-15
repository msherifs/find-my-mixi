import { useNavigate } from "@tanstack/react-router";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { Button } from "./button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize: number;
	pageNumber: number;
	totalRecords: number;
	loadPage: (pageNumber: number, pageSize: number) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageSize,
	pageNumber,
	totalRecords,
	loadPage,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="space-y-4">
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex flex-col gap-3 px-2 pb-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<div>
					Page {pageNumber} of {Math.ceil(totalRecords / pageSize)}
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="default"
						size="sm"
						onClick={() => loadPage(pageNumber - 1, pageSize)}
						disabled={pageNumber <= 1}
					>
						Previous
					</Button>
					<Button
						variant="default"
						size="sm"
						onClick={() => loadPage(pageNumber + 1, pageSize)}
						disabled={pageNumber >= Math.ceil(totalRecords / pageSize)}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
