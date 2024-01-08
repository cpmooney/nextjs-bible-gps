"use client";

import {OrderedCardsByBook} from "@/utilities/card-by-book-builder";
import {toKebabCase} from "@/utilities/misc";
import {useDeckStateContext} from "app/components/providers/deck-state-provider";
import {useSearchParams} from "next/navigation";
import {Book} from "./components/book";
import { Citation } from "@/models/citation";

export default function CardListPage() {
  const searchParams = useSearchParams();
  const {obtainCardsByBook, obtainCardById} = useDeckStateContext();
  const id = searchParams?.get("id");
  const citationToActivate: Citation | undefined = id ?
    obtainCardById(parseInt(id)) : undefined;

  const cardsByBook: OrderedCardsByBook = obtainCardsByBook();
  return cardsByBook.map(({book, cards}) => {
    return (
      <Book key={toKebabCase(book)} book={book} citations={cards} active={book == citationToActivate?.book} />
    );
  });
}
