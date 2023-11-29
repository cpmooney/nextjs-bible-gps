import {isAuthed, procedure} from "server/trpc";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {
  debugLog,
  usingDebugger,
} from "../utilities/debugger";
import { obtainGuaranteedUserId } from "@/utilities/current-auth";
import { CitationTable } from "db/schema/citation-table";
import { Citation, ZodCitation } from "@/models/citation";

export const usingDbUpdateCitationProcedure = () =>
  procedure
    .use(isAuthed)
    .input(ZodCitation)
    .mutation(async ({input}) => {
      return await invokeDbUpdateCitationAction(input);
    });

const invokeDbUpdateCitationAction = async (
  citation: Citation
): Promise<void> => {
  usingDatabase({CitationTable});
  usingDebugger("db-save-partial-citation");
  const fullCitation = `${citation.book} ${citation.chapter}:${citation.firstVerse}${citation.suffix}`;
  debugLog("info", `Saving citation ${fullCitation}`);
  const userId = obtainGuaranteedUserId();

  await obtainDatabase()
    .insert(CitationTable)
    .values([{...citation, userId}])
    .onConflictDoUpdate({
      target: CitationTable.id,
      set: citationWithoutId(citation), 
    })
    .execute();
};

const citationWithoutId = (citation: Citation): Citation => {
  const {id, ...citationWithoutId} = citation;
  return citationWithoutId;
}
