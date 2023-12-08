import { Citation } from "src/models/citation";
import { createContext, useContext, useRef, useState } from "react";
import { useDeckContext } from "./deck-provider";
import { createDrawDeck } from "src/utilities/draw-deck-builder";
import { randomInRange } from "src/utilities/misc";

export interface DeckStateContext {
  obtainCurrentCard: () => Citation;
  drawCitation: () => Citation;
  incrementCurrentCardScore: () => void;
  resetCurrentCardScore: () => void;
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

export const CardArrayProvider = ({
  citations,
  children,
}: DeckStateProviderProps) => {
  const { incrementCardScore, resetCardScore } = useDeckContext();
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
      drawDeck.current = createDrawDeck(citations) as Citation[];
    }
  };

  const deckStateContext: DeckStateContext = {
    drawCitation,
    obtainCurrentCard: guaranteeCurrentCard,
    incrementCurrentCardScore: () => incrementCardScore(guaranteeCurrentCard()),
    resetCurrentCardScore: () => resetCardScore(guaranteeCurrentCard()),
  };

  return (
    <DeckStateContext.Provider value={deckStateContext}>
      {children}
    </DeckStateContext.Provider>
  );
};

const DeckStateContext = createContext<DeckStateContext | null>(null);

interface DeckStateProviderProps {
  children: React.ReactNode;
  citations: Citation[];
}
