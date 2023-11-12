import { SaveChangedRequest } from "server/db-save-changed";
import {Card} from "./card";
import {Citation} from "./citation";

export class Deck {
  public static of(citations: Citation[] | undefined): Deck {
    return new Deck(citations ?? []);
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

  public get activeNumber(): number {
    return this.activeCards.length;
  }

  public get changedNumber(): number {
    return this.getChangedCards().length;
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
    this.currentCard.resetScore();
  }

  private getChangedCards(): Card[] {
    return this.activeCards.filter((card) => card.changed);
  }

  public getChangeRequest(): SaveChangedRequest {
    return this.getChangedCards()
      .map((card) => { return { id: card.id, score: card.score }});
  }

  public resetChanged(): void {
    this.getChangedCards().forEach((card) => card.changed = false);
  }
}
