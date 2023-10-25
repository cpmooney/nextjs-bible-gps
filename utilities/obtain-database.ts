import {sql} from "@vercel/postgres";
import {PgTable} from "drizzle-orm/pg-core";
import {drizzle} from "drizzle-orm/vercel-postgres";

export type DbSchema = Record<string, PgTable>;

export const obtainDatabase = (schema: DbSchema) => {
  try {
    return drizzle(sql, {schema});
  } catch (e) {
    throw new Error("Failed to get database");
  }
};
