"use client";
import {Deck} from "@/models/deck";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {ArrowDownOnSquareStackIcon} from "@heroicons/react/24/outline";
import {DeckComponent} from "app/deck-component";
import {trpc} from "../utilities/trpc";
import { SaveChangedRequest } from "server/db-save-changed";
import { useEffect, useState } from "react";

export const DeckPage = () => {
  const saveChangedProcedure = trpc.saveChangedProcedure.useMutation();
  const { data, isLoading } = trpc.loadAllProcedure.useQuery({}, {
    refetchOnWindowFocus: false,
  });
  const [deck, setDeck] = useState<Deck>(Deck.of([]));

  useEffect(() => {
    setDeck(Deck.of(data))
  }, [data]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!data) {
    return <div>User has no data</div>;
  }
  
  const syncScoresToDb = () => {
    const changedCards: SaveChangedRequest = deck.getChangeRequest();
    saveChangedProcedure.mutate(changedCards);
    deck.resetChanged();
  };
  
  return (
    <ClerkProvider>
    <UserButton />
    <button className="btn btn-btnPrimary" onClick={syncScoresToDb}>
    <ArrowDownOnSquareStackIcon className="w-8 h-8 mr-2" />
    </button>
    <DeckComponent deck={deck} />
    </ClerkProvider>
    );
  };
  
  const Home = () => <DeckPage />;
  
  export default trpc.withTRPC(Home);
  