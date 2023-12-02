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

export interface DeckContext {
  nextCard: () => Citation;
  isReady: () => boolean;
  userHadNoData: () => boolean;
  syncScoresToDb: () => Promise<void>;
  incrementCardScore: () => void;
  resetCardScore: () => void;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainUnbankedScore: () => number;
  obtainBankedScore: () => number;
  obtainCurrentCard: () => Citation;
}

const DeckContext = createContext<DeckContext | null>(null);

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
  const bankedScore = useRef<number>(0);
  const unbankedScore = useRef<number>(0);
  const currentCard = useRef<Citation | null>(null);

  const [isReady, setIsReady] = useState<boolean>(false);

  const nextCard = (): Citation => {
    const nextCard = drawCitation();
    currentCard.current = nextCard;
    return nextCard;
  };

  const guaranteeCurrentCard = (): Citation => {
    if (!currentCard.current) {
      nextCard();
    }
    if (!currentCard.current) {
      throw new Error("currentCard is null");
    }
    return currentCard.current;
  };

  const guaranteeAllCards = (): Citation[] => {
    if (!allCards.current) {
      throw new Error("allCards is null");
    }
    return allCards.current;
  };

  useEffect(() => {
    if (!isLoading) {
      allCards.current = fixTrpcBug(data);
      setIsReady(true);
    }
  }, [isLoading, data]);

  const deckContext: DeckContext = {
    nextCard,
    obtainCurrentCard: (): Citation => {
      return guaranteeCurrentCard();
    },
    obtainUnbankedScore: (): number => unbankedScore.current,
    obtainBankedScore: (): number => bankedScore.current,
    isReady: (): boolean => isReady,
    userHadNoData: (): boolean => guaranteeAllCards().length === 0,
    syncScoresToDb: async (): Promise<void> => {
      await saveScoreProcedure.mutateAsync(obtainChangedScoreRequest());
      bankedScore.current += unbankedScore.current;
      unbankedScore.current = 0;
    },
    incrementCardScore: (): void =>
      recordScoreChange(
        guaranteeCurrentCard(),
        ScoreChange.Increment,
        unbankedScore
      ),
    resetCardScore: (): void =>
      recordScoreChange(
        guaranteeCurrentCard(),
        ScoreChange.Reset,
        unbankedScore
      ),
    obtainCardsByBook: (): OrderedCardsByBook =>
      buildCardsByBook(guaranteeAllCards()),
  };

  if (!isReady) {
    return <Loader />
  }

  return (
    <DeckContext.Provider value={deckContext}>{children}</DeckContext.Provider>
  );
};

interface DeckProviderProps {
  children: React.ReactNode;
}
