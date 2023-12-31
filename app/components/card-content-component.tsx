"use client";
import CardAnswerComponent from "./card-answer-component";
import { useDeckStateContext } from "./providers/deck-state-provider";
import { buildFullCitation } from "@/utilities/additional-citation-methods";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({ showingAnswer, showAnswer }: CardContentComponentProps) {
  const deckStateContext = useDeckStateContext();

  const currentCard = deckStateContext.obtainCurrentCard();
  const fullCitation = buildFullCitation(currentCard);

  return (
    <>
      <h2 className="text-center text-2xl">{currentCard.fragment}</h2>
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
        {currentCard.score}
      </div>
    </>
  );
}
