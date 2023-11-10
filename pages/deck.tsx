"use client";
import {Deck} from "@/models/deck";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {ArrowDownOnSquareStackIcon} from "@heroicons/react/24/outline";
import {DeckComponent} from "app/deck-component";
import {trpc} from "../utilities/trpc";

const DeckPage = () => {
  const {data} = trpc.loadAllProcedure.useQuery({});
  if (!data) {
    return <div>Loading...</div>;
  }
  const deck: Deck = Deck.of(data);

  const sync = () => {
    const changedCards = deck.getChangedCards();
    alert(
      JSON.stringify(
        changedCards.map((card) => card.fragment + " [" + card.score + "]")
      )
    );
    deck.resetChanged();
  };

  return (
    <div>
      <UserButton />
      <button className="btn btn-btnPrimary" onClick={sync}>
        <ArrowDownOnSquareStackIcon className="w-8 h-8 mr-2" />
      </button>
      <DeckComponent deck={deck} />
    </div>
  );
};

const Home = () => (
  <ClerkProvider>
    <DeckPage />
  </ClerkProvider>
);

export default trpc.withTRPC(Home);
