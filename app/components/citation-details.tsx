"use client";
import {useMemo} from "react";
import { useDrawDeckActions } from "src/store/actions/draw-deck-actions";

export default function CitationDetails() {
  const { optionalCurrentCard } = useDrawDeckActions();
  const currentCardScore = useMemo(
    () => optionalCurrentCard()?.score.toString(),
    [optionalCurrentCard]
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
