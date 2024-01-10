import {randomInRange} from "./misc";

interface Card {
  score: number;
  lastReviewed?: Date;
  id?: number;
}

export interface WrappedCard {
  card: Card;
  group: number;
}

interface WrappedIndices {
  index: number;
  group: number;
}

// TODO: Take lastReviewed into account

export const createDrawDeck = (citations: Card[]): WrappedCard[] => {
  const sortedNonZeroScoreCardArrays = sortNonZeroScoreCards(citations);
  const oneZeroCard = citations.find((citation) => citation.score === 0);
  const nonZeroDrawDeck = drawDeckByIndices(
    sortedNonZeroScoreCardArrays.length
  ).map(({group, index}) => {
    return {card: sortedNonZeroScoreCardArrays[index], group};
  });
  if (oneZeroCard) {
    nonZeroDrawDeck.push({card: oneZeroCard, group: 0});
    nonZeroDrawDeck.push({card: oneZeroCard, group: 0});
    nonZeroDrawDeck.push({card: oneZeroCard, group: 0});
  }
  return nonZeroDrawDeck;
};

const sortNonZeroScoreCards = (citations: Card[]): Card[] =>
  citations
    .filter((citation) => citation.score > 0)
    .sort((a, b) => a.score - b.score);

export const scoreCutoffs = (citations: Card[]): number[] => {
  const numberOfGroups = computeNumberOfGroups(citations.length);
  const sortedNonZeroScoreCardArrays = sortNonZeroScoreCards(citations);
  const sizeOfEachGroup = Math.floor(citations.length / numberOfGroups);
  const result: number[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    const nextIndex = (i + 1) * sizeOfEachGroup;
    result.push(sortedNonZeroScoreCardArrays[nextIndex].score);
  }
  return result;
};

const drawDeckByIndices = (length: number): WrappedIndices[] => {
  const numberOfGroups = computeNumberOfGroups(length);
  if (numberOfGroups === 1) {
    return arrayOfLength(length).map((index) => {
      return {index, group: 1};
    });
  }
  const sizeOfLargestGroup = Math.floor(length / numberOfGroups);
  const result: WrappedIndices[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    result.push(...buildGroup(i, sizeOfLargestGroup, numberOfGroups - i));
  }
  return result;
};

const arrayOfLength = (length: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(i);
  }
  return result;
};

const leastRecentlyReviewed = (cards: Card[] | undefined): Card | undefined => {
  if (!cards || cards.length === 0) {
    return undefined;
  }
  let leastRecentlyReviewedCard = cards[0];
  for (let i = 0; i < cards.length; i++) {
    const lastReviewed = cards[i].lastReviewed;
    if (!lastReviewed) {
      return cards[i];
    }
    if (lastReviewed < leastRecentlyReviewedCard.lastReviewed!) {
      leastRecentlyReviewedCard = cards[i];
    }
  }
  return leastRecentlyReviewedCard;
};

const buildGroup = (
  group: number,
  sizeOfLargestGroup: number,
  sizeOfThisGroup: number
): WrappedIndices[] => {
  const result: Set<number> = new Set();
  while (result.size < sizeOfThisGroup) {
    result.add(
      randomInRange(
        group * sizeOfLargestGroup,
        (group + 1) * sizeOfLargestGroup - 1
      )
    );
  }
  return Array.from(result).map((index) => {
    return {index, group: group + 1};
  });
};

const computeNumberOfGroups = (length: number): number => {
  if (length < 4) {
    return 1;
  }
  if (length < 9) {
    return 2;
  }
  if (length < 16) {
    return 3;
  }
  if (length < 25) {
    return 4;
  }
  return 5;
};
