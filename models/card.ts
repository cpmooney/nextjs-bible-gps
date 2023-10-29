import {obtain} from "../utilities/container";

export interface CardJson {
  chapter: number;
  question: string;
  answers: string[];
}

export class Card {
  private constructor(
    private Question: string,
    private Answers: string[],
    private Score: number,
    private ChapterNumber: number,
    private Chapter: string,
    private Id: string = ""
  ) {}

  public static fromJson(json: CardJson): Card {
    return new Card(
      json.question,
      json.answers,
      0,
      json.chapter,
      this.chapterFromNumber(json.chapter)
    );
  }

  private static chapterFromNumber(chapter: number): string {
    const chapterTitles = obtain<string[]>("chapter-titles");
    return `${chapter}. ${chapterTitles[chapter]}`;
  }

  public toJson(): CardJson {
    return {
      chapter: this.ChapterNumber,
      question: this.Question,
      answers: this.Answers,
    };
  }

  public get chapter(): string {
    return this.Chapter;
  }

  public get question(): string {
    return this.Question;
  }

  public get answers(): string[] {
    return this.Answers;
  }

  public incrementScore(): void {
    this.Score++;
  }
}
