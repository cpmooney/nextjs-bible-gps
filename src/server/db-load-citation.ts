import {CitationTable} from "db/schema/citation-table";
import {Citation} from "src/models/citation";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {debugLog, usingDebugger} from "../utilities/debugger";

export const invokeDbLoadCitationAction = async (
  userId: string,
  citationId: number
): Promise<Citation> => {
  usingDatabase({CitationTable});
  usingDebugger("db-load-citation", userId);
  debugLog(
    "info",
    `Loading citation by id ${citationId}`
  );

  const response = await obtainDatabase()
    .query
    .CitationTable
    .findFirst({
      where: (citation, {eq}) => {
        return eq(citation.id, citationId);
      },
    });
  if (!response) {
    throw new Error(`No citation found with id ${citationId}`);
  }
  debugLog("info", `Loaded ${JSON.stringify(response)} record.`);
  return response as Citation;
};
