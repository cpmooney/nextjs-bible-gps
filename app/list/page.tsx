"use client";

import { useDeckStateContext } from "app/components/providers/deck-state-provider";
import { Book } from "./components/book";
import { toKebabCase } from "@/utilities/misc";
import { OrderedCardsByBook } from "@/utilities/card-by-book-builder";

export default function CardListPage() {
  const { obtainCardsByBook } = useDeckStateContext();

  const cardsByBook: OrderedCardsByBook = obtainCardsByBook();
  return cardsByBook.map(({ book, cards }) => {
    return <Book
        key={toKebabCase(book)}
        book={book}
        citations={cards} />;
  });
}
