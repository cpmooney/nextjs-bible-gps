import {z} from "zod";

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
let userId: string | undefined;

export const usingDebugger = (newActionName: string, newUserId: string) => {
  actionName = newActionName;
  userId = newUserId;
};

export const obtainDebugMessages = (): DebugMessage[] => {
  return debugMessages;
};

export const debugLog = (level: LogLevel, message: string) => {
  if (!actionName) {
    throw new Error("Debugger not initialized");
  }
  const timestamp = now();
  const debugMessage: DebugMessage = {
    userId,
    message,
    level,
    timestamp,
    actionName,
  };
  console.log(debugMessage);
  debugMessages.push(debugMessage);
};

const now = (): number => {
  return new Date().getTime();
};
