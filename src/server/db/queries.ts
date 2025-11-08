import { DocumentForInsert, PaprFilter } from "papr";
import {
  CatRequest,
  CatRequestDocument,
  CatRequestOptions,
  User,
  UserDocument,
  UserOptions,
} from "./schema";

export const insertUser = async (
  args: DocumentForInsert<UserDocument, UserOptions>,
) => {
  return await User.insertOne(args);
};

export const findUser = async (filter: PaprFilter<UserDocument>) => {
  return await User.findOne(filter);
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
