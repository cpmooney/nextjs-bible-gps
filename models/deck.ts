import {provide} from "../utilities/container";
import { bookNumber } from "./books";
import { Citation } from "./citation";

class Card implements Citation {
  constructor(
    public id: string,
    public fragment: string,
    public book: string,
    public chapter: number,
    public firstVerse: number,
    public suffix: string,
    public tags: string[],
    public entire: string,
    public active: boolean,
    public score: number
  ) { }

  public bookNumber: number = bookNumber(this.book);
}

export class Deck {
  private constructor(citations: Citation[]) {
  }

  private 

  private totalScore: number = 0;
  private index: number = 0;

  public static fromCardListAsJson(
    cardListAsJson: CardJson[],
    chapterDefinitions: ChapterDefinitionJson[]
  ): Deck {
    const chapterList = chapterArray(chapterDefinitions);
    provide("chapter-titles", chapterList);
    return new Deck(
      cardListAsJson.map((cardAsJson) => Card.fromJson(cardAsJson))
    );
  }

  public nextCard(): CardType {
    this.advanceIndex();
    return this.Cards[this.index];
  }

  private advanceIndex(): void {
    this.index = (this.index + 1) % this.Cards.length;
  }

  public incrementScore(index: number): void {
    this.Cards[index].incrementScore();
    this.totalScore++;
  }
}

export interface ChapterDefinitionJson {
  number: number;
  title: string;
}

const chapterArray = (chapters: ChapterDefinitionJson[]): string[] => {
  const result: string[] = [];
  for (const chapter of chapters) {
    result[chapter.number] = chapter.title;
  }
  return result;
};
