import { z } from "zod"
import { DbSchema } from "./database"
import { usingDbDropProcedure } from "./db-drop"
import { usingDbSeedProcedure } from "./db-seed"

export interface DbActionConfig {
  rowType: z.AnyZodObject,
  schema: DbSchema,
  tableName?: string
  seedDirectory?: string,
  payloadType?: z.ZodTypeAny,
}

let config: DbActionConfigWithDefaults;

export const usingDbProcedures = (myConfig: DbActionConfig) => {
  config = withDefaults(myConfig);
  myConfig;
  return {
    dbSeedProcedure: usingDbSeedProcedure(config),
    dbDropProcedure: usingDbDropProcedure(config)
  }
}

export interface DbActionConfigWithDefaults {
  seedDirectory: string,
  payloadType: z.ZodTypeAny
  rowType: z.AnyZodObject,
  schema: DbSchema,
  tableName: string
}

const withDefaults = (config: DbActionConfig): DbActionConfigWithDefaults => {
  return {
    ...config,
    payloadType: config.payloadType ?? z.array(config.rowType),
    seedDirectory: config.seedDirectory ?? "db/seeds",
    tableName: defaulTableName(config)
  }
}

const defaulTableName = (config: DbActionConfig): string => {
  if (config.tableName) {
    return config.tableName;
  }
  if (Object.keys(config.schema).length === 1) {
    return Object.keys(config.schema)[0];
  }
  throw new Error("Table name must be specified when schema contains more than one table");
}
