import {router} from "../trpc";
import { CitationTable } from "db/schema/citation-table";
import { usingDbProcedures } from "@/utilities/db-procedures";
import { ZodCitation } from "server/citations";

const dbProcedures = usingDbProcedures({
    rowType: ZodCitation,
    schema: { CitationTable },
    tableName: "citations",
});

export const appRouter = router(dbProcedures);

// export type definition of API
export type AppRouter = typeof appRouter;
