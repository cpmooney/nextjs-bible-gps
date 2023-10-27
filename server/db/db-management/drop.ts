import {eq} from "drizzle-orm";
import {DbActionBase} from "../../../utilities/db-action";

export class DbManageActionDrop extends DbActionBase<void> {
  protected async executeAction(): Promise<void> {
    const deletedRecords = await this.getDatabase()
      .delete(ChapterTable)
      .where(eq(ChapterTable.module, this.module))
      .returning({id: ChapterTable.id})
      .execute();
    this.info(`Drop complete: ${deletedRecords.length} records deleted`);
  }
}
