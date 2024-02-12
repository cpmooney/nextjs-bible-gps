"use client";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { useCardStateContext } from "./card-state-provider";

export default function ResponseButtons() {
  const { drawCitation, incrementCurrentCardScore, decrementCurrentCardScore } =
    useDeckStateContext();
  const { showingAnswer, hideAnswer } = useCardStateContext();

  const advanceToNextCard = () => {
    drawCitation();
  };

  const correct = async () => {
    hideAnswer();
    incrementCurrentCardScore();
    advanceToNextCard();
  };

  const wrong = async () => {
    hideAnswer();
    decrementCurrentCardScore();
    advanceToNextCard();
  };

  return (
    <div className="w-full flex">
      <button
        className="flex-1 bg-orange-1 h-20 text-xl text-white font-bold uppercase mr-4"
        onClick={correct}
        disabled={!showingAnswer()}
      >
        Correct
      </button>
      <button
        className="flex-1 bg-orange-1 h-20 text-xl text-white font-bold uppercase"
        onClick={wrong}
        disabled={!showingAnswer()}
      >
        Incorrect
      </button>
    </div>
  );
}
