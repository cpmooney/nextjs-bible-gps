import { Citation } from "@/models/citation";
import { createContext, useContext, useRef, useState } from "react";
import { useDeckContext } from "./deck-provider";

export interface DeckStateContext {
  obtainCurrentCard: () => Citation;
  drawCitation: () => Citation;
  recomputeCitation: (card: Citation) => void;
  dumpCitationArrays: () => Record<ArrayType, Citation[]>;
  dumpDrawDeck: () => Citation[];
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
  const cardArrays = useRef<CardArrays>({
    intro: {},
    intermediate: {},
    advanced: {},
    active: {},
  });
  const zeroSupply = useRef<number[]>([]);
  const cutoffs = useRef<ArrayScoreCutoffs>(computeScoreCutoffs(citations));
  const drawDeck = useRef<number[]>([]);
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);

  const guaranteeCurrentCard = (): Citation => {
    if (!currentCard) {
      return drawCitation();
    }
    return currentCard!;
  };

  const moveToActive = (card: Citation): void => {
    const { id } = card;
    if (!id) {
      throw new Error(`moveToActive: Card has no id`);
    }
    cardArrays.current.active[id] = true;
    insertIntoAppropriateArray(card);
  }

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

  const insertIntoAppropriateArray = (card: Citation): void => {
    const { id, score } = card;
    if (!id) {
      throw new Error(`recomputeCitation: Card has no id`);
    }
    if (score === 0) {
      zeroSupply.current.push(id);
    } else if (score <= cutoffs.current.intro) {
      moveCitation(id, "intro");
    } else if (score <= cutoffs.current.intermediate) {
      moveCitation(id, "intermediate");
    } else {
      moveCitation(id, "advanced");
    }
    const nextZeroCard = zeroSupply.current.pop();
    if (nextZeroCard) {
      moveCitation(nextZeroCard, "intro");
    }
  };

  const dumpCitationArrays = (): Record<ArrayType, Citation[]> => {
    const result: Record<ArrayType, Citation[]> = {
      intro: [],
      intermediate: [],
      advanced: [],
      active: [],
    };
    arrayTypeList.forEach((arrayType) => {
      idArray(arrayType).forEach((id) => {
        const card = citations.find((card) => card.id === id);
        if (!card) {
          throw new Error(
            `dumpCitationArrays: Could not find card with id ${id}`
          );
        }
        result[arrayType].push(card);
      });
    });
    return result;
  };

  const dumpDrawDeck = (): Citation[] => {
    return drawDeck.current.map((id) => {
      const card = citations.find((card) => card.id === id);
      if (!card) {
        throw new Error(`dumpDrawDeck: Could not find card with id ${id}`);
      }
      return card;
    });
  };

  const guaranteeDrawDeck = (): void => {
    if (drawDeck.current.length == 0) {
      selectionAtRandom("intro", 10).forEach((id) => {
        drawDeck.current.push(id);
        drawDeck.current.push(id);
        drawDeck.current.push(id);
      });
      selectionAtRandom("intermediate", 10).forEach((id) => {
        drawDeck.current.push(id);
      });
      selectionAtRandom("advanced", 5).forEach((id) => {
        drawDeck.current.push(id);
      });
    }
    if (drawDeck.current.length == 0) {
      throw new Error(
        `guaranteeDrawDeck: drawDeck is empty even after replenishment`
      );
    }
  };

  const idArray = (arrayType: ArrayType): number[] => {
    return Object.keys(cardArrays.current[arrayType]).map((id) => parseInt(id));
  };

  const selectionAtRandom = (arrayType: ArrayType, length: number): number[] => {
    const result: number[] = [];
    const ids = idArray(arrayType);
    for (let i = 0; i < length; i++) {
      const randomIndex = randomInRange(0, ids.length - 1);
      result.push(ids.splice(randomIndex, 1)[0]);
    }
    return result;
  }

  const moveCitation = (id: number, to: ArrayType): void => {
    arrayTypeList.forEach((arrayType) => {
      if (arrayType != to) {
        delete cardArrays.current[arrayType][id];
      }
    });
    cardArrays.current[to][id] = true;
  };

  citations.forEach((card) => moveToActive(card));

  const deckStateContext: DeckStateContext = {
    drawCitation,
    recomputeCitation: insertIntoAppropriateArray,
    dumpCitationArrays,
    dumpDrawDeck,
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

const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type CardArrays = Record<ArrayType, Record<number, boolean>>;

type ArrayType = "intro" | "intermediate" | "advanced" | "active";
const arrayTypeList: ArrayType[] = ["intro", "intermediate", "advanced"];
interface ArrayScoreCutoffs {
  intro: number;
  intermediate: number;
  advanced: number;
}

const DeckStateContext = createContext<DeckStateContext | null>(null);

interface DeckStateProviderProps {
  children: React.ReactNode;
  citations: Citation[];
}

const computeScoreCutoffs = (citations: Citation[]): ArrayScoreCutoffs => {
  const scores = citations.map((citation) => citation.score);
  const sortedScores = scores.sort((a, b) => a - b);
  const introCutoff = sortedScores[Math.floor(sortedScores.length / 3)];
  const intermediateCutoff = sortedScores[Math.floor(sortedScores.length * 2 / 3)];
  return {
    intro: introCutoff,
    intermediate: intermediateCutoff,
    advanced: 0
  };
}
