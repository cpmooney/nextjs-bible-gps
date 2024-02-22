"use client";
import {useDrawDeckActions} from "src/store/draw-deck-actions";
import {useCardStateContext} from "./card-state-provider";

export default function ResponseButtons() {
  const {
    advanceToNextCard,
    decrementCurrentCardScore,
    incrementCurrentCardScore,
  } = useDrawDeckActions();
  const {showingAnswer, hideAnswer} = useCardStateContext();

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
        className="flex-1 bg-primary h-20 text-xl text-white font-bold uppercase mr-4"
        onClick={correct}
        disabled={!showingAnswer()}
      >
        Correct
      </button>
      <button
        className="flex-1 bg-primary h-20 text-xl text-white font-bold uppercase"
        onClick={wrong}
        disabled={!showingAnswer()}
      >
        Incorrect
      </button>
    </div>
  );
}
