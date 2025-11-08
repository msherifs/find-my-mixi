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
