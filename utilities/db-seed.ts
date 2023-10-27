import {PgTable} from "drizzle-orm/pg-core";
import {readFileSync, readdirSync} from "fs";
import path from "path";
import {z} from "zod";
import {DbActionBase} from "./db-action";

export abstract class DbManageActionSeed<
  InputDataType
> extends DbActionBase<void> {
  protected abstract get zodSeedType(): z.AnyZodObject;

  protected abstract sendPayloadToDb(payload: InputDataType): Promise<void>;

  protected async executeAction(): Promise<void> {
    this.seedPaths().forEach(async (path) => {
      const filePayload = this.loadPayloadFromFile(path);
      await this.sendPayloadToDb(filePayload);
    });
  }

  public constructor() {
    super();
  }

  protected async insertRows(table: PgTable, rows: any[]) {
    this.getDatabase().insert(table).values(rows).execute();
  }

  private loadPayloadFromFile(path: string): InputDataType {
    this.info(`Loading payload from ${path}`);
    const body = readFileSync(path, "utf8");
    return this.tryParseBody(body);
  }

  private tryParseBody(body: string): InputDataType {
    try {
      return this.zodSeedType.parse(JSON.parse(body)) as InputDataType;
    } catch (e) {
      this.error(`Failed to parse: ${e}`);
      throw new Error("Failed to parse deck response");
    }
  }

  private seedPaths(): string[] {
    return readdirSync(this.seedDir()).map((file) =>
      path.join(this.seedDir(), file)
    );
  }

  private seedDir(): string {
    return path.join("db", "seeds");
  }
}
