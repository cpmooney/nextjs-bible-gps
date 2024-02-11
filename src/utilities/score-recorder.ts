import {Dispatch, SetStateAction} from "react";
import {Citation} from "src/models/citation";
import {SaveChangedScoresRequest} from "src/server/db-save-changed";

export const recordScoreChange = (
  card: Citation,
  scoreChange: ScoreChange,
  setUnbankedScore: Dispatch<SetStateAction<number>>
): ScoreChangeRecord => {
  const scoreDelta = computeScoreDelta(scoreChange, card.score);
  setUnbankedScore((unbankedScore) => unbankedScore + scoreDelta);
  card.score += scoreDelta;
  card.lastReviewed = new Date();
  if (!card.id) {
    throw new Error("Card has no id");
  }
  return {
    id: card.id,
    score: card.score,
    lastReviewed: card.lastReviewed.toISOString(),
  };
};

export const obtainChangedScoreRequest = (): SaveChangedScoresRequest => {
  return Object.entries(cardsWithChangedScores).map(([id, changeInfo]) => {
    return {
      id: parseInt(id),
      score: changeInfo.score,
      lastReviewed: changeInfo.lastReviewed,
    };
  });
};

const computeScoreDelta = (scoreChange: ScoreChange, score: number): number => {
  if (scoreChange === ScoreChange.Increment) {
    return 1;
  } else if (scoreChange === ScoreChange.Reset) {
    return -Math.min(score, 10);
  }
  throw new Error(`Invalid score change: ${scoreChange}`);
}

export enum ScoreChange {
  Increment,
  Reset,
}

const cardsWithChangedScores: ScoreChangeRecords = {};

interface ScoreChangeRecord {
  id: number;
  score: number;
  lastReviewed: string;
}

type ScoreChangeRecords = Record<number, ScoreChangeRecord>;
