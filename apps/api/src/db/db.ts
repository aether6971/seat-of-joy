import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { __prod__ } from "../constants";
import { database_config } from "./database.config";

const client = postgres(database_config());
export const db = drizzle(client);
