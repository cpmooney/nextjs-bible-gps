import { obtainDatabase, usingDatabase } from "@/utilities/database";
import { debugLog, usingDebugger } from "@/utilities/debugger";
import { CitationTable } from "db/schema/citation-table";
import { invokeDbLoadAllAction } from "./db-load-all-rows";
import { demoUser } from "src/constants";
import { Citation } from "@/models/citation";

export const invokeDbDuplicateDemoCards = async (userId: string) => {
  usingDatabase({ CitationTable });
  usingDebugger("db-duplicate-demo-cards", userId);

  const demoCards = await invokeDbLoadAllAction(demoUser);
  for (const demoCard of demoCards) {
    const newCard = citationWithoutId(demoCard);
    const response = await obtainDatabase()
      .insert(CitationTable)
      .values([{ ...newCard, userId }])
      .returning({ id: CitationTable.id });
    const id = response[0].id;
    debugLog("info", `Saved with id ${id}`);
  }
};

const citationWithoutId = (citation: Citation): Citation => {
  const {id, ...citationWithoutId} = citation;
  return citationWithoutId;
};
