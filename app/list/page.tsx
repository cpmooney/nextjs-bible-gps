"use client";

import { Citation } from "@/models/citation";
import { OrderedCardsByBook } from "@/utilities/card-by-book-builder";
import { toKebabCase } from "@/utilities/misc";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";
import { useSearchParams } from "next/navigation";
import { Book } from "./components/book";
import { useEffect, useState } from "react";

export default function CardListPage() {
  const searchParams = useSearchParams();
  const { obtainCardsByBook, obtainCardById, obtainAllCitations } =
    useDeckStateContext();
  const id = searchParams?.get("id");
  const citationToActivate: Citation | undefined = id
    ? obtainCardById(parseInt(id))
    : undefined;
  const [numberOfCards, setNumberOfCards] = useState(0);

  useEffect(() => {
    setNumberOfCards(obtainAllCitations().length);
  }, [obtainAllCitations]);

  const cardsByBook: OrderedCardsByBook = obtainCardsByBook();
  return (
    <div>
      <div className="card bg-base-100 shadow-xl mr-4 mt-4 flex-1">
        <div className="card-body">
          <div className="justify-center text-2xl">
            # of cards: {numberOfCards}
          </div>
        </div>
      </div>
      <div>
        {cardsByBook.map(({ book, cards }) => {
          return (
            <Book
              key={toKebabCase(book)}
              book={book}
              citations={cards}
              active={book == citationToActivate?.book}
            />
          );
        })}
      </div>
    </div>
  );
}
