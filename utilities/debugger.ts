import { z } from "zod";

const ZodLogLevel = z.enum(["info", "warn", "error"]);

export const ZodDebugMessage = z.object({
  action: z.string(),
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
  const debugMessage = `db-action: ${actionName} ${message}`;
  console.log(debugMessage);
  debugMessages.push({
    message: debugMessage,
    level,
    timestamp: now(),
    action: actionName,
  });
}

const now = (): number => {
  return new Date().getTime();
}
