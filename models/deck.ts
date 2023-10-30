import { Card } from "./card";
import { Citation } from "./citation";

export class Deck {
  public static of(citations: Citation[]): Deck {
    return new Deck(citations);
  }

  private constructor(citations: Citation[]) {
    this.cards = citations.map(Card.of);
  }

  private readonly cards: Card[];

  private totalScore: number = 0;
  private index: number = 0;

  public nextCard(): Card {
    this.advanceIndex();
    return this.cards[this.index];
  }

  private advanceIndex(): void {
    this.index = (this.index + 1) % this.cards.length;
  }

  public incrementScore(index: number): void {
    this.cards[index].score++;
    this.totalScore++;
  }
}
