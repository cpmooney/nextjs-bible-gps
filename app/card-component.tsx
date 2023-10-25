import {
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../models/card";

export default function CardComponent(props: CardComponentProps) {
  const { showingAnswer, card } = props;
  const answer = showingAnswer ? card.fullCitation : "Citation";
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{card.fragment}</h2>
        <button
          className="btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 h-40 text-xl"
          onClick={props.toggleShowAnswer}
          disabled={showingAnswer}>
          {answer}
        </button>
        <div className="card-actions">
          <button
            className="flex-1 btn btn-btnPrimary enabled:bg-green-400 h-20"
            onClick={props.correct}
            disabled={!showingAnswer}>
            <CheckCircleIcon className="h-10 w-10 mr-2" />
          </button>
          <button
            className="flex-1 btn btn-btnPrimary enabled:bg-red-400 h-20"
            onClick={props.wrong}
            disabled={!showingAnswer}>
            <NoSymbolIcon className="h-10 w-10 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface CardComponentProps {
  card: Card;
  showingAnswer: boolean;
  toggleShowAnswer: () => void;
  correct: () => void;
  wrong: () => void;
}
