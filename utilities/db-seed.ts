import {readFileSync, readdirSync} from "fs";
import path from "path";
import {z} from "zod";
import { obtainDatabase, usingDatabase } from "./database";
import { ZodDebugMessage, debugLog, obtainDebugMessages, usingDebugger } from "./debugger";
import { procedure } from "server/trpc";
import { DbActionConfig } from "./db-procedures";

let config: DbActionConfig;

export const usingDbSeedProcedure = (config: DbActionConfig) => procedure
  .input(z.object({}))
  .output(z.array(ZodDebugMessage))
  .mutation(async () => {
    return await invokeDbSeedAction(config);
  });

const invokeDbSeedAction = async <RowType>(myConfig: DbActionConfig) => {
  config = myConfig;
  usingDatabase(config.schema);
  usingDebugger("db-seed");
  debugLog("info", `Seeding ${config.tableName}`);
  
  await Promise.all(seedPaths().map(async (path) => {
    debugLog("info", `Seeding ${path}`);
    const rows = loadPayloadFromFile<RowType[]>(path);
    // Future: Create ability to transform more complex payloads
    await insertRows(config.tableName, rows);
  }));
  
  return obtainDebugMessages();
}

const insertRows = async (tableName: string, rows: any[]) => {
  const table = config.schema[tableName];
  obtainDatabase().insert(table).values(rows).execute();
}

const loadPayloadFromFile = <PayloadType>(path: string): PayloadType => {
  debugLog('info', `Loading payload from ${path}`);
  const body = readFileSync(path, "utf8");
  return tryParseBody<PayloadType>(body);
}

const tryParseBody = <PayloadType>(body: string): PayloadType => {
  try {
    return config.payloadType.parse(JSON.parse(body)) as PayloadType;
  } catch (e) {
    debugLog("error", `Failed to parse: ${e}`);
    throw new Error("Failed to parse deck response");
  }
}

const seedPaths = (): string[] => {
  const seedPath = ["db", "seeds"];
  if (config.seedDirectory) {
    seedPath.push(config.seedDirectory);
  }
  const seedDir = path.join(...seedPath);
  return readdirSync(seedDir).map((file) =>
    path.join(seedDir, file)
  );
}
