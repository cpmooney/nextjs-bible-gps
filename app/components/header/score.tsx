"use client";
import {useMemo} from "react";
import {useDeckStateContext} from "../providers/deck-state-provider";

export const Score = () => {
  const {obtainTotalScore} = useDeckStateContext();

  const scoreDisplay = useMemo(() => {
    const totalScore = obtainTotalScore();
    if (totalScore > 0) {
      return `Score: ${totalScore}`;
    }
    return "";
  }, [obtainTotalScore]);

  return (
    <div className="mt-1 text-xl text-light-primary text-center">
      {scoreDisplay}
    </div>
  );
};
