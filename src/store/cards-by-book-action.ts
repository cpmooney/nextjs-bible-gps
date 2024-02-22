import {bibleBooks} from "@/models/books";
import {Citation} from "@/models/citation";
import {useDeckDataStore} from "./deck-data-store";

export type OrderedCardsByBook = {book: string; cards: Citation[]}[];

export const useCardsByBook = (): OrderedCardsByBook => {
  const {cards} = useDeckDataStore();
  const cardsByBook: CardsByBook = {};

  cards.forEach((card) => {
    if (!cardsByBook[card.book]) {
      cardsByBook[card.book] = [];
    }
    cardsByBook[card.book].push(card);
  });

  Object.keys(cardsByBook).forEach((book) => {
    cardsByBook[book].sort(compareCards);
  });

  const orderedPresentBooks = bibleBooks.filter((book) => cardsByBook[book]);

  return orderedPresentBooks.map((book) => {
    return {book, cards: cardsByBook[book]};
  });
};

type CardsByBook = Record<string, Citation[]>;

const compareCards = (card1: Citation, card2: Citation): number => {
  if (card2.chapter === card1.chapter) {
    return card1.firstVerse - card2.firstVerse;
  } else {
    return card1.chapter - card2.chapter;
  }
};
