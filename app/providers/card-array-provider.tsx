import { Citation } from "@/models/citation";
import { useRef } from "react";

export const usingCitationArrays = (cards: Citation[]): void => {
  allCitations.current = cards;
  buildArraysFromNonZeroScores();
  replenishIntroArray();
}

export const drawCitation = (): Citation => {
  guaranteeDrawDeck();
  const randomIndex = randomInRange(0, drawDeck.length - 1);
  const chosenId = drawDeck.splice(randomIndex, 1)[0];
  const chosenCitation = guaranteeAllCitations().find((card) => card.id === chosenId);
  if (!chosenCitation) {
    throw new Error(`drawCitation: Could not find card with id ${chosenId}`);
  }
  return chosenCitation;
}

export const recomputeCitation = (card: Citation): void => {
  const { id, score } = card;
  if (!id) {
    throw new Error(`recomputeCitation: Card has no id`);
  }
  if (score <= 6) {
    moveCitation(id, 'intro');
  } else if (score <= 20) {
    moveCitation(id, 'intermediate');
  } else {
    moveCitation(id, 'advanced');
  }
  replenishIntroArray();
}

export const dumpCitationArrays = (): Record<ArrayType, Citation[]> => {
  const result: Record<ArrayType, Citation[]> = {
    intro: [],
    intermediate: [],
    advanced: [],
    active: []
  };
  arrayTypeList.forEach((arrayType) => {
    idArray(arrayType).forEach((id) => {
      const card = guaranteeAllCitations().find((card) => card.id === id);
      if (!card) {
        throw new Error(`dumpCitationArrays: Could not find card with id ${id}`);
      }
      result[arrayType].push(card);
    });
  });
  return result;
}

export const dumpDrawDeck = (): Citation[] => {
  return drawDeck.map((id) => {
    const card = guaranteeAllCitations().find((card) => card.id === id);
    if (!card) {
      throw new Error(`dumpDrawDeck: Could not find card with id ${id}`);
    }
    return card;
  });
}

type ArrayType = 'intro' | 'intermediate' | 'advanced' | 'active';
const arrayTypeList: ArrayType[] = ['intro', 'intermediate', 'advanced'];

const cardArrays: Record<ArrayType, Record<number, boolean>> = {
  intro: {},
  intermediate: {},
  advanced: {},
  active: {}
};

const allCitations = useRef<Citation[] | null>(null);

const guaranteeAllCitations = (): Citation[] => {
  if (!allCitations.current) {
    throw new Error(`guaranteeAllCitations: allCitations.current is null`);
  }
  return allCitations.current;
}

const replenishIntroArray = () => {
  let numberOfIntroCitations = numberOfCitations('intro');
  if (numberOfIntroCitations < 3) {
    guaranteeAllCitations().some((card) => {
      const { id, score } = card;
      if (!id) {
        throw new Error(`replenishIntroArray: Card has no id`);
      }
      if (score === 0) {
        cardArrays.intro[id] = true;
        numberOfIntroCitations++;
      }
      return numberOfIntroCitations >= 3;
    });
  }
}

const buildArraysFromNonZeroScores = (): void => {
  guaranteeAllCitations().forEach((card) => {
    const { id, score } = card;
    if (!id) {
      throw new Error(`buildArraysFromNonZeroScores: Card has no id`);
    }
    if (score > 0) {
      cardArrays.active[id] = true;
      recomputeCitation(card);
    }
  });
}

const guaranteeDrawDeck = (): void => {
  if (drawDeck.length == 0) {
    idArray('intro').forEach((id) => {
      drawDeck.push(id);
      drawDeck.push(id);
      drawDeck.push(id);
    });
    idArray('intermediate').forEach((id) => {
      drawDeck.push(id);
    });
    const advancedLength = Math.max(Math.floor(drawDeck.length / 10), 10);
    for (let i = 0; i < advancedLength; i++) {
      // TODO: Take 'last reviewed' into account here
      const randomAdvancedId = idArray('advanced')[randomInRange(0, idArray('advanced').length - 1)];
      drawDeck.push(randomAdvancedId);
    }
  }
  if (drawDeck.length == 0) {
    throw new Error(`guaranteeDrawDeck: drawDeck is empty even after replinishment`);
  }
}

const drawDeck: number[] = [];

const numberOfCitations = (arrayType: ArrayType) =>
  Object.entries(cardArrays[arrayType]).length;

const idArray = (arrayType: ArrayType): number[]  => {
    return Object.keys(cardArrays[arrayType]).map((id) => parseInt(id));
  }

const moveCitation = (id: number, to: ArrayType): void => {
  arrayTypeList.forEach((arrayType) => {
    if (arrayType != to) {
      delete cardArrays[arrayType][id];
    }
  });
  cardArrays[to][id] = true;
}

const randomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
