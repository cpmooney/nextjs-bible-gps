import {Dispatch, SetStateAction} from "react";
import {Citation} from "src/models/citation";
import {SaveChangedScoresRequest} from "src/server/db-save-changed";

export const recordScoreChange = (
  card: Citation,
  scoreChange: ScoreChange,
  setUnbankedScore: Dispatch<SetStateAction<number>>
): void => {
  if (scoreChange === ScoreChange.Increment) {
    setUnbankedScore((unbankedScore) => unbankedScore + 1);
    card.score++;
  } else if (scoreChange === ScoreChange.Reset) {
    setUnbankedScore((unbankedScore) => unbankedScore - card.score);
    card.score = 0;
  }
  card.lastReviewed = new Date();
  if (!card.id) {
    throw new Error("Card has no id");
  }
  cardsWithChangedScores[card.id] = {
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
