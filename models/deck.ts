import {SaveChangedScoresRequest} from "server/db-save-changed";
import {bibleBooks} from "./books";
import {Card} from "./card";
import {Citation} from "./citation";
import { weightedRandomNumber } from "@/utilities/weighted-random-number";

const INTRO_CUTOFF = 3;
const INTRO_COUNT = 6;

export class Deck {
  public static of(citations: Citation[] | undefined): Deck {
    return new Deck(citations ?? []);
  }

  private constructor(citations: Citation[]) {
    this.allCards = citations.map(Card.of);
    this.computeActiveCards();
    this.computeIntroCards();
    this.computeTotalScore();
    this.computeMaxScore();
  }

  private computeIntroCards(): void {
    this.introCards = {};
    this.replenishIntroCards();
  }

  private computeActiveCards(): void {
    this.activeCards.length = 0;
    this.allCards.forEach((card) => {
      if (card.score > 0) {
        this.activeCards.push(card);
      }
    });
  }

  private replenishIntroCards(): void {
    if (this.numberOfIntroCards < INTRO_COUNT) {
      this.allCards.some((card) => {
        if (card.score < INTRO_CUTOFF) {
          this.introCards[card.id] = true;
          this.activeCards.push(card);
          return this.numberOfIntroCards >= INTRO_COUNT;
        }
      });
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

  private get numberOfIntroCards(): number {
    return Object.entries(this.introCards).length;
  }
  public get introCardIds(): number[] {
    return Object.keys(this.introCards).map((id) => parseInt(id));
  }
  private introCards: Record<number, boolean> = {};

  private readonly allCards: Card[] = [];
  public readonly activeCards: Card[] = [];

  private index: number = 0;

  public get currentCard(): Card {
    return this.activeCards[this.index];
  }

  public get activeNumber(): number {
    return this.activeCards.length;
  }

  public get changedNumber(): number {
    return Object.entries(this.cardsWithChangedScores).length;
  }

  public nextCard(): Card {
    this.advanceIndex();
    return this.currentCard;
  }

  private advanceIndex(): void {
    this.index = this.randomCardIndex();
  }

  private randomCardIndex(): number {
    let randomScore = this.randomScore();
    return this.randomCardIndexWithScore(randomScore);
  }

  private randomCardIndexWithScore(score: number): number {
    if (score === -1) {
      throw new Error("Cannot get random card with score 0");
    }
    const cardWithScore = this.activeCards.find((card) => {
      return card.score === score;
    });
    if (cardWithScore) {
      return this.activeCards.indexOf(cardWithScore);
    }
    return this.randomCardIndexWithScore(score - 1);
  }

  private randomScore(): number {
    return weightedRandomNumber(this.maxScore);
  }

  private computeMaxScore(): void {
    this.allCards.forEach((card) => {
      if (card.score > this.maxScore) {
        this.maxScore = card.score;
      }
    });
  }

  private maxScore: number = 0;

  public incrementScore(): void {
    this.totalScore++;
    this.currentCard.incrementScore();
    this.addCurrentCardWithChangedScore();
    this.removeCurrentFromIntroIfTooHighScore();
    this.replenishIntroCards();
  }

  private removeCurrentFromIntroIfTooHighScore(): void {
    if (this.currentCard.score >= INTRO_CUTOFF) {
      delete this.introCards[this.currentCard.id];
    }
  }

  public resetScore(): void {
    this.totalScore -= this.currentCard.score;
    this.currentCard.resetScore();
    this.addCurrentCardWithChangedScore();
  }

  public cardsWithChangedScores: Record<number, { score: number, lastReviewed: string }> = {};

  private addCurrentCardWithChangedScore(): void {
    this.cardsWithChangedScores[this.currentCard.id] = {
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
