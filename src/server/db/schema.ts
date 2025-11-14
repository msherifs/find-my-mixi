import { schema, types } from "papr";
import { CatFormType, UserRole } from "./enums";
import { papr } from ".";

export const UserSchema = schema({
	firstName: types.string({ required: true }),
	lastName: types.string({ required: true }),
	email: types.string({ required: true }),
	hashedPassword: types.string({ required: true }),
	role: types.enum(Object.values(UserRole), { required: true }),
});

export type UserDocument = (typeof UserSchema)[0];
export type UserOptions = (typeof UserSchema)[1];
export const User = papr.model("users", UserSchema);

const CatRequestSchema = schema({
	type: types.enum(Object.values(CatFormType), { required: true }),
	catDetails: types.object(
		{
			name: types.string(),
			furColor: types.string(),
			furPattern: types.string(),
			coatType: types.string(),
			distinctiveMarks: types.string(),
			eyeColor: types.string(),
			date: types.date(),
			additionalInfo: types.string(),
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
});

export type CatRequestDocument = (typeof CatRequestSchema)[0];
export type CatRequestOptions = (typeof CatRequestSchema)[1];
export const CatRequest = papr.model("catRequests", CatRequestSchema);
