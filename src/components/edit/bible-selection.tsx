import { bibleBooks } from "src/models/books";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface BibleSelectionProps {
  setBook: Dispatch<SetStateAction<string>>;
}

export const BibleSelection = ({ setBook: setBibleBook }: BibleSelectionProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBibleBook(event.target.value);
  };
  const options = bibleBooks.map((book, index) => {
    return <option key={index}>{book}</option>;
  });
  return <select className="select select-bordered w-32" onChange={handleChange}>{options}</select>;
};
