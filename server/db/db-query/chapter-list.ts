import {ChapterListPayload} from "@/types/interfaces/chapter-list";
import {obtainDatabase} from "@/utilities/obtain-database";
import {DbActionBase} from "server/db-action";

export class DbQueryActionChapterList extends DbActionBase<ChapterListPayload> {
  public async executeAction() {
    const chapterRecords = await this.getChapterRecords(this.module);
    return {
      module: this.module,
      chapters: chapterRecords,
    };
  }

  private async getChapterRecords(module: string) {
    const chapterRecords = await obtainDatabase().query.ChapterTable.findMany({
      where: (chapterRecord, {eq}) => {
        return eq(chapterRecord.module, module);
      },
    });
    this.info(`Found ${chapterRecords.length} chapters`);
    return chapterRecords.map((chapterRecord) => {
      return {
        id: chapterRecord.id,
        chapter: chapterRecord.chapter,
        title: chapterRecord.title,
      };
    });
  }

  protected get actionName(): string {
    return "chapter-list";
  }

  public constructor(module: string) {
    super(module);
  }
}
