import {DeckPayload} from "@/types/zod/card-list";
import {obtainDatabase} from "@/utilities/obtain-database";
import {DbActionBase} from "server/db-action";

export class DbQueryDeck extends DbActionBase<DeckPayload> {
  protected get actionName(): string {
    return "deck";
  }

  public constructor(module: string, private chapter: number) {
    super(module);
  }

  public async executeAction() {
    const chapterRecord = await this.getChapterRecord();
    const cardRecords = await this.getCardRecords(chapterRecord.id);

    return {
      module: this.module,
      chapter: {
        title: chapterRecord.title,
        number: chapterRecord.chapter,
      },
      cards: cardRecords,
    };
  }

  private async getChapterRecord() {
    const chapterRecord = await obtainDatabase().query.ChapterTable.findFirst({
      where: (chapterRecord, {eq}) => {
        return (
          eq(chapterRecord.module, this.module) &&
          eq(chapterRecord.chapter, this.chapter)
        );
      },
    });

    if (!chapterRecord) {
      throw new Error(
        `Chapter record not found for module ${this.module} and chapter ${this.chapter}`
      );
    }

    return chapterRecord;
  }

  private async getCardRecords(chapterId: number) {
    const cardRecords = await obtainDatabase().query.CardTable.findMany({
      where: (cardRecord, {eq}) => {
        return eq(cardRecord.chapter, chapterId);
      },
    });
    return cardRecords.map((cardRecord) => {
      return {
        id: cardRecord.id,
        question: cardRecord.question,
        answers: cardRecord.answers.split(CardAnswerDelimiter),
      };
    });
  }
}
