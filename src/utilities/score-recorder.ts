import { Citation } from "src/models/citation";

export const recordScoreChange = (
  card: Citation,
  scoreChange: ScoreChange
): ScoreChangeRecord => {
  const scoreDelta = computeScoreDelta(scoreChange, card.score);
  card.score += scoreDelta;
  card.lastReviewed = new Date();
  if (!card.id) {
    throw new Error("Cannot record score change for card which has not yet been added to the db");
  }
  return {
    id: card.id,
    score: card.score,
    lastReviewed: card.lastReviewed.toISOString(),
  };
};

const computeScoreDelta = (scoreChange: ScoreChange, score: number): number => {
  if (scoreChange === ScoreChange.Increment) {
    return 1;
  } else if (scoreChange === ScoreChange.Reset) {
    return -Math.min(score, 10);
  }
  throw new Error(`Invalid score change: ${scoreChange}`);
};

export enum ScoreChange {
  Increment,
  Reset,
}

interface ScoreChangeRecord {
  id: number;
  score: number;
  lastReviewed: string;
}

export type ScoreChangeRecords = Record<number, ScoreChangeRecord>;
