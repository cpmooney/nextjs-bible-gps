import {SaveChangedScoresRequest} from "server/db-save-changed";
import {bibleBooks} from "./books";
import {Card} from "./card";
import {Citation} from "./citation";
import { drawCard, usingCardArrays } from "@/utilities/card-arrays";

export class Deck {
  public static of(citations: Citation[]): Deck {
    return new Deck(citations);
  }

  private constructor(citations: Citation[]) {
    if (citations.length > 0) {
      this.allCards = citations.map(Card.of);
      usingCardArrays(this.allCards);
      this.computeTotalScore();
    }
  }

  public initialScore: number = 0;
  public totalScore: number = 0;
  public computeTotalScore(): void {
    this.totalScore = this.allCards.reduce((sum, card) => {
      return sum + card.score;
    }, 0);
    this.initialScore = this.totalScore;
  }

  public get scoreIncrease(): number {
    return this.totalScore - this.initialScore;
  }

  public addChangeScoreToTotal(): void {
    this.totalScore = this.initialScore + this.scoreIncrease;
    this.initialScore = this.totalScore;
  }

  public get isEmpty(): boolean {
    return this.allCards.length === 0;
  }

  public get currentCard(): Card {
    if (this.isEmpty) {
      return Card.empty;
    }
    if (!this._currentCard) {
      this._currentCard = drawCard();
    }
    return this._currentCard;
  }

  private readonly allCards: Card[] = [];
  private _currentCard: Card | undefined

  public get changedNumber(): number {
    return Object.entries(this.cardsWithChangedScores).length;
  }

  public nextCard(): Card {
    this._currentCard = drawCard();
    return this.currentCard;
  }

  public incrementCardScore(): void {
    this.totalScore++;
    this.currentCard.incrementScore();
    this.addCurrentCardWithChangedScore();
  }

  public resetCardScore(): void {
    this.totalScore -= this.currentCard.score;
    this.currentCard.resetScore();
    this.addCurrentCardWithChangedScore();
  }

  public cardsWithChangedScores: Record<number, { score: number, lastReviewed: string }> = {};

  private addCurrentCardWithChangedScore(): void {
    this.cardsWithChangedScores[this.currentCard.guaranteedId] = {
      score: this.currentCard.score,
      lastReviewed: this.currentCard.lastReviewed.toISOString(),
    };
  }

  public get changedScoreRequest(): SaveChangedScoresRequest {
    return Object.entries(this.cardsWithChangedScores).map(([id, changeInfo]) => {
      return {id: parseInt(id), score: changeInfo.score, lastReviewed: changeInfo.lastReviewed};
    });
  }

  public orderedCards(): {book: string; cards: Card[]}[] {
    const cardsByBookDictionary = this.cardsByBookDictionary();
    const orderedPresentBooks = bibleBooks.filter(
      (book) => cardsByBookDictionary[book]
    );
    return orderedPresentBooks.map((book) => {
      return {book, cards: cardsByBookDictionary[book]};
    });
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
