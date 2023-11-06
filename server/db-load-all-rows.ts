import { z } from "zod";
import { DbSchema, obtainDatabase, usingDatabase } from "../utilities/database";
import { debugLog, usingDebugger } from "../utilities/debugger";
import { procedure } from "server/trpc";
import { Citation, ZodCitation } from "@/models/citation";
import { CitationTable } from "db/schema/citation-table";

import { auth } from '@clerk/nextjs';

export const usingDbLoadAllProcedure = (schema: DbSchema) => procedure
  .input(z.object({}))
  .output(z.array(ZodCitation))
  .query(async () => {
    return await invokeDbLoadAllAction(schema);
  });

const invokeDbLoadAllAction = async (schema: DbSchema) => {
  usingDatabase(schema);
  usingDebugger("db-load-all");

  // Future: Support multiple tables, conversion
  const records = await obtainDatabase()
    .select()
    .from(CitationTable)
    .execute();
  debugLog('info', `Loaded ${records.length} records.`);
  const citations: Citation[] = records.map((record) => {
    return {
      ...record,
      tags: record.tags as string[],
    }
  });

  return citations;
}
