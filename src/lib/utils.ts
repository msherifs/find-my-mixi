import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseServerError(
	error: unknown,
	genericMessage: string,
): { message?: string; fieldErrors: Record<string, string> } {
	if (!(error instanceof Error)) {
		return { message: genericMessage, fieldErrors: {} };
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

			return {
				message: undefined,
				fieldErrors,
			};
		}
		return { message: error.message, fieldErrors: {} };
	} catch {
		return { message: error.message, fieldErrors: {} };
	}
}
