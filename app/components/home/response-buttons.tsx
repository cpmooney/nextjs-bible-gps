"use client";
import {useDeckStore} from "src/store/deck-store";
import {useCardStateContext} from "./card-state-provider";

export default function ResponseButtons() {
  const deckStore = useDeckStore();
  const {showingAnswer, hideAnswer} = useCardStateContext();

  const correct = async () => {
    hideAnswer();
    deckStore.actions.incrementCurrentCardScore();
    deckStore.actions.advanceToNextCard();
  };

  const wrong = async () => {
    hideAnswer();
    deckStore.actions.decrementCurrentCardScore();
    deckStore.actions.advanceToNextCard();
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
