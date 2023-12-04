import { Citation } from "@/models/citation";
import { createContext, useContext, useRef, useState } from "react";
import { useDeckContext } from "./deck-provider";
import { createDrawDeck } from "@/utilities/draw-deck-builder";

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

export const CardArrayProvider = ({ citations, children }: DeckStateProviderProps) => {
  const { incrementCardScore, resetCardScore } = useDeckContext();
  const drawDeck = useRef<number[]>([]);
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
    const chosenId = drawDeck.current.splice(randomIndex, 1)[0];
    const chosenCitation = citations.find(
      (card) => card.id === chosenId
    );
    if (!chosenCitation) {
      throw new Error(`drawCitation: Could not find card with id ${chosenId}`);
    }
    setCurrentCard(chosenCitation);
    return chosenCitation;
  };

  const guaranteeDrawDeck = () => {
    if (drawDeck.current.length === 0) {
      drawDeck.current = createDrawDeck(citations);
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
