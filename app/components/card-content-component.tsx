"use client";
import { useEffect, useState } from "react";
import CardAnswerComponent from "./card-answer-component";
import { useDeckStateContext } from "./providers/deck-state-provider";
import { buildFullCitation } from "@/utilities/additional-citation-methods";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({ showingAnswer, showAnswer }: CardContentComponentProps) {
  const deckStateContext = useDeckStateContext();
  const [isClient, setIsClient] = useState(false);

  const currentCard = deckStateContext.obtainCurrentCard();
  const fullCitation = buildFullCitation(currentCard);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <h2 className="text-center text-2xl">{isClient
      ?  currentCard.fragment :
      <div className="skeleton h-8 w-20"></div>
      }</h2>
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
        {isClient ? currentCard.score : ""}
      </div>
    </>
  );
}
