"use client";
import {Deck} from "@/models/deck";
import {DeckComponent} from "app/deck-component";
import {trpc} from "../utilities/trpc";
import {UserButton, ClerkProvider} from "@clerk/nextjs";

const DeckPage = () => {
  const {data} = trpc.loadAllProcedure.useQuery({});
  if (!data) {
    return <div>Loading...</div>;
  }
  const deck: Deck = Deck.of(data);
  return (
    <div>
        <DeckComponent deck={deck} />
    </div>
  );
};

const Home = () => 
      <ClerkProvider>
        <UserButton />
        <DeckPage />
      </ClerkProvider>;


export default trpc.withTRPC(Home);
