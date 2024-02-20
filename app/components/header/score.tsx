"use client";
import {useMemo} from "react";
import {useDeckStateContext} from "../providers/deck-state-provider";

export const Score = () => {
  const {obtainBankedScore} = useDeckStateContext();

  const scoreDisplay = useMemo(() => {
    const totalScore = obtainBankedScore();
    if (totalScore > 0) {
      return `Score: ${totalScore}`;
    }
    return "";
  }, [obtainBankedScore]);

  return (
    <div className="mt-1 text-xl text-light-primary text-center">
      {scoreDisplay}
    </div>
  );
};
