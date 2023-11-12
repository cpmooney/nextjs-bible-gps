import {Card} from "../models/card";

interface CardContentComponentProps {
  card: Card,
  totalNumber: number,
  changedNumber: number
}

export default function CardStatComponent(props: CardContentComponentProps) {
  const { card, totalNumber, changedNumber } = props;
  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-4">
      <div className="card-body">
          <div className="justify-end">
            Score: {card.score}
          </div>
          <div className="justify-end">
            ID: {card.id}
          </div>
          <div className="justify-end">
            Total number: {totalNumber}
          </div>
          <div className="justify-end">
            Changed: {changedNumber}
          </div>
      </div>
    </div>
  );
}
