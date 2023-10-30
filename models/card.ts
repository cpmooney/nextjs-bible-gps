import { bookNumber } from "./books";
import { Citation } from "./citation";

export class Card implements Citation {
    private constructor(
      public fragment: string,
      public book: string,
      public chapter: number,
      public firstVerse: number,
      public suffix: string,
      public tags: string[],
      public entire: string,
      public active: boolean,
      public score: number
    ) { }
  
    public bookNumber: number = bookNumber(this.book);
    public fullCitation: string = `${this.book} ${this.chapter}:${this.firstVerse}${this.suffix}`;
  
    public static of(citation: Citation): Card {
      return new Card(
        citation.fragment,
        citation.book,
        citation.chapter,
        citation.firstVerse,
        citation.suffix,
        citation.tags,
        citation.entire,
        citation.active,
        0
      );
    }
  }
  