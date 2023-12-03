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
    recomputeCitation(card);
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

  const recomputeCitation = (card: Citation): void => {
    const { id, score } = card;
    if (!id) {
      throw new Error(`recomputeCitation: Card has no id`);
    }
    if (score <= 6) {
      moveCitation(id, "intro");
    } else if (score <= 20) {
      moveCitation(id, "intermediate");
    } else {
      moveCitation(id, "advanced");
    }
    replenishIntroArray();
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

  const replenishIntroArray = () => {
    let numberOfIntroCitations = numberOfCitations("intro");
    if (numberOfIntroCitations < 3) {
      citations.some((card) => {
        const { id, score } = card;
        if (!id) {
          throw new Error(`replenishIntroArray: Card has no id`);
        }
        if (score === 0) {
          cardArrays.current.intro[id] = true;
          numberOfIntroCitations++;
        }
        return numberOfIntroCitations >= 3;
      });
    }
  };

  const guaranteeDrawDeck = (): void => {
    if (drawDeck.current.length == 0) {
      idArray("intro").forEach((id) => {
        drawDeck.current.push(id);
        drawDeck.current.push(id);
        drawDeck.current.push(id);
      });
      idArray("intermediate").forEach((id) => {
        drawDeck.current.push(id);
      });
      const advancedLength = Math.max(Math.floor(drawDeck.current.length / 10), 10);
      for (let i = 0; i < advancedLength; i++) {
        // TODO: Take 'last reviewed' into account here
        const randomAdvancedId =
          idArray("advanced")[randomInRange(0, idArray("advanced").length - 1)];
        drawDeck.current.push(randomAdvancedId);
      }
    }
    if (drawDeck.current.length == 0) {
      throw new Error(
        `guaranteeDrawDeck: drawDeck is empty even after replinishment`
      );
    }
  };

  const numberOfCitations = (arrayType: ArrayType) =>
    Object.entries(cardArrays.current[arrayType]).length;

  const idArray = (arrayType: ArrayType): number[] => {
    return Object.keys(cardArrays.current[arrayType]).map((id) => parseInt(id));
  };

  const moveCitation = (id: number, to: ArrayType): void => {
    arrayTypeList.forEach((arrayType) => {
      if (arrayType != to) {
        delete cardArrays.current[arrayType][id];
      }
    });
    cardArrays.current[to][id] = true;
  };

  citations.forEach((card) => moveToActive(card));
  replenishIntroArray();

  const deckStateContext: DeckStateContext = {
    drawCitation,
    recomputeCitation,
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

const DeckStateContext = createContext<DeckStateContext | null>(null);

interface DeckStateProviderProps {
  children: React.ReactNode;
  citations: Citation[];
}
