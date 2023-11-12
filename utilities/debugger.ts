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
  const timestamp = now();
  console.log(`${formatUnixTimeAsLocaleString(timestamp)} ${debugMessage}`);
  debugMessages.push({
    message: debugMessage,
    level,
    timestamp,
    action: actionName,
  });
}

const formatUnixTimeAsLocaleString = (unixTime: number): string => {
  return new Date(unixTime).toLocaleString(undefined, { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false,
    timeZoneName: 'short',
    fractionalSecondDigits: 3
  });
}

const now = (): number => {
  return new Date().getTime();
}
