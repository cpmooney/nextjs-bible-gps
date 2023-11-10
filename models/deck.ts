import {Card} from "./card";
import {Citation} from "./citation";

export class Deck {
  public static of(citations: Citation[]): Deck {
    return new Deck(citations);
  }

  private constructor(citations: Citation[]) {
    this.allCards = citations.map(Card.of);
    this.activeCards = this.allCards.slice(0, 5);
  }

  private readonly allCards: Card[];
  public readonly activeCards: Card[];

  private index: number = 0;

  public get currentCard(): Card {
    return this.activeCards[this.index];
  }

  public nextCard(): Card {
    this.advanceIndex();
    return this.currentCard;
  }

  private advanceIndex(): void {
    this.index = (this.index + 1) % this.activeCards.length;
  }

  public incrementScore(): void {
    this.currentCard.incrementScore();
  }

  public resetScore(): void {
    this.currentCard.score = 0;
  }

  public getChangedCards(): Card[] {
    return this.activeCards.filter((card) => card.changed);
  }

  public resetChanged(): void {
    this.getChangedCards().forEach((card) => card.resetScore());
  }
}
