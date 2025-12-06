"use client";

import { Mail, MessageSquare, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { ContactUsSubmissionRow } from "./table";

interface ContactUsDetailsSheetProps {
	submission: ContactUsSubmissionRow;
}

export function ContactUsDetailsSheet({
	submission,
}: ContactUsDetailsSheetProps) {
	const submittedAt = submission.createdAt
		? new Date(submission.createdAt).toLocaleString()
		: "Unknown";

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

			<SheetContent className="bg-white border-l border-slate-200 shadow-xl w-96 p-0 gap-0">
				<SheetHeader className="border-b border-slate-200 bg-slate-50/50 px-6 py-5">
					<SheetTitle className="text-lg font-semibold text-slate-900">
						Contact Submission
					</SheetTitle>
					<SheetDescription className="text-slate-500">
						Received on {submittedAt}
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-6 px-6 py-8">
					<div className="space-y-1.5">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
							<Mail className="h-3.5 w-3.5" />
							Email Address
						</div>
						<p className="text-base font-medium text-slate-900 break-words">
							{submission.email}
						</p>
					</div>

					<div className="space-y-1.5">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
							<Tag className="h-3.5 w-3.5" />
							Topic
						</div>
						<div className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-sm font-medium text-slate-700">
							{submission.topic}
						</div>
					</div>

					{/* Message Section - Added a container for the long text */}
					<div className="space-y-2 flex-1">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
							<MessageSquare className="h-3.5 w-3.5" />
							Message
						</div>
						<div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-700">
							<p className="whitespace-pre-wrap">{submission.message}</p>
						</div>
					</div>
				</div>

				<SheetFooter className="mt-auto border-t border-slate-200 bg-white p-6 sm:justify-between">
					<SheetClose asChild>
						<Button className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200">
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
