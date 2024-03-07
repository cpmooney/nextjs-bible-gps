import {guaranteeUserId} from "app/actions";
import {Citation} from "src/models/citation";
import {invokeDbLoadAllAction} from "src/server/db-load-all-rows";
import {CardArrayProvider} from "./deck-state-provider";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DeckProvider = async ({children}: Props) => {
  const allCards = await loadAllCards();

  return (
    <CardArrayProvider
      citations={allCards}
      initialBankedScore={computeTotalScore(allCards)}
      allCards={allCards}
    >
      {children}
    </CardArrayProvider>
  );
};

const computeTotalScore = (cards: Citation[]): number => {
  return cards.reduce((total, card) => total + card.score, 0);
};

const loadAllCards = async () => {
  const userId = await guaranteeUserId({ useDemo: true });
  return await invokeDbLoadAllAction(userId);
};

export default DeckProvider;
