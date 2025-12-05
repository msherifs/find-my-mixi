export const UserRole = {
	USER: "USER",
	ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const CatFormType = {
	FIND_MY_CAT: "FIND_MY_CAT",
	REPORT_CAT_FOUND: "REPORT_CAT_FOUND",
} as const;
export type CatFormType = (typeof CatFormType)[keyof typeof CatFormType];

export const CatFurColor = {
	WHITE: "WHITE",
	BLACK: "BLACK",
	GRAY: "GRAY",
	ORANGE_GINGER: "ORANGE_GINGER",
	CREAM: "CREAM",
	BROWN: "BROWN",
} as const;
export type CatFurColor = (typeof CatFurColor)[keyof typeof CatFurColor];

export const CatFurPattern = {
	SOLID: "SOLID",
	BICOLOR: "BICOLOR",
	TABBY: "TABBY",
	TRICOLOR: "TRICOLOR",
	CALICO: "CALICO",
	TORBIE: "TORBIE",
	COLORPOINT: "COLORPOINT",
} as const;
export type CatFurPattern = (typeof CatFurPattern)[keyof typeof CatFurPattern];

export const CatCoatType = {
	LONG: "LONG",
	CURLY: "CURLY",
	SHORT: "SHORT",
	HAIRLESS: "HAIRLESS",
} as const;
export type CatCoatType = (typeof CatCoatType)[keyof typeof CatCoatType];

export const CatEyeColor = {
	YELLOW: "YELLOW",
	GREEN: "GREEN",
	BLUE: "BLUE",
	AMBER: "AMBER",
} as const;
export type CatEyeColor = (typeof CatEyeColor)[keyof typeof CatEyeColor];

export const CatSize = {
	SMALL: "SMALL",
	MEDIUM: "MEDIUM",
	LARGE: "LARGE",
} as const;
export type CatSize = (typeof CatSize)[keyof typeof CatSize];

export const CollarSolidColor = {
	RED: "RED",
	BLUE: "BLUE",
	BLACK: "BLACK",
	PINK: "PINK",
	GREEN: "GREEN",
} as const;
export type CollarSolidColor =
	(typeof CollarSolidColor)[keyof typeof CollarSolidColor];

export const CollarPattern = {
	STRIPES: "STRIPES",
	POLKA_DOTS: "POLKA_DOTS",
	PAW_PRINTS: "PAW_PRINTS",
} as const;
export type CollarPattern = (typeof CollarPattern)[keyof typeof CollarPattern];

export const CollarEmbellishment = {
	REFLECTIVE_STRIP: "REFLECTIVE_STRIP",
	BELL: "BELL",
} as const;
export type CollarEmbellishment =
	(typeof CollarEmbellishment)[keyof typeof CollarEmbellishment];

export const ContactUsTopic = {
	ENQUIRY: "ENQUIRY",
	SUGGESTION: "SUGGESTION",
	COMPLAINT: "COMPLAINT",
} as const;
export type ContactUsTopic =
	(typeof ContactUsTopic)[keyof typeof ContactUsTopic];

export const CatFormStatus = {
	SUBMITTED: "SUBMITTED",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED",
} as const;
export type CatFormStatus = (typeof CatFormStatus)[keyof typeof CatFormStatus];
