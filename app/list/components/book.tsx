"use client";

import {Citation} from "@/models/citation";
import CitationDisplay from "./citation";

interface Props {
  book: string;
  citations: Citation[];
  active: boolean;
}

export const Book = ({book, citations, active}: Props) => {
  return (
    <div className="collapse bg-base-200 mb-2">
      <input type="radio" name="book-accordian" defaultChecked={active}/>
      <div className="collapse-title text-xl font-medium">{book}</div>
      <div className="collapse-content">
        {citations.map((citation) => (
          <CitationDisplay key={citation.id} citation={citation} />
        ))}
      </div>
    </div>
  );
};
