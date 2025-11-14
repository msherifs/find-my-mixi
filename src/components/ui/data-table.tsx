import { useEffect } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
	ColumnDef,
} from "@tanstack/react-table";
import { Button } from "./button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "./table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
	pageNumber?: number;
	totalPages?: number;
	onNextPage?: () => void;
	onPreviousPage?: () => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageSize = 10,
	pageNumber,
	totalPages,
	onNextPage,
	onPreviousPage,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const hasExternalPagination = Boolean(onNextPage || onPreviousPage);
	const currentPage = hasExternalPagination
		? Math.max(pageNumber ?? 1, 1)
		: table.getState().pagination.pageIndex + 1;
	const totalPagesForDisplay = hasExternalPagination
		? totalPages
		: Math.max(table.getPageCount(), 1);
	const canGoToPrevious = hasExternalPagination
		? Boolean(onPreviousPage) && currentPage > 1
		: table.getCanPreviousPage();
	const canGoToNext = hasExternalPagination
		? Boolean(onNextPage) &&
			(typeof totalPages === "number" ? currentPage < totalPages : true)
		: table.getCanNextPage();

	const handlePrevious = () => {
		if (hasExternalPagination) {
			onPreviousPage?.();
			return;
		}
		table.previousPage();
	};

	const handleNext = () => {
		if (hasExternalPagination) {
			onNextPage?.();
			return;
		}
		table.nextPage();
	};

	useEffect(() => {
		table.setPageSize(pageSize);
	}, [table, pageSize]);

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
					Page {currentPage}
					{typeof totalPagesForDisplay === "number" && (
						<> of {Math.max(totalPagesForDisplay, 1)}</>
					)}
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="default"
						size="sm"
						onClick={handlePrevious}
						disabled={!canGoToPrevious}
					>
						Previous
					</Button>
					<Button
						variant="default"
						size="sm"
						onClick={handleNext}
						disabled={!canGoToNext}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
