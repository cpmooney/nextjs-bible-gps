import {readFileSync, readdirSync} from "fs";
import path from "path";
import {DbActionBase} from "../db-action";
import { z } from "zod";

export class DbManageActionSeed<T extends z.ZodTypeAny> extends DbActionBase<void> {
  public async executeAction(): Promise<void> {
    this.seedPaths(this.module).forEach(async (path) => {
      const deck = this.loadFile(path);
      const newChapterId = await this.insertChapter(
        deck.chapter.number,
        deck.chapter.title,
        deck.module
      );
      this.insertCards(newChapterId, deck.cards);
      this.info(`Seed complete: ${deck.cards.length} cards inserted`);
    });
  }

  public constructor(module: string) {
    super(module);
  }

  protected get actionName(): string {
    return "seed";
  }

  private loadFile(path: string): z.infer<T> {
    const body = readFileSync(path, "utf8");
    this.info(`Loaded file ${body.slice(0, 100)} ...`);
    const response = this.tryParseDeckResponse(body);
    this.info(`Parsed file ${response.module} ${response.chapter.title}`);
    return response;
  }

  private tryParseDeckResponse(body: string): z.infer<typeof T> {
    try {
      return z.infer<T>.parse(JSON.parse(body));
    } catch (e) {
      this.error(`Failed to parse deck response: ${e}`);
      throw new Error("Failed to parse deck response");
    }
  }

  private seedPaths(module: string): string[] {
    return readdirSync(this.seedDir(module)).map((file) =>
      path.join(this.seedDir(module), file)
    );
  }

  private seedDir(module: string): string {
    return path.join("db", "seeds", "questions", module);
  }

  private async insertChapter(chapter: number, title: string, module: string) {
    this.info(`Inserting chapter ${chapter} in module ${module}`);
    const database = super.getDatabase();
    const chapterRecords = await database
      .insert(ChapterTable)
      .values({
        chapter,
        title,
        module,
      })
      .returning();
    if (chapterRecords.length < 0 || !chapterRecords[0]?.id) {
      throw new Error(
        `Failed to insert a record for chapter ${chapter} in module ${module}`
      );
    }
    const chapterId: string = `${chapterRecords[0].id}`;
    this.info(`Inserted chapter ${chapter} in module ${module} with id ${chapterId}`);
    return chapterRecords[0].id;
  }

  private async insertCards(chapterId: number, cards: NewCardRecord[]) {
    const cardRecords = cards.map((card) => ({
      chapter: chapterId,
      question: card.question,
      answers: card.answers.join(CardAnswerDelimiter),
    }));
    this.info(`Inserting ${cardRecords.length} cards`);
    cardRecords.slice(0, 5).forEach((card) => {
      this.info(`Inserting ${card.question}`);
    });
    super.getDatabase().insert(CardTable).values(cardRecords).execute();
  }
}
