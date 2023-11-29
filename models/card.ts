import {bookNumber} from "./books";
import {Citation} from "./citation";

export class Card implements Citation {
  private constructor(
    public id: number | undefined,
    public fragment: string,
    public book: string,
    public chapter: number,
    public firstVerse: number,
    public suffix: string,
    public tags: string[],
    public entire: string,
    public active: boolean,
    public score: number,
    public lastReviewed: Date = new Date(),
    public scoreHasChanged = false
  ) {
    this.bookNumber = bookNumber(book);
    this.fullCitation = `${book} ${chapter}:${firstVerse}${suffix}`;
  }

  public get bibleGatewayUrl() {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${this.book} ${this.chapter}`)}&version=NKJV`;
  }

  public static get empty() {
    return new Card(undefined, "", "", 0, 0, "", [], "", false, 0);
  }

  public readonly bookNumber: number;
  public fullCitation: string;

  public incrementScore() {
    this.score++;
    this.declareHasChanged();
  }

  public resetScore() {
    this.score = 0;
    this.declareHasChanged();
  }

  private declareHasChanged() {
    this.scoreHasChanged = true;
    this.lastReviewed = new Date();
  }

  public static of(citation: Citation): Card {
    return new Card(
      citation.id,
      citation.fragment,
      citation.book,
      citation.chapter,
      citation.firstVerse,
      citation.suffix,
      citation.tags,
      citation.entire,
      citation.active,
      citation.score,
    );
  }
}
