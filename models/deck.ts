import { SaveChangedRequest } from "server/db-save-changed";
import {Card} from "./card";
import {Citation} from "./citation";
import { bibleBooks } from "./books";

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
    return this.getCardsWithChangedScores().length;
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

  private getCardsWithChangedScores(): Card[] {
    return this.activeCards.filter((card) => card.scoreHasChanged);
  }

  public getChangedScoresRequest(): SaveChangedRequest {
    return this.getCardsWithChangedScores()
      .map((card) => { return { id: card.id, score: card.score }});
  }

  public resetChangedScoresStatus(): void {
    this.getCardsWithChangedScores().forEach((card) => card.scoreHasChanged = false);
  }

  public orderedCards(): { book: string, cards: Card[] }[] {
    const cardsByBookDictionary = this.cardsByBookDictionary();
    const orderedPresentBooks = bibleBooks.filter((book) => cardsByBookDictionary[book]);
    return orderedPresentBooks 
      .map((book) => { return { book, cards: cardsByBookDictionary[book] }});
  }

  private cardsByBookDictionary(): Record<string, Card[]> {
    const citationsByBook: Record<string, Card[]> = {};

    this.allCards.forEach((card) => {
        if (!citationsByBook[card.book]) {
            citationsByBook[card.book] = [];
        }
        this.insertCardInOrder(citationsByBook[card.book], card);
    });

    return citationsByBook;
  }

  private insertCardInOrder(cards: Card[], card: Card): void {
    const index = cards.findIndex((c) => Deck.compareCards(card, c));
    if (index === -1) {
      cards.push(card);
    } else {
      cards.splice(index, 0, card);
    }
  }

  private static compareCards(a: Card, b: Card): number {
    return b.chapter - a.chapter;
  }


}
