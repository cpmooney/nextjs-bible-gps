"use client";
import {Citation} from "@/models/citation";
import {Deck} from "@/models/deck";
import {DeckComponent} from "app/deck-component";
import {trpc} from "../utilities/trpc";

const Home = () => {
  const {data} = trpc.dbLoadAllProcedure.useQuery({});
  if (!data) {
    return <div>Loading...</div>;
  }
  const rows: Citation[] = data.rows as Citation[];
  const deck: Deck = Deck.of(rows);
  return (
    <div>
      <DeckComponent deck={deck} />
    </div>
  );
};

export default trpc.withTRPC(Home);
