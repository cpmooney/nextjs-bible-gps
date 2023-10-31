import {Card} from "../models/card";

export default function CardComponent(props: CardComponentProps) {
  const {card} = props;
  return (
    <>
      <div>{card.fullCitation}</div>
    </>
  );
}

interface CardComponentProps {
  card: Card;
}
