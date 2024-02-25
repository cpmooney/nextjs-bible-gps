"use client";
import {useMemo} from "react";
import { useDeckDataStore } from "src/store/deck-data-store";

export const Score = () => {
  const {totalScore} = useDeckDataStore();

  const scoreDisplay = useMemo(() => {
    const myTotalScore = totalScore();
    if (myTotalScore > 0) {
      return `Score: ${myTotalScore}`;
    }
    return "";
  }, [totalScore]);

  return (
    <div className="mt-1 text-xl text-light-primary text-center">
      {scoreDisplay}
    </div>
  );
};
