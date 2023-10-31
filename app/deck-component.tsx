import {Deck} from "@/models/deck";
import CardComponent from "./card-component";

export const DeckComponent = (props: DeckComponentProps) => {
  const {deck} = props;
  return (
    <div>
      {deck.cards.map((card) => (
        <CardComponent card={card} key={card.id} />
      ))}
    </div>
  );
};

interface DeckComponentProps {
  deck: Deck;
}
