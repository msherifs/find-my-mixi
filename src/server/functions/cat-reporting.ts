import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
	CatCoatType,
	CatEyeColor,
	CatFormType,
	CatFurColor,
	CatFurPattern,
	CatSize,
	CollarEmbellishment,
	CollarPattern,
	CollarSolidColor,
} from "@/server/db/enums";
import {
	findCatRequestsInPolygon,
	insertCatRequest,
} from "@/server/db/queries";

const catDetailsSchema = z.object({
	name: z.string().optional(),
	furColor: z.enum(CatFurColor).array().min(1, { error: "errors.required" }),
	furPattern: z.enum(CatFurPattern, { error: "errors.required" }),
	coatType: z.enum(CatCoatType, { error: "errors.required" }),
	distinctiveMarks: z.string().optional(),
	eyeColor: z.enum(CatEyeColor, { error: "errors.required" }),
	size: z.enum(CatSize, { error: "errors.required" }),
	date: z.coerce.date({ error: "errors.required" }),
	additionalInfo: z.string().optional(),
	photo: z.string().nonempty({ error: "errors.upload_image" }),
	collar: z
		.object({
			color: z.enum(CollarSolidColor),
			pattern: z.enum(CollarPattern),
			embellishment: z.enum(CollarEmbellishment),
		})
		.optional(),
});

const userDetailsSchema = z.object({
	name: z
		.string({ error: "errors.required" })
		.min(2, { error: "errors.required" })
		.max(100, { error: "errors.required" })
		.trim(),
	email: z.email({ error: "errors.email" }).trim().toLowerCase(),
	phone: z.e164({ error: "errors.phone_number" }),
	dob: z.coerce.date().optional(),
	photo: z.string().optional(),
});

const locationSchema = z.object({
	geoPoint: z.object({
		type: z.literal("Point").default("Point"),
		coordinates: z.tuple([
			z.coerce.number({ error: "errors.required" }),
			z.coerce.number({ error: "errors.required" }),
		]),
	}),
	address: z
		.string({ error: "errors.required" })
		.min(1, { error: "errors.required" })
		.trim(),
	city: z
		.string({ error: "errors.required" })
		.min(1, { error: "errors.required" })
		.trim(),
	state: z
		.string({ error: "errors.required" })
		.min(1, { error: "errors.required" })
		.trim(),
	country: z
		.string({ error: "errors.required" })
		.min(1, { error: "errors.required" })
		.trim(),
	postalCode: z
		.string({ error: "errors.required" })
		.min(1, { error: "errors.required" })
		.trim(),
});

export const reportCatSchema = z
	.object({
		type: z.enum(CatFormType),
		catDetails: catDetailsSchema,
		userDetails: userDetailsSchema,
		location: locationSchema,
	})
	.refine(
		(data) => {
			if (data.type === CatFormType.FIND_MY_CAT) {
				return data.catDetails.name && data.catDetails.name.length > 0;
			}
			return true;
		},
		{
			message: "errors.required",
			path: ["catDetails.name"],
		},
	);

export type ReportCatForm = z.infer<typeof reportCatSchema>;

export const reportCatFn = createServerFn({ method: "POST" })
	.inputValidator(reportCatSchema)
	.handler(async ({ data }) => {
		const coordinates = [...data.location.geoPoint.coordinates];

		await insertCatRequest({
			type: data.type,
			catDetails: data.catDetails,
			userDetails: data.userDetails,
			location: {
				...data.location,
				geoPoint: {
					type: "Point",
					coordinates,
				},
			},
		});

		return { success: true };
	});

export const getCatRequestsForMap = createServerFn()
	.inputValidator(
		z.object({
			polygon: z.number().array().array().array(),
			color: z.enum(CatFurColor).array().optional(),
			pattern: z.enum(CatFurPattern).optional(),
			coatType: z.enum(CatCoatType).optional(),
			collarColor: z.enum(CollarSolidColor).optional(),
			collarPattern: z.enum(CollarPattern).optional(),
			size: z.enum(CatSize).optional(),
			collarEmbellishments: z.enum(CollarEmbellishment).optional(),
			eyeColor: z.enum(CatEyeColor).optional(),
		}),
	)
	.handler(async ({ data }) => {
		const requests = await findCatRequestsInPolygon(
			{ coordinates: data.polygon },
			{
				...(data.color && { "catDetails.furColor": { $in: data.color } }),
				...(data.pattern && { "catDetails.furPattern": data.pattern }),
				...(data.coatType && { "catDetails.coatType": data.coatType }),
				...(data.size && { "catDetails.size": data.size }),
				...(data.eyeColor && { "catDetails.eyeColor": data.eyeColor }),
				...(data.collarColor && {
					"catDetails.collar.color": data.collarColor,
				}),
				...(data.collarPattern && {
					"catDetails.collar.pattern": data.collarPattern,
				}),
				...(data.collarEmbellishments && {
					"catDetails.collar.embellishment": data.collarEmbellishments,
				}),
			},
		);

		return {
			catRequests: requests.map((request) => ({
				...request,
				_id: request._id.toHexString(),
			})),
		};
	});
