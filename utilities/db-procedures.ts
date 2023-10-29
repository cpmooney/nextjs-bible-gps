import { z } from "zod"
import { DbSchema } from "./database"
import { usingDbDropProcedure } from "./db-drop"
import { usingDbLoadAllProcedure } from "./db-load-all-rows"
import { usingDbSeedProcedure } from "./db-seed"

export interface DbActionConfig {
  seedDirectory?: string,
  payloadType?: z.ZodTypeAny
  rowType: z.AnyZodObject,
  schema: DbSchema,
  tableName: string
}

let config: DbActionConfigWithDefaults;

export const usingDbProcedures = (myConfig: DbActionConfig) => {
  config = withDefaults(myConfig);
  myConfig;
  return {
    dbLoadAllProcedure: usingDbLoadAllProcedure(config),
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
    seedDirectory: config.seedDirectory ?? "db/seeds"
  }
}
