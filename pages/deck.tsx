"use client";
import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {DeckComponent} from "app/deck-component";
import {ImageBackground} from "app/image-background";
import {trpc} from "../utilities/trpc";
import { DeckProvider } from "app/deck-context";

const DeckPageWithBackground = () => {
  return (
    <div>
      <ImageBackground />
      <DeckPage />
    </div>
  );
};

const DeckPage = () => {
  return (
    <div className="ml-5 mt-5">
      <ClerkProvider>
        <div className="mb-2">
          <div className="btn">
            <UserButton />
          </div>
        </div>
        <DeckProvider>
          <DeckComponent />
        </DeckProvider>
      </ClerkProvider>
    </div>
  );
};

const Home = () => <DeckPageWithBackground />;

export default trpc.withTRPC(Home);
