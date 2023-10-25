import {ChapterTable} from "db/schema/chapter-table";
import {eq} from "drizzle-orm";
import {DbActionBase} from "../db-action";

export class DbManageActionDrop extends DbActionBase<void> {
  public async executeAction(): Promise<void> {
    const deletedRecords = await this.getDatabase()
      .delete(ChapterTable)
      .where(eq(ChapterTable.module, this.module))
      .returning({id: ChapterTable.id})
      .execute();
    this.info(`Drop complete: ${deletedRecords.length} records deleted`);
  }

  protected get actionName(): string {
    return "drop";
  }

  public constructor(module: string) {
    super(module);
  }
}
