import { z } from "zod";
import { DbSchema, obtainDatabase, obtainDbSchema, usingDatabase } from "./database";
import { ZodDebugMessage, debugLog, obtainDebugMessages, usingDebugger } from "./debugger";
import { procedure } from "server/trpc";

export const usingDbLoadAllProcedure = (schema: DbSchema, rowType: z.AnyZodObject) => procedure
  .input(z.object({}))
  .output(z.object({
    rows: z.array(rowType),
    debugMessages: z.array(ZodDebugMessage),
  }))
  .query(async () => {
    return await invokeDbLoadAllAction(schema);
  });

const invokeDbLoadAllAction = async (schema: DbSchema) => {
  usingDatabase(schema);
  usingDebugger("db-load-all");

  const table = Object.values(obtainDbSchema())[0];
  // Future: Support multiple tables, conversion
  const records = await obtainDatabase()
    .select()
    .from(table)
    .execute();
  debugLog('info', `Loaded ${records.length} records`);

  return {
    rows: records,
    debugMessages: obtainDebugMessages(),
  }
}
