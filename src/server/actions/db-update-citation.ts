import {CitationTable} from "db/schema/citation-table";
import { Citation} from "src/models/citation";
import {obtainDatabase, usingDatabase} from "../../utilities/database";
import {debugLog, usingDebugger} from "../../utilities/debugger";

export const invokeDbUpdateCitationAction = async (
  userId: string,
  citation: Citation
): Promise<number> => {
  usingDatabase({CitationTable});
  usingDebugger("db-save-citation", userId);
  const fullCitation = `${citation.book} ${citation.chapter}:${citation.firstVerse}${citation.suffix}`;
  debugLog(
    "info",
    `Saving citation ${fullCitation}: ${JSON.stringify(citation)}`
  );

  const response = await obtainDatabase()
    .insert(CitationTable)
    .values([{...citation, userId}])
    .onConflictDoUpdate({
      target: CitationTable.id,
      set: citationWithoutId(citation),
    })
    .returning({id: CitationTable.id});
  const id = response[0].id;
  debugLog("info", `Saved with id ${id}`);
  return id;
};

const citationWithoutId = (citation: Citation): Citation => {
  const {id, ...citationWithoutId} = citation;
  return citationWithoutId;
};

export interface ScoreUpdate {
  id: number;
  score: number;
  lastReviewed: Date;
}

