"use client";
import { Deck } from "@/models/deck";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/outline";
import { DeckComponent } from "app/deck-component";
import { trpc } from "../utilities/trpc";
import { SaveChangedRequest } from "server/db-save-changed";
import { useEffect, useState } from "react";
import Image from 'next/image';

const ImageBackground = () => {
  return (
    <div style={{overflow: 'hidden'}}>
      <Image
        style={{zIndex: -1 }}
        src="/images/light-gray-concrete-wall.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        />
    </div>
  )
}

const DeckPageWithBackground = () => {
  return (
    <div>
      <ImageBackground />
      <DeckPage />
    </div>
  )
}

const DeckPage = () => {
  const saveChangedProcedure = trpc.saveChangedProcedure.useMutation();
  const { data, isLoading } = trpc.loadAllProcedure.useQuery(
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

  const syncScoresToDb = () => {
    const changedCards: SaveChangedRequest = deck.getChangeRequest();
    saveChangedProcedure.mutate(changedCards);
    deck.resetChanged();
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
