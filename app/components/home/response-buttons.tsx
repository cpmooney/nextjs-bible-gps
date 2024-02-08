"use client";
import { useState } from "react";
import { useDeckStateContext } from "../providers/deck-state-provider";

export default function ResponseButtons() {
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
    <>
      <button
        className="flex-1 btn btn-btnPrimary enabled:bg-green-400 h-20"
        onClick={correct}
        disabled={!showingAnswer}
      >
        <label className="label font-bold">CORRECT</label>
      </button>
      <button
        className="flex-1 btn btn-btnPrimary enabled:bg-red-400 h-20"
        onClick={wrong}
        disabled={!showingAnswer}
      >
        <label className="label font-bold">INCORRECT</label>
      </button>
    </>
  );
}
