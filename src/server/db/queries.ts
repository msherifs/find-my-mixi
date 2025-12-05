import { ObjectId } from "mongodb";
import type { DocumentForInsert, PaprFilter } from "papr";
import type { CatFormStatus } from "./enums";
import {
	CatRequest,
	type CatRequestDocument,
	type CatRequestOptions,
	ContactUs,
	type ContactUsDocument,
	type ContactUsOptions,
	PasswordReset,
	User,
	type UserDocument,
	type UserOptions,
} from "./schema";

export const insertUser = async (
	args: DocumentForInsert<UserDocument, UserOptions>,
) => {
	return await User.insertOne(args);
};

export const findUser = async (filter: PaprFilter<UserDocument>) => {
	return await User.findOne(filter);
};

export const findUsersPaginated = async (
	filter: PaprFilter<UserDocument>,
	options: { pageSize: number; pageNumber: number },
) => {
	const skip = (options.pageNumber - 1) * options.pageSize;
	const [users, count] = await Promise.all([
		User.find(filter, {
			skip,
			limit: options.pageSize,
			sort: { _id: -1 },
		}),
		User.countDocuments(filter),
	]);
	return {
		users,
		count,
	};
};

export const findCatRequestsPaginated = async (
	filter: PaprFilter<CatRequestDocument>,
	options: { pageSize: number; pageNumber: number },
) => {
	const skip = (options.pageNumber - 1) * options.pageSize;
	const [catRequests, count] = await Promise.all([
		CatRequest.find(filter, {
			skip,
			limit: options.pageSize,
			sort: { _id: -1 },
		}),
		CatRequest.countDocuments(filter),
	]);
	return {
		catRequests,
		count,
	};
};

export const insertCatRequest = async (
	args: DocumentForInsert<CatRequestDocument, CatRequestOptions>,
) => {
	return await CatRequest.insertOne(args);
};

export const insertContactUsSubmission = async (
	args: DocumentForInsert<ContactUsDocument, ContactUsOptions>,
) => {
	return await ContactUs.insertOne(args);
};

export const findCatRequestsInPolygon = async (
	polygon: { coordinates: number[][][] },
	filter: PaprFilter<CatRequestDocument>,
) => {
	const pipeline: Record<string, unknown>[] = [
		{
			$match: {
				"location.geoPoint": {
					$geoWithin: {
						$geometry: {
							type: "Polygon",
							coordinates: polygon.coordinates,
						},
					},
				},
			},
		},
		{
			$match: filter,
		},
	];

	return await CatRequest.aggregate<CatRequestDocument>(pipeline);
};

export const findContactUsSubmissionsPaginated = async (
	filter: PaprFilter<ContactUsDocument>,
	options: { pageSize: number; pageNumber: number },
) => {
	const skip = (options.pageNumber - 1) * options.pageSize;
	const [contactUsSubmissions, count] = await Promise.all([
		ContactUs.find(filter, {
			skip,
			limit: options.pageSize,
			sort: { _id: -1 },
		}),
		ContactUs.countDocuments(filter),
	]);
	return {
		contactUsSubmissions,
		count,
	};
};

export const findCatRequestById = async (id: string) => {
	if (!ObjectId.isValid(id)) {
		return null;
	}
	return await CatRequest.findById(new ObjectId(id));
};

export const updateCatRequestStatus = async (
	id: string,
	status: CatFormStatus,
) => {
	if (!ObjectId.isValid(id)) {
		return null;
	}
	return await CatRequest.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { status } },
	);
};

export const addPresumedOwnerToCatRequest = async (
	id: string,
	presumedOwner: { name: string; phone: string },
) => {
	if (!ObjectId.isValid(id)) {
		return null;
	}

	// Check if phone already exists in presumedOwners array
	const existingRequest = await CatRequest.findOne({
		_id: new ObjectId(id),
		"presumedOwners.phone": presumedOwner.phone,
	});

	if (existingRequest) {
		throw new Error("DUPLICATE_PHONE");
	}

	return await CatRequest.updateOne(
		{ _id: new ObjectId(id) },
		{ $push: { presumedOwners: presumedOwner } },
	);
};

export const insertPasswordReset = async (
	userId: ObjectId,
	hashedToken: string,
	expiresAt: Date,
) => {
	return await PasswordReset.insertOne({
		userId,
		token: hashedToken,
		expiresAt,
	});
};

export const findPasswordReset = async (hashedToken: string) => {
	return await PasswordReset.findOne({ token: hashedToken });
};

export const deletePasswordReset = async (id: ObjectId) => {
	return await PasswordReset.deleteOne({ _id: id });
};

export const invalidatePreviousResets = async (userId: ObjectId) => {
	return await PasswordReset.deleteMany({ userId });
};

export const cleanupExpiredTokens = async () => {
	return await PasswordReset.deleteMany({
		expiresAt: { $lt: new Date() },
	});
};
