"use client";

import { Citation } from "@/models/citation";
import CitationDisplay from "./citation";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  book: string;
  citations: Citation[];
  active: boolean;
}

export const Book = ({ book, citations, active }: Props) => {
  const router = useRouter();
  const newCard = () => {
    router.push(`/edit/0?book=${book}`);
  };
  return (
    <div className="collapse bg-base-200 mb-2">
      <input type="radio" name="book-accordian" defaultChecked={active} />
      <div className="collapse-title text-xl font-medium">{book}</div>
      <div className="collapse-content">
        <button
          className="btn btn-btnPrimary h-5 w-32 ml-2 mt-2 bg-blue-400"
          onClick={newCard}
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
        {citations.map((citation) => (
          <CitationDisplay key={citation.id} citation={citation} />
        ))}
      </div>
    </div>
  );
};
