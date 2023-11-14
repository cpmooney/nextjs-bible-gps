"use client";
import {Deck} from "@/models/deck";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {ArrowDownOnSquareStackIcon} from "@heroicons/react/24/outline";
import {DeckComponent} from "app/deck-component";
import {ImageBackground} from "app/image-background";
import {useEffect, useState} from "react";
import {SaveChangedRequest as SaveChangedScoresRequest} from "server/db-save-changed";
import {trpc} from "../utilities/trpc";

const DeckPageWithBackground = () => {
  return (
    <div>
      <ImageBackground />
      <DeckPage />
    </div>
  );
};

const DeckPage = () => {
  const saveChangedScoresProcedure =
    trpc.saveChangedScoresProcedure.useMutation();
  const {data, isLoading} = trpc.loadAllProcedure.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
  const [deck, setDeck] = useState<Deck>(Deck.of([]));

  useEffect(() => {
    setDeck(Deck.of(data));
  }, [data]);

  if (isLoading) {
    return <div></div>;
  }

  if (!data) {
    return <div>User has no data</div>;
  }

  const syncScoresToDb = async () => {
    const changedCards: SaveChangedScoresRequest = deck.changedScoreRequest;
    const results = await saveChangedScoresProcedure.mutateAsync(changedCards);
    deck.cardsWithChangedScores = {};
  };

  const resetAllScores = () => {
    saveChangedScoresProcedure.mutate(deck.resetAllScores());
  };

  return (
    <div className="ml-5 mt-5">
      <ClerkProvider>
        <div className="mb-2">
          <div className="btn">
            <UserButton />
          </div>
          <button className="btn btn-btnPrimary" onClick={syncScoresToDb}>
            <ArrowDownOnSquareStackIcon className="w-8 h-8 mr-2" />
          </button>
        </div>
        <DeckComponent deck={deck} />
      </ClerkProvider>
    </div>
  );
};

const Home = () => <DeckPageWithBackground />;

export default trpc.withTRPC(Home);
