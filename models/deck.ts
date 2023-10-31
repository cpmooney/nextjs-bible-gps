import {Card} from "./card";
import {Citation} from "./citation";

export class Deck {
  public static of(citations: Citation[]): Deck {
    return new Deck(citations);
  }

  private constructor(citations: Citation[]) {
    this.cards = citations.map(Card.of);
  }

  public readonly cards: Card[];

  private totalScore: number = 0;
  private index: number = 0;

  public get currentCard(): Card {
    return this.cards[this.index];
  }

  public nextCard(): Card {
    this.advanceIndex();
    return this.currentCard;
  }

  private advanceIndex(): void {
    this.index = (this.index + 1) % this.cards.length;
  }

  public incrementScore(): void {
    this.currentCard.score++;
    this.totalScore++;
  }

  public resetScore(): void {
    this.currentCard.score = 0;
  }
}
