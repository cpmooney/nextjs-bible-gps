"use client";
import { OrderedCardsByBook, useCardsByBook } from "src/store/actions/cards-by-book-actions";
import {Modal, closeModal} from "./modal";
import { useFilterStateStore } from "src/store/filter-state-store";

export const EditFilter = () => {
  const { filter, setFilter } = useFilterStateStore();
  const cardsByBook = useCardsByBook();

  const initialFilteredBook = filter.kind;

  const declareFilterAndClose = (chosenBook: string) => () => {
    setFilter({kind: "book", value: resolveBook(chosenBook)});
    closeModal("edit_filter");
  };

  return Modal({
    name: "edit_filter",
    contents: (
      <div>
        <div className="modal-box">
          Sometimes when a book has a lot of citations in it, it is best to
          focus on memorizing just within that book. Below are the books with
          the most cards. Choose one to focus on that particular book.
          <br />
          Current Filter: {initialFilteredBook}
        </div>
        <button
          className=" mr-2 mt-2 mb-2"
          onClick={declareFilterAndClose("none")}
        >
          None
        </button>
        {mostLoadedBooks(cardsByBook).map((loadedBook: LoadedBook) => {
          return (
            <button
              key={loadedBook.book}
              className=" mr-2 mt-2 mb-2"
              onClick={declareFilterAndClose(loadedBook.book)}
            >
              {loadedBook.book} ({loadedBook.length})
            </button>
          );
        })}
      </div>
    ),
  });
};

const resolveBook = (book: string | undefined) => {
  if (book) {
    return book;
  }
  return "none";
};

const unresolvedBook = (book: string) => {
  if (book == "none") {
    return undefined;
  }
  return book;
};

interface LoadedBook {
  book: string;
  length?: number;
}

const mostLoadedBooks = (cardsByBook: OrderedCardsByBook): LoadedBook[] => {
  return cardsByBook
    .sort((a, b) => {
      return b.cards.length - a.cards.length;
    })
    .filter((book: any) => book.cards.length > 5)
    .map((book: any) => {
      return {book: book.book, length: book.cards.length};
    });
};
