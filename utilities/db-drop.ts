import {DbActionBase} from "./db-action";

export abstract class DbManageActionDrop extends DbActionBase<void> {
  public async executeAction(): Promise<void> {
    const deletedRecords = await this.getDatabase()
      .delete(ChapterTable)
      .where(eq(ChapterTable.module, this.module))
      .returning({id: ChapterTable.id})
      .execute();
    this.info(`Drop complete: ${deletedRecords.length} records deleted`);
  }
}
