"use client";
import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDeckStateContext } from "./providers/deck-state-provider";
import CardContentComponent from "./card-content-component";

export default function CardComponent() {
  const deckStateContext = useDeckStateContext();
  const [showingAnswer, setShowingAnswer] = useState(false);

  const advanceToNextCard = () => {
    deckStateContext.drawCitation();
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

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <CardContentComponent
          showingAnswer={showingAnswer}
          showAnswer={() => setShowingAnswer(true)}
        />
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
