import {Card} from "../models/card";

interface ScoreChangeRequestComponentProps {
  changedScoreRequest: Record<number, number>;
}

const SingleScoreChangeEntry = (props: {cardId: number, score: number}) => {
  const { cardId, score } = props;
  return (<div className="pr-3">
    <div>{cardId}</div>
    <div>{score}</div>
  </div>
  );
}

const ScoreChangeRequestComponent = (props: ScoreChangeRequestComponentProps) => {
  const { changedScoreRequest } = props;
  return (<div className="flex flex-row max-w-full overflow-x-auto">
    {Object.entries(changedScoreRequest).map(([id, score]) => (
      <SingleScoreChangeEntry key={id} cardId={parseInt(id)} score={score} />
    ))}
    </div>);
};

interface CardContentComponentProps {
  card: Card,
  totalNumber: number,
  changedNumber: number,
  changedScoreRequest: Record<number, number>
}

export default function CardStatComponent(props: CardContentComponentProps) {
  const { card, totalNumber, changedNumber, changedScoreRequest } = props;
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
          <div className="justify-end">
          <ScoreChangeRequestComponent changedScoreRequest={changedScoreRequest} />
          </div>
      </div>
    </div>
  );
}
