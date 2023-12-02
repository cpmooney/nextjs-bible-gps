import { Citation } from "@/models/citation";
import {
  CheckCircleIcon,
  NoSymbolIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDeckContext } from "./deck-context";
import { buildExternalUrl, buildFullCitation } from "@/utilities/additional-citation-methods";

export default function CardComponent() {
  const deckContext = useDeckContext();
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [currentCard, setCurrentCard] = useState<Citation>(deckContext.obtainCurrentCard()); // [1

  const advanceToNextCard = () => {
    setCurrentCard(deckContext.nextCard());
  };
  
  const toggleShowAnswer = () => {
    setShowingAnswer(!showingAnswer);
  };
  
  const correct = () => {
    setShowingAnswer(false);
    deckContext.incrementCardScore();
    advanceToNextCard();
  };
  
  const wrong = () => {
    setShowingAnswer(false);
    deckContext.resetCardScore();
    advanceToNextCard();
  };

  const fullCitation = buildFullCitation(currentCard);

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
          {currentCard.score}
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

const CardContentComponent = (props: { answer: string, showingAnswer: boolean}) => {
  if (props.showingAnswer) {
    return props.answer;
  }

  return <QuestionMarkCircleIcon className="h-16 w-16 mr-2" />;
};
