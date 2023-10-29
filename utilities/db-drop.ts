import { z } from "zod";
import { DbSchema, obtainDatabase, obtainDbSchema, usingDatabase } from "./database";
import { ZodDebugMessage, debugLog, obtainDebugMessages, usingDebugger } from "./debugger";
import { procedure } from "server/trpc";

export const usingDbDropProcedure = (schema: DbSchema) => procedure
  .input(z.object({}))
  .output(z.array(ZodDebugMessage))
  .mutation(async () => {
    return await invokeDbDropAllAction(schema);
  });

const invokeDbDropAllAction = async (schema: DbSchema) => {
  usingDatabase(schema);
  usingDebugger("db-drop-all");

  const tableNames = Object.keys(obtainDbSchema());
  await Promise.all(tableNames.map(async (tableName) =>
  {
    debugLog('info', `Dropping ${tableName}`);
    const table = schema[tableName];
    const deletedRecords = await obtainDatabase()
      .delete(table)
      .returning()
      .execute();
    debugLog('info', `Drop complete: ${deletedRecords.length} records deleted`);
  }));

  return obtainDebugMessages();
}
