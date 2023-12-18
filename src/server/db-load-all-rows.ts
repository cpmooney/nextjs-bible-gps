import {CitationTable} from "db/schema/citation-table";
import {asc} from "drizzle-orm";
import {Citation} from "src/models/citation";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {debugLog, usingDebugger} from "../utilities/debugger";

export const invokeDbLoadAllAction = async (userId: string) => {
  usingDatabase({CitationTable});
  usingDebugger("db-load-all", userId);

  const records = await obtainDatabase().query.CitationTable.findMany({
    where: (citation, {eq}) => {
      return eq(citation.userId, userId);
    },
    orderBy: [asc(CitationTable.id)],
  });
  debugLog("info", `Loaded ${records.length} records.`);
  const citations: Citation[] = records.map((record) => {
    return {
      ...record,
      tags: record.tags as string[],
    };
  }) as Citation[];

  debugLog("info", `First record: ${JSON.stringify(citations[0])}`);

  return citations;
};
