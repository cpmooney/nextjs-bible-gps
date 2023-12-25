import { randomInRange } from "./misc";

const numberOfGroups = 5;

interface Card {
  score: number;
  lastReviewed?: Date;
}

export interface WrappedCard {
  card: Card;
  group: number;
}

interface WrappedIndices {
  index: number;
  group: number;
}

// TODO: Take lastreviewed into account

export const createDrawDeck = (citations: Card[]): WrappedCard[] => {
  const sortedCardArrays = citations.sort((a, b) => a.score - b.score);
  return drawDeckByIndices(citations.length)
    .map(({ group, index }) => { return { card: sortedCardArrays[index], group }});
};

const drawDeckByIndices = (length: number): WrappedIndices[] => {
  const sizeOfEachGroup = Math.floor(length / numberOfGroups);
  const result: WrappedIndices[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    result.push(...buildGroup(i, sizeOfEachGroup, numberOfGroups - i));
  }
  return result;
}

const buildGroup = (group: number, sizeOfGroup: number, length: number): WrappedIndices[] => {
  const result: Set<number> = new Set();
  while (result.size < length) {
    result.add(randomInRange(group * sizeOfGroup, (group + 1) * sizeOfGroup - 1));
  }
  return Array.from(result).map(index => { return { index, group }});
}
