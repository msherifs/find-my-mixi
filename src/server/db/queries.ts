import { DocumentForInsert, PaprFilter } from "papr";
import { User, UserDocument, UserOptions } from "./schema";

export const insertUser = async (
  args: DocumentForInsert<UserDocument, UserOptions>,
) => {
  return await User.insertOne(args);
};

export const findUser = async (filter: PaprFilter<UserDocument>) => {
  return await User.findOne(filter);
};
