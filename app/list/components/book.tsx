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
  activateBook: (book: string) => void;
}

export const Book = ({ book, citations, active, activateBook }: Props) => {
  const router = useRouter();
  const newCard = () => {
    router.push(`/edit/0?book=${book}`);
  };
  const numberOfCards = citations.length;
  return (
    <div id={book} className="bg-white m-4 p-4 shadow-xl" onClick={() => activateBook(book)}>
      <div className="flex max-w-2xl text-2xl justify-between">
        <div className="pr-2"><Label title={book} /></div>
        <div className="flex-auto" />
        <div className="pl-2">{numberOfCards} citations</div>
      </div>
      <div className={`pt-4 ${active ? null : 'hidden' }`}>
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
