"use client"
import {
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { buildFullCitation } from "src/utilities/additional-citation-methods";
import { useDeckStateContext } from "./providers/deck-state-provider";
import dynamic from "next/dynamic";

export default function CardComponent() {
  const deckStateContext = useDeckStateContext();
  const [showingAnswer, setShowingAnswer] = useState(false);

  const currentCard = deckStateContext.obtainCurrentCard();
  const currentCardGroup = deckStateContext.obtainCurrentCardGroup();

  const advanceToNextCard = () => {
    deckStateContext.drawCitation();
  };
  
  const toggleShowAnswer = () => {
    setShowingAnswer(!showingAnswer);
  };
  
  const correct = () => {
    setShowingAnswer(false);
    deckStateContext.incrementCurrentCardScore();
    advanceToNextCard();
  };
  
  const wrong = () => {
    setShowingAnswer(false);
    deckStateContext.decrementCurrentCardScore();
    advanceToNextCard();
  };

  const fullCitation = buildFullCitation(currentCard);

  const CardContentComponent = dynamic(() => import('./card-content-component'), { ssr: false });

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-center text-2xl">{currentCard.fragment}</h2>
        <button
          className="btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 h-40 text-xl"
          onClick={toggleShowAnswer}
          disabled={showingAnswer}
        >
          <CardContentComponent
            answer={fullCitation}
            showingAnswer={showingAnswer}
          />
        </button>
        <div className="absolute right-0 bottom-0 p-2 text-xl">
           {currentCard.score} / {currentCardGroup}
        </div>
        <div className="card-actions">
          <button
            className="flex-1 btn btn-btnPrimary enabled:bg-green-400 h-20"
            onClick={correct}
            disabled={!showingAnswer}
          >
            <CheckCircleIcon className="h-10 w-10 mr-2" />
          </button>
          <button
            className="flex-1 btn btn-btnPrimary enabled:bg-red-400 h-20"
            onClick={wrong}
            disabled={!showingAnswer}
          >
            <NoSymbolIcon className="h-10 w-10 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
