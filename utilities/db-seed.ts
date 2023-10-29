import {readFileSync, readdirSync} from "fs";
import path from "path";
import {z} from "zod";
import { obtainDatabase, usingDatabase } from "./database";
import { ZodDebugMessage, debugLog, obtainDebugMessages, usingDebugger } from "./debugger";
import { procedure } from "server/trpc";
import { DbActionConfigWithDefaults } from "./db-procedures";

let config: DbActionConfigWithDefaults;

export const usingDbSeedProcedure = (config: DbActionConfigWithDefaults) => procedure
  .input(z.object({}))
  .output(z.array(ZodDebugMessage))
  .mutation(async () => {
    return await invokeDbSeedAction(config);
  });

const invokeDbSeedAction = async <RowType>(myConfig: DbActionConfigWithDefaults) => {
  config = myConfig;
  usingDatabase(config.schema);
  usingDebugger("db-seed");
  debugLog("info", `Seeding ${config.tableName}`);
  
  await Promise.all(seedPaths().map(async (path) => {
    debugLog("info", `Seeding ${path}`);
    const rows = loadPayloadFromFile<RowType[]>(path);
    debugLog("info", `Loaded ${rows.length} rows from ${path}`);
    // Future: Create ability to transform more complex payloads
    await tryInsertRows(config.tableName, rows);
  }));
  
  return obtainDebugMessages();
}

const tryInsertRows = async (tableName: string, rows: any[]) => {
  debugLog("info", `Inserting ${rows.length} rows into ${tableName}`);
  try {
    await insertRows(tableName, rows);
  } catch (e) {
    const errorMessage = `Failed to insert rows: ${e}`;
    debugLog("error", errorMessage);
    throw new Error(errorMessage);
  }
}

const insertRows = async (tableName: string, rows: any[]) => {
  const table = config.schema[tableName];
  await obtainDatabase().insert(table).values(rows).execute();
}

const loadPayloadFromFile = <PayloadType>(path: string): PayloadType => {
  debugLog('info', `Loading payload from ${path}`);
  const body = readFileSync(path, "utf8");
  debugLog('info', `Loaded file of length ${lengthOfBodyInLines(body)}`)
  return tryParseBody<PayloadType>(body);
}

const tryParseBody = <PayloadType>(body: string): PayloadType => {
  try {
    return config.payloadType.parse(JSON.parse(body)) as PayloadType;
  } catch (e) {
    const errorMessage = `Failed to parse seed file: ${e}`;
    debugLog("error", errorMessage);
    throw new Error(errorMessage);
  }
}

const seedPaths = (): string[] => {
  return readdirSync(config.seedDirectory).map((file) =>
    path.join(config.seedDirectory, file)
  );
}

const lengthOfBodyInLines = (body: string): number => {
  return body.split("\n").length;
}
