"use client";
import { Citation } from "@/models/citation";
import { buildFullCitation } from "@/utilities/additional-citation-methods";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CardAnswerComponent from "./card-answer-component";
import { useDeckStateContext } from "./providers/deck-state-provider";
import { currentTagListComponent } from "./edit/tag-selection-on-form";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({
  showingAnswer,
  showAnswer,
}: CardContentComponentProps) {
  const router = useRouter();
  const getStarted = () => {
    router.push("/getting-started");
  };

  const { obtainCurrentCard, userHasNoCards } = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard]);

  const fragmentTextSize = useMemo(() => {
    const fragmentLength = currentCard?.fragment?.length  ?? 0;
    if (fragmentLength <= 53) {
      return "text-2xl";
    }
    return "text-xl";
  }, [currentCard]);

  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const fragment = currentCard?.fragment ?? "/";
  const score = currentCard?.score ?? "";
  const tags = currentCard?.tags ?? [];

  let fragmentPieces = fragment.split("/");
  if (userHasNoCards()) {
    fragmentPieces = ["Click to start", "your journey!"];
  }

  const bigButtonClickHandler = userHasNoCards() ? getStarted : showAnswer;

  return (
    <>
      <h2 className={`text-center ${fragmentTextSize} h-16 mb-2`}>
        {fragmentPieces[0]}
        <br />
        {fragmentPieces[1]}
      </h2>
      <button
        className="btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 h-40 text-xl"
        onClick={bigButtonClickHandler}
        disabled={showingAnswer}
      >
        {userHasNoCards() ? (
          <PlusCircleIcon className="w-12 h-12" />
        ) : (
          <CardAnswerComponent
            answer={fullCitation}
            showingAnswer={showingAnswer}
          />
        )}
      </button>
      <div className="absolute right-0 bottom-0 p-2 text-xl">{score}</div>
      <div className="absolute left-0 bottom-0 p-2 text-xl">{currentTagListComponent(tags)}</div>
    </>
  );
}
