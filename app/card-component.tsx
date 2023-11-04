import {
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../models/card";

export default function CardComponent(props: CardComponentProps) {
  const { showAnswer, card } = props;
  const answer = showAnswer ? card.fullCitation : "?";
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{card.fragment}</h2>
        <button className="btn btn-btnPrimary" onClick={props.toggleShowAnswer}>
          {answer}
        </button>
        <div className="card-actions">
          <button className="btn btn-btnPrimary" onClick={props.correct}>
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Correct
          </button>
          <button className="btn btn-btnPrimary" onClick={props.wrong}>
            <NoSymbolIcon className="h-5 w-5 mr-2" />
            Wrong
          </button>
        </div>
      </div>
    </div>
  );
}

interface CardComponentProps {
  card: Card;
  showAnswer: boolean;
  toggleShowAnswer: () => void;
  correct: () => void;
  wrong: () => void;
}
