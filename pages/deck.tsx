"use client";
import {Deck} from "@/models/deck";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {DeckComponent} from "app/deck-component";
import {ImageBackground} from "app/image-background";
import {useCallback, useEffect, useState} from "react";
import {trpc} from "../utilities/trpc";
import { fixTrpcBug } from "@/utilities/trpc-bug-fixer";
import { usingDeckIsReadySetter } from "@/utilities/card-arrays";

const DeckPageWithBackground = () => {
  return (
    <div>
      <ImageBackground />
      <DeckPage />
    </div>
  );
};

const DeckPage = () => {
  const {data, isLoading} = trpc.loadAllProcedure.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
  // TODO: Move Deck a handling to a context.
  const [deck, setDeck] = useState<Deck | null>(null);
  const [deckIsReady, setDeckIsReady] = useState(false);
  const handleDeckIsReady = useCallback(() => {
    setDeckIsReady(true);
  }, []);
  usingDeckIsReadySetter(handleDeckIsReady);

  useEffect(() => {
    const resolvedData = fixTrpcBug(data);
    setDeck(Deck.of(resolvedData));
  }, [data]);

  if (isLoading || !deck) {
    return <div>Loading</div>;
  }

  if (!deckIsReady) {
    return <div>Building deck</div>
  }

  if (!data) {
    return <div>User has no data</div>;
  }

  return (
    <div className="ml-5 mt-5">
      <ClerkProvider>
        <div className="mb-2">
          <div className="btn">
            <UserButton />
          </div>
        </div>
        <DeckComponent deck={deck} />
      </ClerkProvider>
    </div>
  );
};

const Home = () => <DeckPageWithBackground />;

export default trpc.withTRPC(Home);
