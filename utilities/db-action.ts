import {DebugMessage, LogLevel} from "@/utilities/db-management";
import {DbSchema, obtainDatabase} from "@/utilities/obtain-database";

interface DbActionResponse<ActionResponse> {
  payload: ActionResponse;
  debugMessages: DebugMessage[];
}

export abstract class DbActionBase<ActionResponse> {
  protected abstract executeAction(): Promise<ActionResponse>;

  protected abstract get dbSchema(): DbSchema;

  public async execute(): Promise<DbActionResponse<ActionResponse>> {
    const payload = await this.executeAction();
    return {
      payload,
      debugMessages: this.debugMessages,
    };
  }

  protected constructor() {}

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
    return obtainDatabase(this.dbSchema);
  }

  private get actionName(): string {
    return this.constructor.name;
  }
}
