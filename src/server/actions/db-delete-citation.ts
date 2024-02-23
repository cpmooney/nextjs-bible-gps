import {obtainDatabase, usingDatabase} from "@/utilities/database";
import {debugLog, usingDebugger} from "@/utilities/debugger";
import {CitationTable} from "db/schema/citation-table";
import {and, eq} from "drizzle-orm";

export const invokeDeleteCardAction = async (userId: string, id: number) => {
  usingDatabase({CitationTable});
  usingDebugger("db-delete-citation", userId);
  debugLog("info", `Deleting citation ${id}.`);
  await obtainDatabase()
    .delete(CitationTable)
    .where(and(eq(CitationTable.userId, userId), eq(CitationTable.id, id)))
    .execute();
};
