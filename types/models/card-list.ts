import {Card, CardJson} from "./card";
import {provide} from "../../utilities/container";

export class CardList {
  private constructor(private Cards: Card[]) {}

  private totalScore: number = 0;
  private index: number = 0;

  public static fromCardListAsJson(
    cardListAsJson: CardJson[],
    chapterDefinitions: ChapterDefinitionJson[]
  ): CardList {
    const chapterList = chapterArray(chapterDefinitions);
    provide("chapter-titles", chapterList);
    return new CardList(
      cardListAsJson.map((cardAsJson) => Card.fromJson(cardAsJson))
    );
  }

  public nextCard(): Card {
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
