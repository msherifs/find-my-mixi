import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	FileX,
	Loader2,
} from "lucide-react";
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
	isLoading?: boolean;
	loadPage: (pageNumber: number, pageSize: number) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageSize,
	pageNumber,
	totalRecords,
	isLoading = false,
	loadPage,
}: DataTableProps<TData, TValue>) {
	const totalPages = Math.ceil(totalRecords / pageSize);

	const table = useReactTable({
		data,
		columns,
		pageCount: totalPages,
		state: {
			pagination: {
				pageIndex: pageNumber - 1,
				pageSize,
			},
		},
		manualPagination: true,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="space-y-4 w-full">
			{/* Container: Added distinct grey border, rounded corners, and shadow */}
			<div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							// Header: Added distinct background and stronger bottom border
							<TableRow
								key={headerGroup.id}
								className="bg-slate-50 border-b border-slate-200 hover:bg-slate-50"
							>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="h-12 px-4 text-xs font-bold uppercase tracking-wider text-slate-500"
										>
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
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-32 text-center"
								>
									<div className="flex items-center justify-center gap-2 text-slate-500">
										<Loader2 className="h-5 w-5 animate-spin text-slate-400" />
										<span>Loading data...</span>
									</div>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									// Rows: Added lighter grey border, increased height, and softer hover
									className="border-b border-slate-100 transition-colors hover:bg-slate-50/80 data-[state=selected]:bg-slate-50"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="p-4 text-sm text-slate-700"
										>
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
									className="h-64 text-center"
								>
									<div className="flex flex-col items-center justify-center gap-2 text-slate-400">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
											<FileX className="h-6 w-6 text-slate-300" />
										</div>
										<p className="text-lg font-medium text-slate-900">
											No results found
										</p>
										<p className="text-sm">
											We couldn't find what you were looking for.
										</p>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Footer controls: adjusted colors to match the table */}
			<div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
				<div className="text-sm text-slate-500">
					Showing{" "}
					<span className="font-medium text-slate-900">
						{data.length > 0 ? (pageNumber - 1) * pageSize + 1 : 0}
					</span>{" "}
					to{" "}
					<span className="font-medium text-slate-900">
						{Math.min(pageNumber * pageSize, totalRecords)}
					</span>{" "}
					of <span className="font-medium text-slate-900">{totalRecords}</span>{" "}
					entries
				</div>

				<div className="flex items-center space-x-2">
					<div className="flex items-center space-x-1">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-50 lg:flex"
							onClick={() => loadPage(1, pageSize)}
							disabled={pageNumber <= 1 || isLoading}
						>
							<span className="sr-only">Go to first page</span>
							<ChevronsLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-50"
							onClick={() => loadPage(pageNumber - 1, pageSize)}
							disabled={pageNumber <= 1 || isLoading}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeft className="h-4 w-4" />
						</Button>

						<div className="flex min-w-[3rem] items-center justify-center text-sm font-medium text-slate-700">
							{pageNumber} / {totalPages || 1}
						</div>

						<Button
							variant="outline"
							className="h-8 w-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-50"
							onClick={() => loadPage(pageNumber + 1, pageSize)}
							disabled={pageNumber >= totalPages || isLoading}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-50 lg:flex"
							onClick={() => loadPage(totalPages, pageSize)}
							disabled={pageNumber >= totalPages || isLoading}
						>
							<span className="sr-only">Go to last page</span>
							<ChevronsRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
