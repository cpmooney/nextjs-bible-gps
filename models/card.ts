import {bookNumber} from "./books";
import {Citation} from "./citation";

export class Card implements Citation {
  private constructor(
    public id: number,
    public fragment: string,
    public book: string,
    public chapter: number,
    public firstVerse: number,
    public suffix: string,
    public tags: string[],
    public entire: string,
    public active: boolean,
    public score: number,
    public userId: string
  ) {
    this.bookNumber = bookNumber(book);
    this.fullCitation = `${book} ${chapter}:${firstVerse}${suffix}`;
  }

  public readonly bookNumber: number;
  public fullCitation: string;

  public static of(citation: Citation): Card {
    return new Card(
      citation.id!,
      citation.fragment,
      citation.book,
      citation.chapter,
      citation.firstVerse,
      citation.suffix,
      citation.tags,
      citation.entire,
      citation.active,
      citation.score,
      citation.userId
    );
  }
}
