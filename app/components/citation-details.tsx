"use client";
import {useMemo} from "react";
import {useDeckStateContext} from "./providers/deck-state-provider";

export default function CitationDetails() {
  const {obtainOptionalCurrentCard} = useDeckStateContext();
  const currentCardScore = useMemo(
    () => obtainOptionalCurrentCard()?.score.toString(),
    [obtainOptionalCurrentCard]
  );
  return (
    <>
      <div className="flex justify-between">
        <div className="text-2xl">Score this citation . . .</div>
        <div className="mr-8 text-2xl text-right">{currentCardScore}</div>
      </div>
    </>
  );
}
