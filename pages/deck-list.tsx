import { Card } from "@/models/card";
import { Citation } from "@/models/citation";
import { Deck } from "@/models/deck";
import { trpc } from "@/utilities/trpc";
import { useEffect, useState } from "react";

type OrderedCitations = {
  book: string;
  card: Card[];
}[];

const DeckListView = () => {
  // TODO: Is this the ideal pattern?  Should data be in a store?
  const { data, isLoading } = trpc.loadAllProcedure.useQuery({});
  const [deck, setDeck] = useState<Deck>(Deck.of([]));
  const orderedCards = deck.orderedCards();
  
  useEffect(() => {
    // TODO TRPC bug
    const resolvedData: Citation[] = data?.map((citation) => {
      const lastReviewed = citation.lastReviewed ?
      new Date(citation.lastReviewed) : undefined;
      return {
        ...citation,
        lastReviewed
      };
    }) ?? [];
    setDeck(Deck.of(resolvedData));
  }, [data]);
  
  if (isLoading) {
    return <div></div>;
  }
  
  if (!data) {
    return <div>User has no data</div>;
  }
  
  return (
    <div>
    <h1>Deck List View</h1>
    <ul>
    {orderedCards.map((cardsByBook) => (
      <li key={cardsByBook.book}>
      <h2>{cardsByBook.book}</h2>
      <ul>
      {cardsByBook.cards.map((card) => (
        <li key={card.id}>
        <h3>{card.fullCitation}</h3>
        </li>
        ))}
        </ul>
        </li>
        ))}
        </ul>
        </div>
        )
      }
      
      export default trpc.withTRPC(DeckListView);