"use client";
import {buildFullCitation} from "@/utilities/additional-citation-methods";
import CardAnswerComponent from "./card-answer-component";
import ClientOnly from "./hydration-support/client-only";
import ServerOnly from "./hydration-support/server-only";
import {useDeckStateContext} from "./providers/deck-state-provider";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({
  showingAnswer,
  showAnswer,
}: CardContentComponentProps) {
  const deckStateContext = useDeckStateContext();

  const currentCard = deckStateContext.obtainCurrentCard();
  const fullCitation = buildFullCitation(currentCard);

  return (
    <>
      <h2 className="text-center text-2xl h-16 mb-2">
        <ClientOnly>{currentCard.fragment}</ClientOnly>
        <ServerOnly>
          <div className="skeleton h-8 w-20"></div>
        </ServerOnly>
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
        <ClientOnly>{currentCard.score}</ClientOnly>
      </div>
    </>
  );
}
