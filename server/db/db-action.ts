import { DebugMessage, LogLevel } from "@/utilities/db-management";
import {obtainDatabase} from "server/db/utilities/database";

interface DbActionResponse<T> {
  payload: T;
  debugMessages: DebugMessage[];
}

export abstract class DbActionBase<T> {
  public async execute(): Promise<DbActionResponse<T>> {
    const payload = await this.executeAction();
    return {
      payload,
      debugMessages: this.debugMessages,
    };
  }

  protected abstract executeAction(): Promise<T>;

  protected abstract get actionName(): string;

  protected constructor(protected module: string) {}

  private debugMessages: DebugMessage[] = [];

  protected info(message: string) {
    this.appendDebugMessage(message, "info");
  }

  protected warn(message: string) {
    this.appendDebugMessage(message, "warn");
  }

  protected error(message: string) {
    this.appendDebugMessage(message, "error");
  }

  private now(): number {
    return new Date().getTime();
  }

  private appendDebugMessage(message: string, level: LogLevel) {
    const debugMessage = `db-action: ${this.actionName} ${message}`;
    console.log(debugMessage);
    this.debugMessages.push({
      message: debugMessage,
      level,
      timestamp: this.now(),
      action: this.actionName,
    });
  }

  protected getDatabase() {
    return obtainDatabase();
  }
}
