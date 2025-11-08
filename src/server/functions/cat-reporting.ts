import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CatFormType } from "@/server/db/enums";
import {
  findCatRequestsInPolygon,
  insertCatRequest,
} from "@/server/db/queries";

const optionalTextField = () =>
  z
    .string()
    .trim()
    .transform((value) => (value.length ? value : undefined))
    .optional();

const catDetailsSchema = z.object({
  name: optionalTextField(),
  furColor: optionalTextField(),
  furPattern: optionalTextField(),
  coatType: optionalTextField(),
  distinctiveMarks: optionalTextField(),
  eyeColor: optionalTextField(),
  date: z.coerce.date().optional(),
  additionalInfo: optionalTextField(),
});

const userDetailsSchema = z.object({
  name: z
    .string({ error: "errors.fieldRequired" })
    .min(2, { error: "errors.fieldRequired" })
    .max(100, { error: "errors.fieldRequired" })
    .trim(),
  email: z.email({ error: "errors.invalidEmail" }).trim().toLowerCase(),
  phone: z
    .string({ error: "errors.fieldRequired" })
    .min(6, { error: "errors.fieldRequired" })
    .max(25, { error: "errors.fieldRequired" })
    .trim(),
  dob: z.coerce.date().optional(),
  photo: optionalTextField(),
});

const locationSchema = z.object({
  geoPoint: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z.tuple([
      z.coerce.number({ error: "errors.fieldRequired" }),
      z.coerce.number({ error: "errors.fieldRequired" }),
    ]),
  }),
  address: z
    .string({ error: "errors.fieldRequired" })
    .min(1, { error: "errors.fieldRequired" })
    .trim(),
  city: z
    .string({ error: "errors.fieldRequired" })
    .min(1, { error: "errors.fieldRequired" })
    .trim(),
  state: z
    .string({ error: "errors.fieldRequired" })
    .min(1, { error: "errors.fieldRequired" })
    .trim(),
  country: z
    .string({ error: "errors.fieldRequired" })
    .min(1, { error: "errors.fieldRequired" })
    .trim(),
  postalCode: optionalTextField(),
});

const reportCatSchema = z.object({
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
