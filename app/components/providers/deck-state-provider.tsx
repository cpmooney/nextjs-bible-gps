"use client";
import { Citation } from "src/models/citation";
import { createContext, useContext, useRef, useState } from "react";
import { createDrawDeck } from "src/utilities/draw-deck-builder";
import { randomInRange } from "src/utilities/misc";
import { ScoreChange, recordScoreChange } from "@/utilities/score-recorder";
import { OrderedCardsByBook } from "@/utilities/card-by-book-builder";

export interface DeckStateContext {
  obtainCurrentCard: () => Citation;
  drawCitation: () => Citation;
  incrementCurrentCardScore: () => void;
  resetCurrentCardScore: () => void;
  syncScoresToDb: () => Promise<void>;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainAllCitations: () => Citation[];
  obtainUnbankedScore: () => number;
  obtainBankedScore: () => number;
}

export const useDeckStateContext = () => {
  const context = useContext(DeckStateContext);
  if (!context) {
    throw new Error(
      "useCardArrayContext must be used within a CardArrayProvider"
    );
  }
  return context;
};

export const CardArrayProvider = (props: DeckStateProviderProps) => {
  const [unbankedScore, setUnbankedScore] = useState<number>(0);
  const [bankedScore, setBankedScore] = useState<number>(0);

  const drawDeck = useRef<Citation[]>([]);
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);

  const guaranteeCurrentCard = (): Citation => {
    if (!currentCard) {
      return drawCitation();
    }
    return currentCard!;
  };

  const drawCitation = (): Citation => {
    guaranteeDrawDeck();
    const randomIndex = randomInRange(0, drawDeck.current.length - 1);
    const chosenCard = drawDeck.current.splice(randomIndex, 1)[0];
    setCurrentCard(chosenCard);
    return chosenCard;
  };

  const guaranteeDrawDeck = () => {
    if (drawDeck.current.length === 0) {
      drawDeck.current = createDrawDeck(props.citations) as Citation[];
    }
  };

  const syncScoresToDb = async (): Promise<void> => {
    setBankedScore(bankedScore + unbankedScore);
    setUnbankedScore(0);
  };

  const incrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreChange.Increment,
      setUnbankedScore
    );

  const resetCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreChange.Reset,
      setUnbankedScore
    );

    const obtainCardsByBook = props.deckContext.obtainCardsByBook;
    const obtainAllCitations = props.deckContext.obtainAllCitations;

  return (
    <DeckStateContext.Provider value={{
    drawCitation,
    obtainCurrentCard: guaranteeCurrentCard,
    incrementCurrentCardScore,
    resetCurrentCardScore,
    syncScoresToDb,
    obtainCardsByBook,
    obtainAllCitations,
    obtainUnbankedScore: () => unbankedScore,
    obtainBankedScore: () => bankedScore,
  }}>
      {props.children}
    </DeckStateContext.Provider>
  );
};

const DeckStateContext = createContext<DeckStateContext | null>(null);

interface DeckStateProviderProps {
  children: React.ReactNode;
  citations: Citation[];
  initialBankedScore: number;
  deckContext: DeckContext 
}

export interface DeckContext {
  userHadNoData: boolean;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainAllCitations: () => Citation[];
}
