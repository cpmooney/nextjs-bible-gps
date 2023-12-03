import { Citation } from "@/models/citation";
import {
  OrderedCardsByBook,
  buildCardsByBook,
} from "@/utilities/card-by-book-builder";
import {
  ScoreChange,
  obtainChangedScoreRequest,
  recordScoreChange,
} from "@/utilities/score-recorder";
import { trpc } from "@/utilities/trpc";
import { fixTrpcBug } from "@/utilities/trpc-bug-fixer";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Loader } from "../loader-component";
import { CardArrayProvider } from "./deck-state-provider";

export const useDeckContext = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeckContext must be used within a DeckProvider");
  }
  return context;
};

export const DeckProvider = ({ children }: DeckProviderProps) => {
  const { data, isLoading } = trpc.loadAllProcedure.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
  const saveScoreProcedure = trpc.saveChangedScoresProcedure.useMutation();

  const allCards = useRef<Citation[] | null>(null);
  const [unbankedScore, setUnbankedScore] = useState<number>(0);
  const [bankedScore, setBankedScore] = useState<number>(0);

  const [isReady, setIsReady] = useState<boolean>(false);

  const guaranteeAllCards = (): Citation[] => {
    if (!allCards.current) {
      throw new Error("allCards is null");
    }
    return allCards.current;
  };

  useEffect(() => {
    if (!isLoading) {
      allCards.current = fixTrpcBug(data);
      setBankedScore(computeTotalScore(guaranteeAllCards()));
      setIsReady(true);
    }
  }, [isLoading, data]);

  const deckContext: DeckContext = {
    obtainUnbankedScore: (): number => unbankedScore,
    obtainBankedScore: (): number => bankedScore,
    userHadNoData: (): boolean => guaranteeAllCards().length === 0,
    syncScoresToDb: async (): Promise<void> => {
      await saveScoreProcedure.mutateAsync(obtainChangedScoreRequest());
      setBankedScore(bankedScore + unbankedScore);
      setUnbankedScore(0);
    },
    incrementCardScore: (card: Citation): void =>
      recordScoreChange(
        card,
        ScoreChange.Increment,
        setUnbankedScore
      ),
    resetCardScore: (card: Citation): void =>
      recordScoreChange(
        card,
        ScoreChange.Reset,
        setUnbankedScore
      ),
    obtainCardsByBook: (): OrderedCardsByBook =>
      buildCardsByBook(guaranteeAllCards()),
    obtainAllCitations: (): Citation[] => guaranteeAllCards(),
  };

  if (!isReady) {
    return <Loader />;
  }

  return (
    <DeckContext.Provider value={deckContext}>
      <CardArrayProvider citations={guaranteeAllCards()}>{children}</CardArrayProvider>
    </DeckContext.Provider>
  );
};

export interface DeckContext {
  userHadNoData: () => boolean;
  syncScoresToDb: () => Promise<void>;
  incrementCardScore: (card: Citation) => void;
  resetCardScore: (card: Citation) => void;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainUnbankedScore: () => number;
  obtainBankedScore: () => number;
  obtainAllCitations: () => Citation[];
}

const DeckContext = createContext<DeckContext | null>(null);

interface DeckProviderProps {
  children: React.ReactNode;
}

const computeTotalScore = (cards: Citation[]): number => {
  return cards.reduce((total, card) => total + card.score, 0);
}
