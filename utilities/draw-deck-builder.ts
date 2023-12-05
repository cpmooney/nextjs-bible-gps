import { randomInRange } from "./misc";

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
    selectionAtRandom(cardArrays.intro, 10).forEach((card) => {
      drawDeck.push(card);
      drawDeck.push(card);
      drawDeck.push(card);
    });
    selectionAtRandom(cardArrays.intermediate, 10).forEach((card) => {
      drawDeck.push(card);
    });
    selectionAtRandom(cardArrays.advanced, 5).forEach((card) => {
      drawDeck.push(card);
    });
    return drawDeck;
  };

  buildCardArrays(citations);
  return buildDrawDeck();
};

const selectionAtRandom = (cardArray: Card[], length: number): Card[] => {
  const result: Card[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = randomInRange(0, cardArray.length - 1);
    result.push(cardArray.splice(randomIndex, 1)[0]);
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
