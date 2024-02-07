"use client";
import {useState} from "react";
import CardContentComponent from "./card-content-component";
import {useDeckStateContext} from "./providers/deck-state-provider";

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
    <>
      <div className="card w-96 bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <label className="label font-bold">TEXT</label>
          <CardContentComponent
            showingAnswer={showingAnswer}
            showAnswer={() => setShowingAnswer(true)}
          />
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <label className="label font-bold">GRADE YOURSELF</label>
          <div className="card-actions">
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
          </div>
        </div>
      </div>
    </>
  );
}
