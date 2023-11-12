import {Citation, ZodCitation} from "@/models/citation";
import {CitationTable} from "db/schema/citation-table";
import {asc} from "drizzle-orm";
import {isAuthed, procedure} from "server/trpc";
import {z} from "zod";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {debugLog, usingDebugger} from "../utilities/debugger";

export const usingDbLoadAllProcedure = () =>
  procedure
    .use(isAuthed)
    .input(z.object({}))
    .output(z.array(ZodCitation))
    .query(async ({ctx}) => {
      return await invokeDbLoadAllAction(ctx.auth.userId);
    });

const invokeDbLoadAllAction = async (userId: string) => {
  usingDatabase({CitationTable});
  usingDebugger("db-load-all");

  const records = await obtainDatabase().query.CitationTable.findMany({
    where: (citation, {eq}) => {
      return eq(citation.userId, userId);
    },
    orderBy: [asc(CitationTable.id)],
  });
  debugLog("info", `Loaded ${records.length} records for user ${userId}.`);
  const citations: Citation[] = records.map((record) => {
    return {
      ...record,
      tags: record.tags as string[],
    };
  }) as Citation[];

  debugLog("info", `First record: ${JSON.stringify(citations[0])}`);

  return citations;
};
