import { Card } from "@/models/card";
import { Dispatch, SetStateAction } from "react";

export const usingCardArrays = (cards: Card[]): void => {
  allCards = cards;
  buildArraysFromNonZeroScores();
  replenishIntroArray();
  setDeckIsReady?.(true);
}

export const usingDeckIsReadySetter = (setter: Dispatch<SetStateAction<boolean>>) => {
  setDeckIsReady = setter;
}

export const drawCard = (): Card => {
  guaranteeShuffledDeck();
  const randomIndex = randomInRange(0, shuffledDeck.length - 1);
  const chosenId = shuffledDeck.splice(randomIndex, 1)[0];
  const chosenCard = allCards.find((card) => card.id === chosenId);
  if (!chosenCard) {
    throw new Error(`drawCard: Could not find card with id ${chosenId}`);
  }
  return chosenCard;
}

export const recomputeCard = (card: Card): void => {
  const { id, score } = card;
  if (score <= 6) {
    moveCard(id, 'intro');
  } else if (score <= 20) {
    moveCard(id, 'intermediate');
  } else {
    moveCard(id, 'advanced');
  }
  replenishIntroArray();
}

export const dumpCardArrays = (): Record<ArrayType, Card[]> => {
  const result: Record<ArrayType, Card[]> = {
    intro: [],
    intermediate: [],
    advanced: [],
    active: []
  };
  arrayTypeList.forEach((arrayType) => {
    idArray(arrayType).forEach((id) => {
      const card = allCards.find((card) => card.id === id);
      if (!card) {
        throw new Error(`dumpCardArrays: Could not find card with id ${id}`);
      }
      result[arrayType].push(card);
    });
  });
  return result;
}

type ArrayType = 'intro' | 'intermediate' | 'advanced' | 'active';
const arrayTypeList: ArrayType[] = ['intro', 'intermediate', 'advanced'];

const cardArrays: Record<ArrayType, Record<number, boolean>> = {
  intro: {},
  intermediate: {},
  advanced: {},
  active: {}
};

let allCards: Card[];

const replenishIntroArray = () => {
  let numberOfIntroCards = numberOfCards('intro');
  if (numberOfIntroCards < 3) {
    allCards.some((card) => {
      if (card.score === 0) {
        cardArrays.intro[card.id] = true;
        numberOfIntroCards++;
      }
      return numberOfIntroCards >= 3;
    });
  }
}

const buildArraysFromNonZeroScores = (): void => {
  allCards.forEach((card) => {
    const { id, score } = card;
    if (score > 0) {
      cardArrays.active[id] = true;
      recomputeCard(card);
    }
  });
}

const guaranteeShuffledDeck = (): void => {
  if (shuffledDeck.length == 0) {
    idArray('intro').forEach((id) => {
      shuffledDeck.push(id);
      shuffledDeck.push(id);
      shuffledDeck.push(id);
    });
    idArray('intermediate').forEach((id) => {
      shuffledDeck.push(id);
    });
    const advancedLength = Math.floor(shuffledDeck.length / 3);
    for (let i = 0; i < advancedLength; i++) {
      // TODO: Take 'last reviewed' into account here
      const randomAdvancedId = idArray('advanced')[randomInRange(0, idArray('advanced').length - 1)];
      shuffledDeck.push(randomAdvancedId);
    }
  }
}

const shuffledDeck: number[] = [];

const numberOfCards = (arrayType: ArrayType) =>
  Object.entries(cardArrays[arrayType]).length;

const idArray = (arrayType: ArrayType): number[]  => {
    return Object.keys(cardArrays[arrayType]).map((id) => parseInt(id));
  }


const moveCard = (id: number, to: ArrayType): void => {
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

let setDeckIsReady: Dispatch<SetStateAction<boolean>> | undefined;
