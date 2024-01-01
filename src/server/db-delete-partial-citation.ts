import { obtainDatabase, usingDatabase } from "@/utilities/database";
import { debugLog, usingDebugger } from "@/utilities/debugger";
import { PartialCitationTable } from "db/schema/partial-citation-table";
import { and, eq } from "drizzle-orm";

export const invokeDeletePartialCardAction = async (userId: string, id: number) => {
    usingDatabase({ PartialCitationTable});
    usingDebugger("db-delete-partial-citation", userId);
    debugLog("info", `Deleting partial citation ${id}.`);
    await obtainDatabase()
        .delete(PartialCitationTable)
        .where(and(eq(PartialCitationTable.userId, userId), eq(PartialCitationTable.id, id)))
        .execute();
}
