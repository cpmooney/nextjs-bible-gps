import {sql} from "@vercel/postgres";
import {CardTable} from "db/schema/card-table";
import {ChapterTable} from "db/schema/chapter-table";
import {drizzle} from "drizzle-orm/vercel-postgres";

export const obtainDatabase = () => {
  try {
    return drizzle(sql, {
      schema: {CardTable, ChapterTable},
    });
  } catch (e) {
    throw new Error("Failed to get database");
  }
};
