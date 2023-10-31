import { z } from "zod";
import { DbSchema, obtainDatabase, obtainDbSchema, usingDatabase } from "../utilities/database";
import { ZodDebugMessage, debugLog, obtainDebugMessages, usingDebugger } from "../utilities/debugger";
import { procedure } from "server/trpc";
import { DbActionConfigWithDefaults } from "../utilities/db-procedures";
import { Citation, ZodCitation } from "@/models/citation";
import { CitationTable } from "db/schema/citation-table";

export const usingDbLoadAllProcedure = (config: DbActionConfigWithDefaults) => procedure
  .input(z.object({}))
  .output(z.object({
    // Future: Figure out how to make ZodCitation generic
    rows: z.array(ZodCitation),
    debugMessages: z.array(ZodDebugMessage),
  }))
  .query(async () => {
    return await invokeDbLoadAllAction(config.schema);
  });

const invokeDbLoadAllAction = async (schema: DbSchema)  => {
  usingDatabase(schema);
  usingDebugger("db-load-all");

  // Future: Support multiple tables, conversion
  const records = await obtainDatabase()
    .select()
    .from(CitationTable)
    .execute();
  debugLog('info', `Loaded ${records.length} records`);
  const citations: Citation[] = records.map((record) => {
    return {
      ...record,
      tags: record.tags as string[],
    }
  });

  return {
    rows: citations,
    debugMessages: obtainDebugMessages(),
  }
}
