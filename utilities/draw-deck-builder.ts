import { Citation } from "@/models/citation";

export const createDrawDeck = (citations: Citation[]): number[] => {
    const cardArrays: CardArrays = {
        intro: [],
        intermediate: [],
        advanced: [],
        active: [],
    };
    let oneZeroCard: number | undefined;
    
    const cutoffs = computeScoreCutoffs(citations);

  const buildCardArrays = (citations: Citation[]): void => {
    citations.forEach((card) => organizeByScore(card));
  }

  const organizeByScore = (card: Citation): void => {
    const { id, score } = card;
    if (!id) {
      throw new Error(`recomputeCitation: Card has no id`);
    }
    if (score === 0) {
        oneZeroCard = id;
    } else if (score <= cutoffs.intro) {
      cardArrays.intro.push(id);
    } else if (score <= cutoffs.intermediate) {
      cardArrays.intermediate.push(id);
    } else {
      cardArrays.advanced.push(id);
    }
  };

const buildDrawDeck = (): number[] => {
    const drawDeck: number[] = [];
      selectionAtRandom(cardArrays.intro, 10).forEach((id) => {
        drawDeck.push(id);
        drawDeck.push(id);
        drawDeck.push(id);
      });
      selectionAtRandom(cardArrays.intermediate, 10).forEach((id) => {
        drawDeck.push(id);
      });
      selectionAtRandom(cardArrays.advanced, 5).forEach((id) => {
        drawDeck.push(id);
      });
      return drawDeck;
    }

    buildCardArrays(citations);
    return buildDrawDeck();
}

  const selectionAtRandom = (cardArray: number[], length: number): number[] => {
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = randomInRange(0, cardArray.length - 1);
      result.push(cardArray.splice(randomIndex, 1)[0]);
    }
    return result;
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

const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type CardArrays = Record<ArrayType, number[]>;

type ArrayType = "intro" | "intermediate" | "advanced" | "active";
const arrayTypeList: ArrayType[] = ["intro", "intermediate", "advanced"];
interface ArrayScoreCutoffs {
  intro: number;
  intermediate: number;
  advanced: number;
}
