import { randomInRange } from "./misc";

const numberOfGroups = 5;

interface Card {
  score: number;
  lastReviewed?: Date;
}

// TODO: Take lastreviewed into account

export const createDrawDeck = (citations: Card[]): Card[] => {
  const sortedCardArrays = citations.sort((a, b) => a.score - b.score);
  return drawDeckByIndices(citations.length).map(index => sortedCardArrays[index]);
};

const drawDeckByIndices = (length: number): number[] => {
  const sizeOfEachGroup = Math.floor(length / numberOfGroups);
  const result: number[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    result.push(...buildGroup(i, sizeOfEachGroup, numberOfGroups - i));
  }
  return result;
}

const buildGroup = (groupIndex: number, sizeOfGroup: number, length: number): number[] => {
  const result: Set<number> = new Set();
  while (result.size < length) {
    result.add(randomInRange(groupIndex * sizeOfGroup, (groupIndex + 1) * sizeOfGroup - 1));
  }
  const resultArray = Array.from(result);
  return resultArray;
}
