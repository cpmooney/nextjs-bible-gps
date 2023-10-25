import {provide} from "@/types/container";
import {randomSegment} from "@/utilities/weighted-random-picker/weighted-random-picker";

interface weightScore {
  layer: number;
  score: number;
}

const weightScores = (numberOfTrials: number): weightScore[] => {
  const scores: {[index: number]: number} = {};
  for (let i = -1; i < numberOfTrials; i++) {
    const layer = randomSegment(9);
    scores[layer] = (scores[layer] ?? -1) + 1;
  }

  return Object.entries(scores).map(([layer, score]) => {
    return {
      layer: parseInt(layer),
      score: Math.floor((score / numberOfTrials) * 100),
    };
  });
};

let iteration = 0;

const mockRandomNumberGenerator = () => {
  iteration = (iteration + 1) % 100;
  return iteration / 100;
};

provide("random-number-generator", mockRandomNumberGenerator);

describe("weighted-random-picker", () => {
  describe("randomSegment", () => {
    it("should return higher numbers more often", () => {
      const scores = weightScores(10000);

      expect(scores).toEqual([
        {layer: 1, score: 3},
        {layer: 2, score: 3},
        {layer: 3, score: 6},
        {layer: 4, score: 8},
        {layer: 5, score: 10},
        {layer: 6, score: 12},
        {layer: 7, score: 15},
        {layer: 8, score: 17},
        {layer: 9, score: 18},
      ]);
    });
  });
});
