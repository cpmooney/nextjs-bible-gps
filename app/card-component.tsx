import { CheckCircleIcon, EyeIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import {Card} from "../models/card";

interface ButtonBarComponentProps {
  showAnswer: boolean;
  cardComponentProps: CardComponentProps;
}

const ButtonBarComponent = (props: ButtonBarComponentProps) => {
  const {showAnswer, cardComponentProps} = props;

  if (!showAnswer) {
    return (<div>
      <button className="btn btn-btnPrimary" onClick={cardComponentProps.toggleShowAnswer}>
        <EyeIcon className="h-5 w-5 mr-2" />
        Show Answer
        </button>
    </div>);
  }
  return (
    <div>
      <button className="btn btn-btnPrimary" onClick={cardComponentProps.correct}>
        <CheckCircleIcon className="h-5 w-5 mr-2" />
        Correct
        </button>
      <button className="btn btn-btnPrimary" onClick={cardComponentProps.wrong}>
        <NoSymbolIcon className="h-5 w-5 mr-2" />
        Wrong
        </button>
    </div>
  );
};

export default function CardComponent(props: CardComponentProps) {
  const {showAnswer, card} = props;
  const answer = showAnswer ? card.fullCitation : "";
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{card.fragment}</h2>
    <p>{card.fullCitation}</p>
    <div className="card-actions">
      <ButtonBarComponent
        showAnswer={showAnswer}
        cardComponentProps={props}
        />
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
