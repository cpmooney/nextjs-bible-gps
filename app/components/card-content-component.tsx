import { useState } from "react";
import CardAnswerComponent from "./card-answer-component";
import { useDeckStateContext } from "./providers/deck-state-provider";
import { buildFullCitation } from "@/utilities/additional-citation-methods";

export default async function CardContentComponent() {
  const deckStateContext = useDeckStateContext();
  const [showingAnswer, setShowingAnswer] = useState(false);

  const currentCard = deckStateContext.obtainCurrentCard();
  const fullCitation = buildFullCitation(currentCard);

  const toggleShowAnswer = () => {
    setShowingAnswer(!showingAnswer);
  };

  return (
    <>
      <h2 className="text-center text-2xl">{currentCard.fragment}</h2>
      <button
        className="btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 h-40 text-xl"
        onClick={toggleShowAnswer}
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
