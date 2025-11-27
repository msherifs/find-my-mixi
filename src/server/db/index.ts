import { MongoClient } from "mongodb";
import Papr from "papr";
import { Env } from "../utils/env";

export const papr = new Papr();

export async function initDb() {
	const connection = await MongoClient.connect(Env.DB_URL);
	const db = connection.db(Env.ENV);
	papr.initialize(db);
}
