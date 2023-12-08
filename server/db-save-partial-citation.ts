import {isAuthed, procedure} from "server/trpc";
import {z} from "zod";
import {obtainDatabase, usingDatabase} from "../src/utilities/database";
import {
  debugLog,
  usingDebugger,
} from "../src/utilities/debugger";
import { PartialCitationTable } from "db/schema/partial-citation-table";
import { obtainGuaranteedUserId } from "src/utilities/current-auth";

const ZodSavePartialCitationRequest = 
z.object({
  fragment: z.string(),
});

export type SavePartialCitationRequest = z.infer<typeof ZodSavePartialCitationRequest>;

export const usingDbSavePartialCitationProcedure = () =>
  procedure
    .use(isAuthed)
    .input(ZodSavePartialCitationRequest)
    .mutation(async ({input}) => {
      return await invokeDbSavePartialCitationAction(input);
    });

const invokeDbSavePartialCitationAction = async (
  request: SavePartialCitationRequest
): Promise<void> => {
  usingDatabase({PartialCitationTable});
  usingDebugger("db-save-partial-citation");
  const { fragment } = request;
  debugLog("info", `Saving partial citation ${fragment}.`);
  await updateRecord(fragment)
};

const updateRecord = async (
  fragment: string
) => {
  const userId = obtainGuaranteedUserId();
  await obtainDatabase().insert(PartialCitationTable).values({ userId, fragment }).execute();
};
