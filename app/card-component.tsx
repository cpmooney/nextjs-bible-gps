import {Card} from "../models/card";

export default function CardComponent(props: CardComponentProps) {
  const {showAnswer, card} = props;
  const answer = showAnswer ? card.fullCitation : "";
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{card.fragment}</h2>
    <p>{card.fullCitation}</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  );
}

interface CardComponentProps {
  card: Card;
  showAnswer: boolean;
}
