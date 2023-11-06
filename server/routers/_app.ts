import {router} from "../trpc";
import { CitationTable } from "db/schema/citation-table";
import { usingDbProcedures } from "@/utilities/db-procedures";
import { ZodCitation } from "@/models/citation";
import { usingDbLoadAllProcedure } from "server/db-load-all-rows";

const dbProcedures = usingDbProcedures({
    rowType: ZodCitation,
    schema: { CitationTable }
});

const loadAllProcedure = usingDbLoadAllProcedure({ CitationTable });

export const appRouter = router({ ...dbProcedures, loadAllProcedure });

// export type definition of API
export type AppRouter = typeof appRouter;
