import { bibleBooks } from "src/models/books";
import { Citation } from "src/models/citation";

export type OrderedCardsByBook = { book: string, cards: Citation[] }[];

export const buildCardsByBook = (cards: Citation[]): OrderedCardsByBook => {
    const cardsByBook: CardsByBook = {};

    cards.forEach((card) => {
        if (!cardsByBook[card.book]) {
            cardsByBook[card.book] = [];
        }
        insertCardInOrder(cardsByBook[card.book], card);
    });

    const orderedPresentBooks = bibleBooks.filter(
      (book) => cardsByBook[book]
    );

    return orderedPresentBooks.map((book) => {
      return {book, cards: cardsByBook[book]};
    });
}

type CardsByBook = Record<string, Citation[]>;

const insertCardInOrder = (cards: Citation[], card: Citation): void => {
    const index = cards.findIndex((c) => compareCards(card, c));
    if (index === -1) {
      cards.push(card);
    } else {
      cards.splice(index, 0, card);
    }
  }

const compareCards = (card1: Citation, card2: Citation): number => 
    card2.chapter - card1.chapter;
