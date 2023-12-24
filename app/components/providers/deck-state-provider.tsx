"use client";
import {
  OrderedCardsByBook,
  buildCardsByBook,
} from "@/utilities/card-by-book-builder";
import {
  ScoreChange,
  obtainChangedScoreRequest,
  recordScoreChange,
} from "@/utilities/score-recorder";
import {saveChangedCards} from "app/actions";
import {createContext, useContext, useRef, useState} from "react";
import {Citation} from "src/models/citation";
import {createDrawDeck} from "src/utilities/draw-deck-builder";
import {randomInRange} from "src/utilities/misc";

export interface DeckStateContext {
  obtainCurrentCard: () => Citation;
  drawCitation: () => Citation;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
  syncScoresToDb: () => Promise<void>;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainAllCitations: () => Citation[];
  obtainUnbankedScore: () => number;
  obtainBankedScore: () => number;
}

interface DeckStateProviderProps {
  children: React.ReactNode;
  citations: Citation[];
  initialBankedScore: number;
  userHadNoData: boolean;
  allCards: Citation[];
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
  const [bankedScore, setBankedScore] = useState<number>(
    props.initialBankedScore
  );

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
    saveChangedCards(obtainChangedScoreRequest());
  };

  const incrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreChange.Increment,
      setUnbankedScore
    );

  const decrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreChange.Reset,
      setUnbankedScore
    );

  const obtainCardsByBook = () => buildCardsByBook(props.allCards);
  const obtainAllCitations = () => props.allCards;

  return (
    <DeckStateContext.Provider
      value={{
        drawCitation,
        obtainCurrentCard: guaranteeCurrentCard,
        incrementCurrentCardScore,
        decrementCurrentCardScore: decrementCurrentCardScore,
        syncScoresToDb,
        obtainCardsByBook,
        obtainAllCitations,
        obtainUnbankedScore: () => unbankedScore,
        obtainBankedScore: () => bankedScore,
      }}
    >
      {props.children}
    </DeckStateContext.Provider>
  );
};

const DeckStateContext = createContext<DeckStateContext | null>(null);
