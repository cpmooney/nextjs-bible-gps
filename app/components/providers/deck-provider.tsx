import { Citation } from "src/models/citation";
import {
  OrderedCardsByBook,
  buildCardsByBook,
} from "src/utilities/card-by-book-builder";
import { CardArrayProvider} from "./deck-state-provider";
import { guaranteeUserId } from "app/actions";
import { invokeDbLoadAllAction } from "src/server/db-load-all-rows";

const DeckProvider = async ({ children }: DeckProviderProps) => {
  const allCards = await loadAllCards();

  return (
    <CardArrayProvider
      citations={allCards}
      initialBankedScore={computeTotalScore(allCards)}
      deckContext={{
        userHadNoData: allCards.length === 0,
        obtainCardsByBook: (): OrderedCardsByBook =>
          buildCardsByBook(allCards),
        obtainAllCitations: (): Citation[] => allCards,
      }}
    >
      {children}
    </CardArrayProvider>
  );
};

interface DeckProviderProps {
  children: React.ReactNode;
}

const computeTotalScore = (cards: Citation[]): number => {
  return cards.reduce((total, card) => total + card.score, 0);
};

const loadAllCards = async () => {
  const userId = guaranteeUserId();
  return await invokeDbLoadAllAction(userId);
};

export default DeckProvider;
