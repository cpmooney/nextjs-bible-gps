import { z } from "zod";
import { obtainUserId } from "./current-auth";

const ZodLogLevel = z.enum(["info", "warn", "error"]);

export const ZodDebugMessage = z.object({
  userId: z.string().optional(),
  actionName: z.string(),
  message: z.string(),
  level: ZodLogLevel,
  timestamp: z.number(),
});

export type DebugMessage = z.infer<typeof ZodDebugMessage>;
export type LogLevel = z.infer<typeof ZodLogLevel>;

const debugMessages: DebugMessage[] = [];
let actionName: string;

export const usingDebugger = (newActionName: string) => {
  actionName = newActionName;
}

export const obtainDebugMessages = (): DebugMessage[] => {
  return debugMessages;
}

export const debugLog = (level: LogLevel, message: string) => {
  if (!actionName) {
    throw new Error("Debugger not initialized");
  }
  const timestamp = now();
  const userId = obtainUserId();
  const debugMessage: DebugMessage = {
    userId,
    message,
    level,
    timestamp,
    actionName,
  };
  debugMessages.push(debugMessage);
}

const now = (): number => {
  return new Date().getTime();
}
