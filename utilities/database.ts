import {sql} from "@vercel/postgres";
import { PgTable} from "drizzle-orm/pg-core";
import {VercelPgDatabase, drizzle} from "drizzle-orm/vercel-postgres";

export type DbSchema = Record<string, PgTable>;

let database: VercelPgDatabase<DbSchema>;
let schema: DbSchema;

export const usingDatabase = (mySchema: DbSchema) => {
  schema = mySchema;
  database = createDatabase(schema);
  return database;
}

export const obtainDbSchema = (): DbSchema => {
  if (!schema) {
    throw new Error("Schema not initialized");
  }
  return schema;
}

export const obtainDatabase = (): VercelPgDatabase<DbSchema> => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}

const createDatabase = (schema: DbSchema) => {
  try {
    return drizzle(sql, {schema});
  } catch (e) {
    throw new Error("Failed to get database");
  }
};
