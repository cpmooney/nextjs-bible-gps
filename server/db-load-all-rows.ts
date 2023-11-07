import { z } from "zod";
import { DbSchema, obtainDatabase, usingDatabase } from "../utilities/database";
import { debugLog, usingDebugger } from "../utilities/debugger";
import { isAuthed, procedure } from "server/trpc";
import { Citation, ZodCitation } from "@/models/citation";

export const usingDbLoadAllProcedure = (schema: DbSchema) => procedure
  .use(isAuthed)
  .input(z.object({}))
  .output(z.array(ZodCitation))
  .query(async ({ ctx }) => {
    return await invokeDbLoadAllAction(schema, ctx.auth.userId);
  });

const invokeDbLoadAllAction = async (schema: DbSchema, userId: string) => {
  usingDatabase(schema);
  usingDebugger("db-load-all");

  // Future: Support multiple tables, conversion
  const records = await obtainDatabase()
    .query
    .CitationTable
    .findMany({
      where: (citation, {eq}) => {
        return eq(citation.userId, userId);
      }});
  debugLog('info', `Loaded ${records.length} records for user ${userId}.`);
  const citations: Citation[] = records.map((record) => {
    return {
      ...record,
      tags: record.tags as string[],
    }
  }) as Citation[];

  return citations;
}
