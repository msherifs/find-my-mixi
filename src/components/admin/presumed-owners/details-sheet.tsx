"use client";

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
				<Button size="sm" variant="outline">
					View
				</Button>
			</SheetTrigger>
			<SheetContent className="sm:max-w-lg">
				<SheetHeader className="border-b border-border">
					<SheetTitle>Contact Submission</SheetTitle>
					<SheetDescription>Received {submittedAt}</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 px-4 py-6">
					<div>
						<p className="text-xs font-semibold uppercase text-muted-foreground">
							Email
						</p>
						<p className="text-base font-medium break-words">
							{submission.email}
						</p>
					</div>
					<div>
						<p className="text-xs font-semibold uppercase text-muted-foreground">
							Topic
						</p>
						<p className="text-base font-medium">{submission.topic}</p>
					</div>
					<div>
						<p className="text-xs font-semibold uppercase text-muted-foreground">
							Message
						</p>
						<p className="text-sm leading-6 whitespace-pre-wrap">
							{submission.message}
						</p>
					</div>
				</div>
				<SheetFooter className="border-t border-border">
					<SheetClose asChild>
						<Button variant="secondary">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
