import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseServerError(error: unknown): Record<string, string> {
	if (!(error instanceof Error)) {
		return {};
	}

	try {
		const parsedError = JSON.parse(error.message);
		if (Array.isArray(parsedError)) {
			const fieldErrors: Record<string, string> = {};
			const messages: string[] = [];

			for (const issue of parsedError) {
				if (issue.path && Array.isArray(issue.path) && issue.path.length > 0) {
					const fieldName = issue.path[0] as string;
					fieldErrors[fieldName] = issue.message;
				}
				messages.push(issue.message);
			}

			return fieldErrors;
		}
		return {};
	} catch {
		return {};
	}
}

export function getInitials(name: string): string {
	if (!name) return "";
	const names = name.split(" ");
	if (names.length === 1) {
		return names[0].charAt(0).toUpperCase();
	}
	return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
}
