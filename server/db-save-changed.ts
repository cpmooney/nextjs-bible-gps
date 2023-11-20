import {CitationTable} from "db/schema/citation-table";
import {and, eq} from "drizzle-orm";
import {isAuthed, procedure} from "server/trpc";
import {z} from "zod";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {
  DebugMessage,
  ZodDebugMessage,
  debugLog,
  obtainDebugMessages,
  usingDebugger,
} from "../utilities/debugger";

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
    .mutation(async ({ctx, input}) => {
      return await invokeDbSaveChangedAction(ctx.auth.userId, input);
    });

const invokeDbSaveChangedAction = async (
  userId: string,
  changedRequest: SaveChangedScoresRequest
): Promise<DebugMessage[]> => {
  usingDatabase({CitationTable});
  usingDebugger("db-save-changed");
  debugLog(
    "info",
    `Saving changed citations for user ${userId}: ${JSON.stringify(
      changedRequest
    )}`
  );

  await Promise.all(
    changedRequest.map((record) =>
    {
      debugLog("info", "lastReviewed" + record.lastReviewed);
      const lastReviewed = new Date(record.lastReviewed);
      debugLog("info", "lastReviewed" + lastReviewed);
      updateRecord(userId, record.id, record.score, lastReviewed)
    }
    )
  );
  return obtainDebugMessages();
};

const updateRecord = async (
  userId: string,
  citationId: number,
  score: number,
  lastReviewed: Date
) => {
  debugLog("info", `Updating score on citation ${citationId} to be ${score} with last reviewed ${lastReviewed}`);
  await obtainDatabase()
    .update(CitationTable)
    .set({score: score, last_reviewed: lastReviewed})
    .where(
      and(eq(CitationTable.id, citationId), eq(CitationTable.userId, userId))
    );
    debugLog("info", "Update complete!");
};
