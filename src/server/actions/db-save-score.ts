import {CitationTable} from "db/schema/citation-table";
import {and, eq} from "drizzle-orm";
import {obtainDatabase, usingDatabase} from "../../utilities/database";
import {
  DebugMessage,
  debugLog,
  obtainDebugMessages,
  usingDebugger,
} from "../../utilities/debugger";
import { ScoreUpdate } from "./db-update-citation";

export const invokeDbSaveChangedAction = async (
  userId: string,
  changedRequest: ScoreUpdate
): Promise<DebugMessage[]> => {
  usingDatabase({CitationTable});
  usingDebugger("db-save-changed", userId);
  debugLog(
    "info",
    `Saving changed citations: ${JSON.stringify(changedRequest)}`
  );

      try {
        const lastReviewed = new Date(changedRequest.lastReviewed);
        debugLog("info", "lastReviewed" + lastReviewed);
        await updateRecord(userId, changedRequest.id, changedRequest.score, lastReviewed);
      } catch (e) {
        debugLog("error", "Error updating record: " + e);
      }
  return obtainDebugMessages();
};

const updateRecord = async (
  userId: string,
  citationId: number,
  score: number,
  lastReviewed: Date
) => {
  debugLog(
    "info",
    `Updating score on citation ${citationId} to be ${score} with last reviewed ${lastReviewed}`
  );
  await obtainDatabase()
    .update(CitationTable)
    .set({score: score, last_reviewed: lastReviewed})
    .where(
      and(eq(CitationTable.id, citationId), eq(CitationTable.userId, userId))
    );
  debugLog("info", "Update complete!");
};
