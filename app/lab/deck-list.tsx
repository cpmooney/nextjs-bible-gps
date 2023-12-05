import { Citation } from "@/models/citation";
import { buildFullCitation } from "@/utilities/additional-citation-methods";
import { useDeckContext } from "app/providers/deck-provider";

export const DeckListView = () => {
  const { obtainCardsByBook } = useDeckContext();
  const orderedCards = obtainCardsByBook();

  return (
    <div>
      <h1>Deck List View</h1>
      <ul>
        {orderedCards.map((cardsByBook) => (
          <li key={cardsByBook.book}>
            <h2>{cardsByBook.book}</h2>
            <ul>
              {cardsByBook.cards.map((card) => <SingleCardView key={card.id} card={card} />)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleCardView = (props: { card: Citation }) => {
  const { card } = props;
  const fullCitation = buildFullCitation(card);

  return (
    <li>
      <h3>{fullCitation}</h3>
    </li>);
}
