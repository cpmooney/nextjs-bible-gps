"use client";

import { Citation } from "@/models/citation";
import CitationDisplay from "./citation";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Label from "app/components/label";

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
    <div className="bg-base-200 mb-2 p-4 shadow-xl">
      <Label title={book} />
      <div>
        <button
          className="h-5 w-full ml-2 mt-2 flex mb-4"
          onClick={newCard}
        >
          <PlusCircleIcon className="w-6 h-6 ml-2 mr-2" />
          Add New From {book}
        </button>
        {citations.map((citation) => (
          <CitationDisplay key={citation.id} citation={citation} />
        ))}
      </div>
      </div>
  );
};
