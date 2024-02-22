"use client";

import {Citation} from "@/models/citation";
import {toKebabCase} from "@/utilities/misc";
import {useDeckStateContext} from "app/components/providers/deck-state-provider";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {OrderedCardsByBook} from "src/store/cards-by-book-action";
import {Book} from "./components/book";

export default function CardListPage() {
  const searchParams = useSearchParams();
  const {obtainCardsByBook, obtainCardById, obtainAllCitations} =
    useDeckStateContext();
  const id = searchParams?.get("id");
  const citationToActivate: Citation | undefined = id
    ? obtainCardById(parseInt(id))
    : undefined;
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [activeBook, setActiveBook] = useState<string | undefined>();

  useEffect(() => {
    setNumberOfCards(obtainAllCitations().length);
  }, [obtainAllCitations]);

  const cardsByBook: OrderedCardsByBook = obtainCardsByBook();

  const bookIsActive = useCallback(
    (book: string) => {
      return book == citationToActivate?.book || book == activeBook;
    },
    [citationToActivate, activeBook]
  );

  useEffect(() => {
    if (activeBook) {
      const activeBookDiv = document.getElementById(activeBook);
      if (activeBookDiv) {
        activeBookDiv.scrollIntoView({behavior: "smooth"});
      }
    }
  }, [activeBook]);

  return (
    <div>
      <div className="bg-light-primary p-4 text-2xl">
        You have {numberOfCards} citations
      </div>
      <div>
        {cardsByBook.map(({book, cards}) => {
          return (
            <Book
              key={toKebabCase(book)}
              book={book}
              citations={cards}
              active={bookIsActive(book)}
              activateBook={setActiveBook}
            />
          );
        })}
      </div>
    </div>
  );
}
