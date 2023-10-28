import { z } from "zod";
import { DbSchema, obtainDatabase, obtainDbSchema, usingDatabase } from "./database";
import { ZodDebugMessage, debugLog, obtainDebugMessages, usingDebugger } from "./debugger";
import { procedure } from "server/trpc";

export const usingDbDropProcedure = (schema: DbSchema) => procedure
  .input(z.object({}))
  .output(z.array(ZodDebugMessage))
  .query(async () => {
    return await invokeDbDropAllAction(schema);
  });

const invokeDbDropAllAction = async (schema: DbSchema) => {
  usingDatabase(schema);
  usingDebugger("db-drop-all");

  const tables = Object.values(obtainDbSchema());
  await Promise.all(tables.map(async (table) =>
  {
    const deletedRecords = await obtainDatabase()
      .delete(table)
      .returning({})
      .execute();
    debugLog('info', `Drop complete: ${deletedRecords.length} records deleted`);
  }));

  return obtainDebugMessages();
}
