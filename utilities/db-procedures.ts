import { z } from "zod"
import { DbSchema } from "./database"
import { usingDbDropProcedure } from "./db-drop"
import { usingDbLoadAllProcedure } from "./db-load-all-rows"
import { usingDbSeedProcedure } from "./db-seed"

export interface DbActionConfig {
  seedDirectory?: string,
  payloadType: z.AnyZodObject,
  rowType: z.AnyZodObject,
  schema: DbSchema,
  tableName: string
}

export const usingDbProcedures = (config: DbActionConfig) => {
  return {
    dbSeedProcedure: usingDbSeedProcedure(config),
    dbDropProcedure: usingDbDropProcedure(config.schema),
    dbLoadAllProcedure: usingDbLoadAllProcedure(config.schema, config.rowType),
  }
}