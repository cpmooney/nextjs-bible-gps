"use client";

import {Citation} from "@/models/citation";
import CitationDisplay from "./citation";

interface Props {
  book: string;
  citations: Citation[];
}

export const Book = ({book, citations}: Props) => {
  return (
    <div className="collapse bg-base-200 mb-2">
      <input type="radio" name="book-accordian" />
      <div className="collapse-title text-xl font-medium">{book}</div>
      <div className="collapse-content">
        {citations.map((citation) => (
          <CitationDisplay key={citation.id} citation={citation} />
        ))}
      </div>
    </div>
  );
};
