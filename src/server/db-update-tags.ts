import {CitationTable} from "db/schema/citation-table";
import {and, eq} from "drizzle-orm";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {debugLog, usingDebugger} from "../utilities/debugger";

export const invokeDbUpdateTagsAction = async (
  userId: string,
  citationId: number,
  tags: string[]
): Promise<void> => {
  usingDatabase({CitationTable});
  usingDebugger("db-update-tags", userId);
  debugLog(
    "info",
    `Saving tags for citation ${citationId}: ${JSON.stringify(tags)}`
  );

  await obtainDatabase()
    .update(CitationTable)
    .set({tags: tags})
    .where(
      and(eq(CitationTable.id, citationId), eq(CitationTable.userId, userId))
    );
  debugLog("info", `Tags saved for citation ${citationId}!`);
};
