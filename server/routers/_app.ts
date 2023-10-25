import {router} from "../trpc";
import { CitationTable } from "db/schema/citation-table";
import { usingDbProcedures } from "@/utilities/db-procedures";
import { ZodCitation } from "@/models/citation";

const dbProcedures = usingDbProcedures({
    rowType: ZodCitation,
    schema: { CitationTable }
});

export const appRouter = router(dbProcedures);

// export type definition of API
export type AppRouter = typeof appRouter;
