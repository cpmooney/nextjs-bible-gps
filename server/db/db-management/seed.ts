import {PgTable} from "drizzle-orm/pg-core";
import {readFileSync, readdirSync} from "fs";
import path from "path";
import {DbActionBase} from "../../../utilities/db-action";

export abstract class DbManageActionSeed extends DbActionBase<void> {
  public async executeAction(): Promise<void> {
    this.seedPaths().forEach(async (path) => {
      const filePayload = this.loadPayloadFromFile(path);
      await this.sendPayloadToDb(filePayload);
      this.info(`Seed complete: ${filePayload.cards.length} cards inserted`);
    });
  }

  protected abstract parseJsonPayload(body: any): any;

  protected abstract sendPayloadToDb(payload: any): Promise<void>;

  public constructor() {
    super();
  }

  protected insertRows(table: PgTable, rows: any[]) {
    this.getDatabase().insert(table).values(rows).execute();
  }

  private loadPayloadFromFile(path: string) {
    const body = readFileSync(path, "utf8");
    this.info(`Loaded file ${body.slice(0, 100)} ...`);
    const response = this.tryParseDeckResponse(body);
    this.info(`Parsed file ${response.module} ${response.chapter.title}`);
    return response;
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
