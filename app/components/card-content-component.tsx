"use client";
import {buildFullCitation} from "@/utilities/additional-citation-methods";
import CardAnswerComponent from "./card-answer-component";
import {useDeckStateContext} from "./providers/deck-state-provider";
import { useEffect, useState } from "react";
import { Citation } from "@/models/citation";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({
  showingAnswer,
  showAnswer,
}: CardContentComponentProps) {
  const { obtainCurrentCard } = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);
  
  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard])

  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const fragment = currentCard?.fragment ?? "/";
  const score = currentCard?.score ?? '';

  const fragmentPieces = fragment.split("/");

  return (
    <>
      <h2 className="text-center text-2xl h-16 mb-2">
          {fragmentPieces[0]}
          <br />
          {fragmentPieces[1]}
      </h2>
      <button
        className="btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 h-40 text-xl"
        onClick={showAnswer}
        disabled={showingAnswer}
      >
        <CardAnswerComponent
          answer={fullCitation}
          showingAnswer={showingAnswer}
        />
      </button>
      <div className="absolute right-0 bottom-0 p-2 text-xl">
        {score}
      </div>
    </>
  );
}
