"use client";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { useCardStateContext } from "./card-state-provider";

export default function ResponseButtons() {
  const deckStateContext = useDeckStateContext();
  const { showingAnswer, hideAnswer } = useCardStateContext()

  const advanceToNextCard = () => {
    deckStateContext.drawCitation();
  };

  const correct = () => {
    hideAnswer();
    deckStateContext.incrementCurrentCardScore();
    advanceToNextCard();
  };

  const wrong = () => {
    hideAnswer();
    deckStateContext.decrementCurrentCardScore();
    advanceToNextCard();
  };
  return (
    <div className="w-full flex">
      <button
        className="flex-1 enabled:bg-green-400 h-20 disabled:bg-gray-200 disabled:text-gray-400 text-xl font-bold uppercase mr-4"
        onClick={correct}
        disabled={!showingAnswer()}
      >
        Correct
      </button>
      <button
        className="flex-1 enabled:bg-red-400 h-20 disabled:bg-gray-200 disabled:text-gray-400 text-xl font-bold uppercase"
        onClick={wrong}
        disabled={!showingAnswer()}
      >
        Incorrect
      </button>
    </div>
  );
}
