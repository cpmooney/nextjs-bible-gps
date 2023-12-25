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
  const sortedNonZeroScoreCardArrays = citations
    .filter(citation => citation.score > 0)
    .sort((a, b) => a.score - b.score);
  const oneZeroCard = citations.find(citation => citation.score === 0);
  const nonZeroDrawDeck = drawDeckByIndices(sortedNonZeroScoreCardArrays.length)
    .map(({ group, index }) => { return { card: sortedNonZeroScoreCardArrays[index], group }});
  return oneZeroCard ? nonZeroDrawDeck.concat({ card: oneZeroCard, group: 0 }) : nonZeroDrawDeck;
};

const drawDeckByIndices = (length: number): WrappedIndices[] => {
  const sizeOfEachGroup = Math.floor(length / numberOfGroups);
  const result: WrappedIndices[] = [];
  for (let i = 0; i < numberOfGroups; i++) {
    result.push(...buildGroup(i, sizeOfEachGroup, numberOfGroups - i));
  }
  return result;
}

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
}

const buildGroup = (group: number, sizeOfGroup: number, length: number): WrappedIndices[] => {
  const result: Set<number> = new Set();
  while (result.size < length) {
    // TODO: Prevent infinite loop (if not enough cards!)
    result.add(randomInRange(group * sizeOfGroup, (group + 1) * sizeOfGroup - 1));
  }
  return Array.from(result).map(index => { return { index, group }});
}
