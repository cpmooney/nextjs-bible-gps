"use client";
import { useMemo } from "react";
import Label from "./label";
import { useDeckStateContext } from "./providers/deck-state-provider";

export default function Score() {
  const { obtainBankedScore, obtainCurrentCard } = useDeckStateContext();
  const currentScore = useMemo(
    () => obtainBankedScore().toString(),
    [obtainBankedScore]
  );
  const currentCardScore = useMemo(
    () => obtainCurrentCard()?.score.toString(),
    [obtainCurrentCard]
  );
  return (
    <>
      <Label title="Here are your killer stats!" />
      <div className="flex justify-between mb-4">
        <div className="text-2xl">Total score . . .</div>
        <div className="mr-8 text-2xl text-right">{currentScore}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-2xl">Score this citation . . .</div>
        <div className="mr-8 text-2xl text-right">{currentCardScore}</div>
      </div>
    </>
  );
}
