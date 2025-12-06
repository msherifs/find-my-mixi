"use client";

import {
	Calendar,
	Cat,
	Mail,
	MapPin,
	PawPrint,
	Phone,
	User,
	UserCheck,
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
import type { PresumedOwnerResult } from "./table";

interface PresumedOwnerDetailsProps {
	submission: PresumedOwnerResult;
}

export function PresumedOwnerDetails({
	submission,
}: PresumedOwnerDetailsProps) {
	// Helper to format the cat's sighting date
	const sightingDate = submission.catDetails.date
		? new Date(submission.catDetails.date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: "Unknown Date";

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					className="h-8 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
				>
					View Details
				</Button>
			</SheetTrigger>

			<SheetContent className="bg-white border-l border-slate-200 shadow-xl sm:max-w-xl p-0 flex flex-col gap-0">
				{/* Header */}
				<SheetHeader className="border-b border-slate-200 bg-slate-50/50 px-6 py-5">
					<SheetTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
						<UserCheck className="h-5 w-5 text-slate-500" />
						Presumed Owner Match
					</SheetTitle>
				</SheetHeader>

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
					{/* Section 1: The Presumed Owner (Primary Info) */}
					<div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-blue-100 pb-2">
							<UserCheck className="h-3.5 w-3.5" />
							Matched Owner Contact
						</div>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-0.5">
								<p className="text-[10px] font-bold uppercase text-slate-400">
									Name
								</p>
								<p className="text-sm font-semibold text-slate-900">
									{submission.presumedOwnerName}
								</p>
							</div>
							<div className="space-y-0.5">
								<p className="text-[10px] font-bold uppercase text-slate-400">
									Phone
								</p>
								<div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
									<Phone className="h-3 w-3 text-slate-400" />
									{submission.presumedOwnerPhone}
								</div>
							</div>
							<div className="col-span-1 sm:col-span-2 space-y-0.5">
								<p className="text-[10px] font-bold uppercase text-slate-400">
									Email
								</p>
								<div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
									<Mail className="h-3 w-3 text-slate-400" />
									{submission.presumedOwnerEmail}
								</div>
							</div>
						</div>
					</div>

					{/* Section 2: Cat Context */}
					<div className="flex gap-4 items-start">
						<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
							{submission.catDetails.photo ? (
								<img
									src={submission.catDetails.photo}
									alt="Cat"
									className="h-full w-full object-cover"
								/>
							) : (
								<div className="flex h-full items-center justify-center">
									<Cat className="h-8 w-8 text-slate-300" />
								</div>
							)}
						</div>
						<div className="space-y-1 flex-1">
							<h3 className="text-lg font-bold text-slate-900">
								{submission.catDetails.name || "Unnamed Cat"}
							</h3>
							<div className="flex items-center gap-2 text-sm text-slate-500">
								<Calendar className="h-3.5 w-3.5" />
								<span>Sighting Date: {sightingDate}</span>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								<Badge>
									Size: {formatEnumString(submission.catDetails.size)}
								</Badge>
								<Badge>
									Coat Type: {formatEnumString(submission.catDetails.coatType)}
								</Badge>
								<Badge>
									{formatEnumString(submission.catDetails.eyeColor)} Eyes
								</Badge>
							</div>
						</div>
					</div>

					{/* Section 3: Physical Attributes */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<PawPrint className="h-3.5 w-3.5" />
							Physical Attributes
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Attribute
								label="Colors"
								value={submission.catDetails.furColor.join(", ")}
							/>
							<Attribute
								label="Pattern"
								value={formatEnumString(submission.catDetails.furPattern)}
							/>
							<Attribute
								label="Distinctive Marks"
								value={submission.catDetails.distinctiveMarks}
							/>

							{/* Collar Details Nested */}
							<div className="col-span-2 mt-2">
								<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
									Collar Info
								</p>
								<div className="rounded-md border border-slate-100 bg-slate-50 p-2 text-sm grid grid-cols-3 gap-2">
									<Attribute
										label="Color"
										value={formatEnumString(
											submission.catDetails.collar?.color,
										)}
									/>
									<Attribute
										label="Pattern"
										value={formatEnumString(
											submission.catDetails.collar?.pattern,
										)}
									/>
									<Attribute
										label="Details"
										value={formatEnumString(
											submission.catDetails.collar?.embellishment,
										)}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Section 4: Location */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<MapPin className="h-3.5 w-3.5" />
							Sighting Location
						</div>
						<div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-sm text-slate-700">
							<p className="font-medium text-slate-900">
								{submission.location.address}
							</p>
							<p>
								{submission.location.city}, {submission.location.state}{" "}
								{submission.location.postalCode}
							</p>
							<p className="text-slate-400 text-xs mt-1">
								{submission.location.country}
							</p>
						</div>
					</div>

					{/* Section 5: Reporter Details */}
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
							<User className="h-3.5 w-3.5" />
							Reported By
						</div>
						<div className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
									<User className="h-4 w-4" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900">
										{submission.userDetails.name}
									</p>
									<p className="text-xs text-slate-500">
										{submission.userDetails.email}
									</p>
								</div>
							</div>
							<div className="text-sm text-slate-600 flex items-center gap-1">
								<Phone className="h-3 w-3" />
								{submission.userDetails.phone}
							</div>
						</div>
					</div>
				</div>

				{/* Footer: Close Button Only */}
				<SheetFooter className="mt-auto border-t border-slate-200 bg-white p-6">
					<SheetClose asChild>
						<Button className="w-full sm:w-auto bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200">
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

// Helpers
function Attribute({
	label,
	value,
}: {
	label: string;
	value: string | undefined | null;
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

function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
			{children}
		</span>
	);
}
