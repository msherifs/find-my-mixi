import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
	if (!name) return "";
	const names = name.split(" ");
	if (names.length === 1) {
		return names[0].charAt(0).toUpperCase();
	}
	return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
}

export const formatEnumString = (str: string | undefined): string => {
	if (!str) return "";
	return str
		.toLowerCase()
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
