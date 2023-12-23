import { randomInRange } from "./misc";

const numberOfTimesForScoreCutoffs: { cutoff: number, numberOfTimes: number}[] = [
  {cutoff: 0, numberOfTimes: 5},
  {cutoff: 10, numberOfTimes: 4},
  {cutoff: 20, numberOfTimes: 3},
  {cutoff: 30, numberOfTimes: 2}
];

const numberOfSelections: Record<ArrayType, number> = {
  intro: 15,
  intermediate: 10,
  advanced: 5,
  active: NaN
};

interface Card {
  score: number;
  lastReviewed?: Date;
}

export const createDrawDeck = (citations: Card[]): Card[] => {
  const cardArrays: CardArrays = {
    intro: [],
    intermediate: [],
    advanced: [],
    active: [],
  };
  let oneZeroCard: Card | undefined;

  const scores = citations.map((card) => card.score);
  const cutoffs = computeScoreCutoffs(scores);

  const buildCardArrays = (citations: Card[]): void => {
    citations.forEach((card) => organizeByScore(card));
  };

  const organizeByScore = (card: Card): void => {
    const { score } = card;
    if (score === 0) {
      oneZeroCard = card;
    } else if (score <= cutoffs.intro) {
      cardArrays.intro.push(card);
    } else if (score <= cutoffs.intermediate) {
      cardArrays.intermediate.push(card);
    } else {
      cardArrays.advanced.push(card);
    }
  };

  const buildDrawDeck = (): Card[] => {
    const drawDeck: Card[] = [];
    if (oneZeroCard) {
      pushToDrawDeck(drawDeck, oneZeroCard);
    }
    selectionAtRandom(cardArrays.intro, numberOfSelections.intro).forEach((card) => {
      pushToDrawDeck(drawDeck, card);
    });
    selectionAtRandom(cardArrays.intermediate, numberOfSelections.intermediate).forEach((card) => {
      pushToDrawDeck(drawDeck, card);
    });
    selectionAtRandom(cardArrays.advanced, numberOfSelections.advanced).forEach((card) => {
      pushToDrawDeck(drawDeck, card);
    });
    return drawDeck;
  };

  buildCardArrays(citations);
  return buildDrawDeck();
};

export const numberOfTimesForScore = (score: number): number => {
  return numberOfTimesForScoreCutoffs.find(({cutoff}) => score <= cutoff)?.numberOfTimes || 1;
}

const pushToDrawDeck = (drawDeck: Card[], card: Card): void => {
  const numberOfTimes = numberOfTimesForScore(card.score);
  for (let i = 0; i < numberOfTimes; i++) {
    drawDeck.push(card);
  }
}

const selectionAtRandom = (cardArray: Card[], length: number): Card[] => {
  const result: Card[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = randomInRange(0, cardArray.length - 1);
    const nextCard = cardArray.splice(randomIndex, 1)[0];
    result.push(nextCard);
    if (cardArray.length === 0) {
      break;
    }
  }
  return result;
};

export const computeScoreCutoffs = (scores: number[]): ArrayScoreCutoffs => {
  const sortedScores = scores.sort((a, b) => a - b);
  const introCutoff = sortedScores[Math.floor(sortedScores.length / 10)];
  const intermediateCutoff =
    sortedScores[Math.floor(sortedScores.length  / 2)];
  return {
    intro: introCutoff,
    intermediate: intermediateCutoff,
    advanced: 0,
  };
};

type CardArrays = Record<ArrayType, Card[]>;

type ArrayType = "intro" | "intermediate" | "advanced" | "active";
const arrayTypeList: ArrayType[] = ["intro", "intermediate", "advanced"];
interface ArrayScoreCutoffs {
  intro: number;
  intermediate: number;
  advanced: number;
}
