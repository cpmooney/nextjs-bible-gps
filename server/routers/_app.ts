import {ZodCitation} from "@/models/citation";
import {usingDbProcedures} from "@/utilities/db-procedures";
import {CitationTable} from "db/schema/citation-table";
import {usingDbLoadAllProcedure} from "server/db-load-all-rows";
import {usingDbSaveChangedProcedure} from "server/db-save-changed";
import {router} from "../trpc";
import { usingDbSavePartialCitationProcedure } from "server/db-save-partial-citation";

const dbProcedures = usingDbProcedures({
  rowType: ZodCitation,
  schema: {CitationTable},
});

const loadAllProcedure = usingDbLoadAllProcedure();
const saveChangedScoresProcedure = usingDbSaveChangedProcedure();
const savePartialCitationProcedure = usingDbSavePartialCitationProcedure();

export const appRouter = router({
  ...dbProcedures,
  loadAllProcedure,
  saveChangedScoresProcedure,
  savePartialCitationProcedure,
});

// export type definition of API
export type AppRouter = typeof appRouter;
