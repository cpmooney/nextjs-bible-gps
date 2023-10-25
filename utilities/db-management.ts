import {z} from "zod";

const ZodDbAction = z.enum(["drop", "seed"]);

export const ZodDbManagementRequest = z.object({
  module: z.string(),
  action: ZodDbAction,
});

export const ZodLogLevel = z.enum(["info", "warn", "error"]);

export const ZodDebugMessage = z.object({
  action: z.string(),
  message: z.string(),
  level: ZodLogLevel,
  timestamp: z.number(),
});

export const ZodDbManagementResponse = z.object({
  debugMessages: z.array(ZodDebugMessage),
});

export type DbManagementRequest = z.infer<typeof ZodDbManagementRequest>;
export type DbActionChoice = z.infer<typeof ZodDbAction>;

export const DbActionChoices = ZodDbAction.options;

export type DbManagementResponse = z.infer<typeof ZodDbManagementResponse>;

export type LogLevel = z.infer<typeof ZodLogLevel>;
export type DebugMessage = z.infer<typeof ZodDebugMessage>;
