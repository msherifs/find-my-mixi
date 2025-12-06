"use client";

import {
	Calendar,
	Cat,
	CheckCircle,
	Info,
	MapPin,
	PawPrint,
	Phone,
	User,
	XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { formatEnumString } from "@/lib/utils";
import { CatFormStatus } from "@/server/db/enums";
import { updateRequestStatusFn } from "@/server/functions/admin/cat-requests";
import type { CatRequestRow } from "./table"; // Assuming this type matches your schema

interface CatRequestDetailsSheetProps {
	request: CatRequestRow;
}

export function CatRequestDetailsSheet({
	request,
}: CatRequestDetailsSheetProps) {
	const isSubmitted = request.status === "SUBMITTED";

	const onApprove = async (id: string) => {
		await updateRequestStatusFn({
			data: {
				catRequestId: id,
				status: CatFormStatus.APPROVED,
			},
		});
	};

	const onReject = async (id: string) => {
		await updateRequestStatusFn({
			data: {
				catRequestId: id,
				status: CatFormStatus.REJECTED,
			},
		});
	};

	const formatDate = (date: Date | string) => {
		if (!date) return "N/A";
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
				>
					View Details
				</Button>
			</SheetTrigger>

			<SheetContent className="bg-white border-l border-slate-200 shadow-xl sm:max-w-xl p-0 flex flex-col gap-0">
				{/* Header */}
				<SheetHeader className="border-b border-slate-200 bg-slate-50/50 px-6 py-5">
					<div className="flex items-center gap-4">
						<SheetTitle className="text-lg font-semibold text-slate-900">
							{formatEnumString(request.type)} Request
						</SheetTitle>
						<div
							className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
								request.status === "REJECTED"
									? "bg-red-50 text-red-700 border-red-200"
									: request.status === "APPROVED"
										? "bg-emerald-50 text-emerald-700 border-emerald-200"
										: "bg-slate-100 text-slate-600 border-slate-200"
							}`}
						>
							{request.status}
						</div>
					</div>
				</SheetHeader>

				{/* Scrollable Content Area */}
				<div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
					{/* Cat Image & Basic Info */}
					<div className="flex gap-4">
						<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
							{request.catDetails.photo ? (
								<img
									src={request.catDetails.photo}
									alt="Cat"
									className="h-full w-full object-cover"
								/>
							) : (
								<div className="flex h-full items-center justify-center">
									<Cat className="h-8 w-8 text-slate-300" />
								</div>
							)}
						</div>
						<div className="space-y-1">
							<h3 className="text-xl font-bold text-slate-900">
								{request.catDetails.name || "Unknown Name"}
							</h3>
							<div className="flex items-center gap-2 text-sm text-slate-500">
								<Calendar className="h-3.5 w-3.5" />
								<span>Date: {formatDate(request.catDetails.date)}</span>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
									Size: {formatEnumString(request.catDetails.size)}
								</span>
								<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
									Coat Type: {formatEnumString(request.catDetails.coatType)}
								</span>
							</div>
						</div>
					</div>

					{/* Section: Physical Attributes */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<PawPrint className="h-3.5 w-3.5" />
							Physical Attributes
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Attribute
								label="Colors"
								value={request.catDetails.furColor.join(", ")}
							/>
							<Attribute
								label="Pattern"
								value={formatEnumString(request.catDetails.furPattern)}
							/>
							<Attribute
								label="Eye Color"
								value={formatEnumString(request.catDetails.eyeColor)}
							/>
							<Attribute
								label="Distinctive Marks"
								value={request.catDetails.distinctiveMarks || "None"}
							/>
						</div>
					</div>

					{/* Section: Collar Info */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<Info className="h-3.5 w-3.5" />
							Collar Details
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Attribute
								label="Color"
								value={formatEnumString(request.catDetails.collar?.color)}
							/>
							<Attribute
								label="Pattern"
								value={formatEnumString(request.catDetails.collar?.pattern)}
							/>
							<Attribute
								label="Embellishment"
								value={formatEnumString(
									request.catDetails.collar?.embellishment,
								)}
							/>
						</div>
					</div>

					{/* Section: Location */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<MapPin className="h-3.5 w-3.5" />
							Location
						</div>
						<div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-sm text-slate-700">
							<p className="font-medium text-slate-900">
								{request.location.address}
							</p>
							<p>
								{request.location.city}, {request.location.state}{" "}
								{request.location.postalCode}
							</p>
							<p className="text-slate-500 text-xs mt-2">
								Coords: {request.location.geoPoint.coordinates.join(", ")}
							</p>
						</div>
					</div>

					{/* Section: User / Reporter */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<User className="h-3.5 w-3.5" />
							Reporter Details
						</div>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div className="flex items-center gap-3 rounded-md border border-slate-100 p-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
									<User className="h-4 w-4" />
								</div>
								<div>
									<p className="text-xs text-slate-500">Name</p>
									<p className="text-sm font-medium text-slate-900">
										{request.userDetails.name}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 rounded-md border border-slate-100 p-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
									<Phone className="h-4 w-4" />
								</div>
								<div>
									<p className="text-xs text-slate-500">Phone</p>
									<p className="text-sm font-medium text-slate-900">
										{request.userDetails.phone}
									</p>
								</div>
							</div>
							<div className="col-span-1 sm:col-span-2">
								<Attribute label="Email" value={request.userDetails.email} />
							</div>
						</div>
					</div>

					{/* Section: Additional Info */}
					{request.catDetails.additionalInfo && (
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
								Additional Info
							</div>
							<div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600 italic">
								"{request.catDetails.additionalInfo}"
							</div>
						</div>
					)}
				</div>

				{/* Footer Actions */}
				<SheetFooter className="mt-auto border-t border-slate-200 bg-white p-6 sm:justify-end gap-3">
					{isSubmitted ? (
						<>
							<Button
								className="flex-1 sm:flex-none border-none bg-emerald-600 hover:bg-emerald-700 text-white"
								onClick={() => onApprove(request.id as string)}
							>
								<CheckCircle className="mr-2 h-4 w-4" />
								Approve Request
							</Button>
							<Button
								className="flex-1 sm:flex-none text-white hover:bg-red-800 bg-red-700"
								onClick={() => onReject(request.id as string)}
							>
								<XCircle className="mr-2 h-4 w-4" />
								Reject Request
							</Button>
						</>
					) : (
						<SheetClose asChild>
							<Button
								variant="secondary"
								className="w-full sm:w-auto border border-slate-200"
							>
								Close
							</Button>
						</SheetClose>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

// Small helper component for consistent field display
function Attribute({
	label,
	value,
}: {
	label: string;
	value: string | number | undefined | null;
}) {
	return (
		<div>
			<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
				{label}
			</p>
			<p className="text-sm font-medium text-slate-700 break-words">
				{value || "N/A"}
			</p>
		</div>
	);
}
