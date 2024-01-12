import {CitationTable} from "db/schema/citation-table";
import {Citation} from "src/models/citation";
import {usingDatabase} from "../utilities/database";
import {usingDebugger} from "../utilities/debugger";

export const invokeDbImportAllAction = async (
  userId: string,
  allCards: Citation[]
) => {
  usingDatabase({CitationTable});
  usingDebugger("db-import-all", userId);

  // Drop all
  // Import all
};
