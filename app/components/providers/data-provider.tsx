import {guaranteeUserId} from "app/actions";
import {ReactNode} from "react";
import {Citation} from "src/models/citation";
import {invokeDbLoadAllAction} from "src/server/db-load-all-rows";

interface DeckProviderProps {
  children: ReactNode;
}

const DataProvider = async ({children}: DeckProviderProps) => {
  const allCards = await loadAllCards();
  // TODO: Load preferences

  return <></>;
};

const computeTotalScore = (cards: Citation[]): number => {
  return cards.reduce((total, card) => total + card.score, 0);
};

const loadAllCards = async () => {
  const userId = await guaranteeUserId({useDemo: true});
  return await invokeDbLoadAllAction(userId);
};

export default DataProvider;
