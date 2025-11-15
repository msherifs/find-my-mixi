import type { DocumentForInsert, PaprFilter } from "papr";
import {
	CatRequest,
	type CatRequestDocument,
	type CatRequestOptions,
	User,
	type UserDocument,
	type UserOptions,
} from "./schema";

const generatePaginationObject = (options: {
	pageSize: number;
	pageNumber: number;
	count: number;
}) => {
	const numberOfPages = Math.ceil(options.count / options.pageSize);

	return { numberOfPages };
};

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
		pagination: generatePaginationObject({
			pageSize: options.pageSize,
			pageNumber: options.pageNumber,
			count,
		}),
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
		pagination: generatePaginationObject({
			pageSize: options.pageSize,
			pageNumber: options.pageNumber,
			count,
		}),
	};
};

export const insertCatRequest = async (
	args: DocumentForInsert<CatRequestDocument, CatRequestOptions>,
) => {
	return await CatRequest.insertOne(args);
};

export const findCatRequestsInPolygon = async (
	polygon: { coordinates: number[][] },
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
