"use client";

import {Citation} from "@/models/citation";
import {NoSymbolIcon, PencilIcon} from "@heroicons/react/24/outline";
import {deleteCard} from "app/actions";
import ClientOnly from "app/components/hydration-support/client-only";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";
import {useRouter} from "next/navigation";

interface Props {
  citation: Citation;
}

export default function CitationDisplay({citation}: Props) {
  const { setCurrentCard } = useDeckStateContext();
  const router = useRouter();
  const editCard = () => {
    router.push(`/edit/${citation.id}`);
  };
  const deleteThisCard = () => {
    if (!citation.id) {
      throw new Error("citation.id is undefined");
    }
    deleteCard(citation.id);
  };
  const citationForDisplay = `${citation.chapter}:${citation.firstVerse}${citation.suffix}`;
  const gotoVerse = () => {
    setCurrentCard(citation);
    router.push('/');
  }

  return (
    <div className="flex">
      <button className="btn btn-btnPrimary h-5 w-20 ml-2 mt-2 bg-blue-400" onClick={gotoVerse}>
        <ClientOnly>{citationForDisplay}</ClientOnly>
      </button>
      <div className="flex-auto h-5 ml-2 mt-2">
        <ClientOnly>{citation.fragment}</ClientOnly>
      </div>
      <div className="h-5 ml-2 mt-2">
        id: <ClientOnly>{citation.id}</ClientOnly>
      </div>
      <div className="h-5 ml-2 mt-2">
        score: <ClientOnly>{citation.score}</ClientOnly>
      </div>
      <button
        className="h-8 btn btn-btnPrimary bg-green-400 ml-2 mt-2"
        onClick={editCard}
      >
        <PencilIcon className="h-5 w-5" />
      </button>
      <button
        className="h-8 btn btn-btnPrimary bg-red-400 ml-2 mt-2"
        onClick={deleteThisCard}
      >
        <NoSymbolIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
