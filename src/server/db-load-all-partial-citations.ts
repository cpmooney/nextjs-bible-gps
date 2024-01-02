import { obtainDatabase, usingDatabase } from "../utilities/database";
import { debugLog, usingDebugger } from "../utilities/debugger";
import { PartialCitationTable } from "db/schema/partial-citation-table";

export interface PartialCitation {
  id: number;
  fragment: string;
}

export const invokeDbLoadAllPartialCitationAction = async (
  userId: string
): Promise<PartialCitation[]> => {
  usingDatabase({ PartialCitationTable });
  usingDebugger("db-load-all-partial-citations", userId);

  const records = await obtainDatabase().query.PartialCitationTable.findMany({
    where: (record, { eq }) => {
      return eq(record.userId, userId);
    },
  });
  debugLog("info", `Loaded ${records.length} records.`);
  return records.map(({ id, fragment }) => {
    return { id, fragment };
  }) as PartialCitation[];
};
