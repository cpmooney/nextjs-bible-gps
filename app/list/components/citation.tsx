"use client";

import {Citation} from "@/models/citation";
import {PencilIcon} from "@heroicons/react/24/outline";
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

  const citationForDisplay = `${citation.chapter}:${citation.firstVerse}${citation.suffix}`;
  const gotoVerse = () => {
    setCurrentCard(citation);
    router.push('/');
  }

  const firstFiveWords = citation.entire.split(' ').slice(0, 5).join(' ');

  return (
    <div className="flex">
      <button className="text-left h-5 w-24 m-4" onClick={gotoVerse}>
        <ClientOnly>{citationForDisplay}</ClientOnly>
      </button>
      <div className="text-left flex-auto h-5 mt-4 overflow-hidden whitespace-nowrap">
        <ClientOnly>{firstFiveWords} . . .</ClientOnly>
      </div>
      <button
        className="h-8 ml-2 mt-4 w-8 shrink-0"
        onClick={editCard}
      >
        <PencilIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
