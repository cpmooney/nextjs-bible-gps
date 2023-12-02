"use client";
import {Deck} from "@/models/deck";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {DeckComponent} from "app/deck-component";
import {ImageBackground} from "app/image-background";
import {useEffect, useState} from "react";
import {trpc} from "../utilities/trpc";
import { fixTrpcBug } from "@/utilities/trpc-bug-fixer";

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
  const [deckIsBuilt, setDeckIsBuilt] = useState(false);

  useEffect(() => {
    const resolvedData = fixTrpcBug(data);
    // TODO: There has got to be a better pattern than this!
    if (!isLoading) {
      setDeck(Deck.of(resolvedData));
      setDeckIsBuilt(true);
    }
  }, [data, isLoading]);

  if (isLoading || !deck) {
    return <div>Loading</div>;
  }

  if (!deckIsBuilt) {
    return <div>Building deck</div>;
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
