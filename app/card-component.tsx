import {Card} from "../models/card";

export default function CardComponent(props: CardComponentProps) {
  const {showAnswer, card} = props;
  const answer = showAnswer ? card.fullCitation : "";
  return (
    <>
      <div>{card.fragment}</div>
      <div>{answer}</div>
    </>
  );
}

interface CardComponentProps {
  card: Card;
  showAnswer: boolean;
}
