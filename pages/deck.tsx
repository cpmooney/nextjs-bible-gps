"use client";
import {Deck} from "@/models/deck";
import {DeckComponent} from "app/deck-component";
import {trpc} from "../utilities/trpc";
import {UserButton, ClerkProvider} from "@clerk/nextjs";

const Home = () => {
  const {data} = trpc.loadAllProcedure.useQuery({});
  if (!data) {
    return <div>Loading...</div>;
  }
  const deck: Deck = Deck.of(data);
  return (
    <div>
      <ClerkProvider>
        <UserButton />
        <DeckComponent deck={deck} />
      </ClerkProvider>
    </div>
  );
};

export default trpc.withTRPC(Home);
