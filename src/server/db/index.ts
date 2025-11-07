import { MongoClient } from "mongodb";
import Papr from "papr";
import { Env } from "../utils/env";

export const papr = new Papr();

export async function initDb() {
  console.log(Env.DB_URL);
  const connection = await MongoClient.connect(Env.DB_URL);
  const db = connection.db("find-my-mixi");
  papr.initialize(db);
}
