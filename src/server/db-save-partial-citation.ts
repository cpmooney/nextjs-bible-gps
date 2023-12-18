import {PartialCitationTable} from "db/schema/partial-citation-table";
import {obtainDatabase, usingDatabase} from "../utilities/database";
import {debugLog, usingDebugger} from "../utilities/debugger";

export interface SavePartialCitationRequest {
  fragment: string;
}

export const invokeDbSavePartialCitationAction = async (
  userId: string,
  request: SavePartialCitationRequest
): Promise<void> => {
  usingDatabase({PartialCitationTable});
  usingDebugger("db-save-partial-citation", userId);
  const {fragment} = request;
  debugLog("info", `Saving partial citation ${fragment}.`);
  await updateRecord(userId, fragment);
};

const updateRecord = async (userId: string, fragment: string) => {
  await obtainDatabase()
    .insert(PartialCitationTable)
    .values({userId, fragment})
    .execute();
};
