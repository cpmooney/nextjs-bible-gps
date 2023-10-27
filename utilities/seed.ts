import {PgTable} from "drizzle-orm/pg-core";
import {readFileSync, readdirSync} from "fs";
import path from "path";
import {DbActionBase} from "./db-action";
import { z } from "zod";

export abstract class DbManageActionSeed extends DbActionBase {
  protected abstract parseJsonPayload(body: any): z.infer<typeof this.zodPayloadType>;

  protected abstract sendPayloadToDb(payload: z.infer<typeof this.zodPayloadType>): Promise<void>;

  public async executeAction(): Promise<void> {
    this.seedPaths().forEach(async (path) => {
      const filePayload = this.loadPayloadFromFile(path);
      await this.sendPayloadToDb(filePayload);
    });
  }

  public constructor() {
    super();
  }

  protected insertRows(table: PgTable, rows: any[]) {
    this.getDatabase().insert(table).values(rows).execute();
  }

  private loadPayloadFromFile(path: string): T {
    const body = readFileSync(path, "utf8");
    return this.tryParseDeckResponse(body);
  }

  private tryParseDeckResponse(body: string) {
    try {
      return this.parseJsonPayload(JSON.parse(body));
    } catch (e) {
      this.error(`Failed to parse deck response: ${e}`);
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
