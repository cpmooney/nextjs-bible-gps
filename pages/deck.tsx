"use client";
import {Citation} from "@/models/citation";
import {Deck} from "@/models/deck";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {ArrowDownOnSquareStackIcon} from "@heroicons/react/24/outline";
import {DeckComponent} from "app/deck-component";
import {trpc} from "../utilities/trpc";
import { SaveChangedRequest } from "server/db-save-changed";

interface DeckPageProps {
  sampleCitations?: Citation[];
}

export const DeckPage = (props: DeckPageProps) => {
  const saveChangedProcedure = trpc.saveChangedProcedure.useMutation();

  // TODO: Figure out why data reloads every time the browser comes back in focus.  Should not need to reload even when page refreshes.
  // There is probably a more "reacty" way to accomplish this.
  let data: Citation[] = [];
  if (!props.sampleCitations) {
    const response = trpc.loadAllProcedure.useQuery({});
    if (!response.data) {
      return <div>Loading...</div>;
    }
    data = response.data;
  } else {
    data = props.sampleCitations;
  }

  const deck = Deck.of(data);

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
