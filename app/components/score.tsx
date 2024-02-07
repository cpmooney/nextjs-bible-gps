"use client";
import {useUser} from "@clerk/nextjs";
import {useMemo} from "react";
import {useDeckStateContext} from "./providers/deck-state-provider";

export default function ScoreComponent() {
  const {
    obtainCurrentCard,
    syncScoresToDb,
    obtainBankedScore,
    obtainUnbankedScore,
  } = useDeckStateContext();
  const {isSignedIn} = useUser();

  const unbankedScore = useMemo(() => {
    return obtainUnbankedScore();
  }, [obtainUnbankedScore]);
  const bankedScore = useMemo(() => {
    return obtainBankedScore();
  }, [obtainBankedScore]);
  const currentCard = useMemo(() => {
    return obtainCurrentCard();
  }, [obtainCurrentCard]);
  const score = useMemo(() => {
    return currentCard ? currentCard.score : "";
  }, [currentCard]);

  const saveScore = () => {
    if (isSignedIn) {
      syncScoresToDb();
    } else {
      alert("Create a user to take advantage of this feature!");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl mr-4 mt-4 w-96">
      <div className="card-body">
        <label className="label font-bold">CARD SCORE</label>
        {score}
        <label className="label font-bold">UNSAVED TOTAL SCORE</label>
        {unbankedScore}
        <label className="label font-bold">SAVED TOTAL SCORE</label>
        {bankedScore}
      </div>
    </div>
  );
}
