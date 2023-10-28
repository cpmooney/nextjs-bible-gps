import {router} from "../trpc";
import { ZodCitation, ZodCitationList } from "server/db/citations";
import { CitationTable } from "db/schema/citation-table";
import { usingDbProcedures } from "@/utilities/db-procedures";

const dbProcedures = usingDbProcedures({
    payloadType: ZodCitationList,
    rowType: ZodCitation,
    schema: { CitationTable },
    tableName: "citations",
});

export const appRouter = router(dbProcedures);

// export type definition of API
export type AppRouter = typeof appRouter;
