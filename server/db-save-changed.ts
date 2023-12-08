import {CitationTable} from "db/schema/citation-table";
import {and, eq} from "drizzle-orm";
import {isAuthed, procedure} from "server/trpc";
import {z} from "zod";
import {obtainDatabase, usingDatabase} from "../src/utilities/database";
import {
  DebugMessage,
  ZodDebugMessage,
  debugLog,
  obtainDebugMessages,
  usingDebugger,
} from "../src/utilities/debugger";
import { obtainGuaranteedUserId } from "src/utilities/current-auth";

const ZodSaveChangedRequest = z.array(
  z.object({
    id: z.number(),
    score: z.number(),
    lastReviewed: z.string(), // TODO Workaround for a bug with trpc
  })
);

export type SaveChangedScoresRequest = z.infer<typeof ZodSaveChangedRequest>;

export const usingDbSaveChangedProcedure = () =>
  procedure
    .use(isAuthed)
    .input(ZodSaveChangedRequest)
    .output(z.array(ZodDebugMessage))
    .mutation(async ({input}) => {
      return await invokeDbSaveChangedAction(input);
    });

const invokeDbSaveChangedAction = async (
  changedRequest: SaveChangedScoresRequest
): Promise<DebugMessage[]> => {
  usingDatabase({CitationTable});
  usingDebugger("db-save-changed");
  debugLog(
    "info",
    `Saving changed citations: ${JSON.stringify(
      changedRequest
    )}`
  );

  await Promise.all(
    changedRequest.map(async (record) =>
    {
      try {
        const lastReviewed = new Date(record.lastReviewed);
        debugLog("info", "lastReviewed" + lastReviewed);
        await updateRecord(record.id, record.score, lastReviewed)
      }
      catch (e) {
        debugLog("error", "Error updating record: " + e);
    }})
  );
  return obtainDebugMessages();
};

const updateRecord = async (
  citationId: number,
  score: number,
  lastReviewed: Date
) => {
  debugLog("info", `Updating score on citation ${citationId} to be ${score} with last reviewed ${lastReviewed}`);
  const userId = obtainGuaranteedUserId();
  await obtainDatabase()
    .update(CitationTable)
    .set({score: score, last_reviewed: lastReviewed})
    .where(
      and(eq(CitationTable.id, citationId), eq(CitationTable.userId, userId))
    );
    debugLog("info", "Update complete!");
};
