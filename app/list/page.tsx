"use client";

import {Citation} from "@/models/citation";
import {toKebabCase} from "@/utilities/misc";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Book} from "./components/book";
import { useCardsByBook } from "src/store/actions/cards-by-book-actions";
import { useDeckDataStore } from "src/store/deck-data-store";

export default function CardListPage() {
  const searchParams = useSearchParams();
  const {cards, guaranteedById} = useDeckDataStore();
  const cardsByBook = useCardsByBook();
  const id = searchParams?.get("id");
  const citationToActivate: Citation | undefined = id
    ? guaranteedById(parseInt(id))
    : undefined;
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [activeBook, setActiveBook] = useState<string | undefined>();

  useEffect(() => {
    setNumberOfCards(cards.length);
  }, [cards]);

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
