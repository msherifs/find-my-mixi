import { getFormData } from "@tanstack/react-form-start";
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
	name: z.string().nonempty({ error: "errors.required" }),
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
	phone: z
		.string({ error: "errors.required" })
		.min(6, { error: "errors.required" })
		.max(25, { error: "errors.required" })
		.trim(),
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

export const reportCatSchema = z.object({
	type: z.enum(CatFormType),
	catDetails: catDetailsSchema,
	userDetails: userDetailsSchema,
	location: locationSchema,
});

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

		return {};
	});

export const getCatRequestsForMap = createServerFn()
	.inputValidator(
		z.object({
			polygon: z.number().array().array(),
			// TBD other needed fields
		}),
	)
	.handler(async ({ data }) => {
		const requests = await findCatRequestsInPolygon(
			{ coordinates: data.polygon },
			{},
		);

		return {
			catRequests: requests.map((request) => ({
				...request,
				_id: request._id.toHexString(),
			})),
		};
	});

export const getReportLostCatFormFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return getFormData();
	},
);
