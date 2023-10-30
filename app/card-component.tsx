import { Card } from '../models/card';

export default function CardComponent(card: Card) {
  return (
    <>
      <div>{card.fullCitation}</div>
    </>
  );
}
