import { schema, types } from "papr";
import { papr } from ".";
import {
	CatCoatType,
	CatEyeColor,
	CatFormStatus,
	CatFormType,
	CatFurColor,
	CatFurPattern,
	CatSize,
	CollarEmbellishment,
	CollarPattern,
	CollarSolidColor,
	ContactUsTopic,
	UserRole,
} from "./enums";

export const UserSchema = schema(
	{
		firstName: types.string({ required: true }),
		lastName: types.string({ required: true }),
		email: types.string({ required: true }),
		hashedPassword: types.string({ required: true }),
		role: types.enum(Object.values(UserRole), { required: true }),
	},
	{ timestamps: true },
);

export type UserDocument = (typeof UserSchema)[0];
export type UserOptions = (typeof UserSchema)[1];
export const User = papr.model("users", UserSchema);

const CatRequestSchema = schema(
	{
		type: types.enum(Object.values(CatFormType), { required: true }),
		status: types.enum(Object.values(CatFormStatus), { required: true }),
		catDetails: types.object(
			{
				name: types.string(),
				furColor: types.array(
					types.enum(Object.values(CatFurColor), { required: true }),
					{ required: true },
				),
				furPattern: types.enum(Object.values(CatFurPattern), {
					required: true,
				}),
				coatType: types.enum(Object.values(CatCoatType), { required: true }),
				distinctiveMarks: types.string(),
				eyeColor: types.enum(Object.values(CatEyeColor), { required: true }),
				size: types.enum(Object.values(CatSize), { required: true }),
				collar: types.object({
					color: types.enum(Object.values(CollarSolidColor), {
						required: true,
					}),
					pattern: types.enum(Object.values(CollarPattern), {
						required: true,
					}),
					embellishment: types.enum(Object.values(CollarEmbellishment), {
						required: true,
					}),
				}),
				date: types.date({ required: true }),
				additionalInfo: types.string(),
				photo: types.string({ required: true }),
			},
			{ required: true },
		),
		userDetails: types.object(
			{
				name: types.string({ required: true }),
				email: types.string({ required: true }),
				phone: types.string({ required: true }),
				dob: types.date(),
				photo: types.string(),
			},
			{ required: true },
		),
		location: types.object(
			{
				geoPoint: types.object(
					{
						type: types.constant("Point"),
						coordinates: types.array(types.number(), { required: true }),
					},
					{ required: true },
				),
				address: types.string({ required: true }),
				city: types.string({ required: true }),
				state: types.string({ required: true }),
				country: types.string({ required: true }),
				postalCode: types.string(),
			},
			{ required: true },
		),
		presumedOwners: types.array(
			types.object(
				{
					name: types.string({ required: true }),
					phone: types.string({ required: true }),
					email: types.string({ required: true }),
				},
				{ required: true },
			),
			{ required: true },
		),
	},
	{ timestamps: true, defaults: { status: "SUBMITTED", presumedOwners: [] } },
);

export type CatRequestDocument = (typeof CatRequestSchema)[0];
export type CatRequestOptions = (typeof CatRequestSchema)[1];
export const CatRequest = papr.model("catRequests", CatRequestSchema);

const ContactUsSchema = schema(
	{
		email: types.string({ required: true }),
		topic: types.enum(Object.values(ContactUsTopic), { required: true }),
		message: types.string({ required: true }),
	},
	{ timestamps: true },
);

export type ContactUsDocument = (typeof ContactUsSchema)[0];
export type ContactUsOptions = (typeof ContactUsSchema)[1];
export const ContactUs = papr.model("contactUsSubmissions", ContactUsSchema);

const PasswordResetSchema = schema(
	{
		userId: types.objectId({ required: true }),
		token: types.string({ required: true }),
		expiresAt: types.date({ required: true }),
	},
	{ timestamps: true },
);

export type PasswordResetDocument = (typeof PasswordResetSchema)[0];
export type PasswordResetOptions = (typeof PasswordResetSchema)[1];
export const PasswordReset = papr.model("passwordResets", PasswordResetSchema);
