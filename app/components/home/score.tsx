"use client";
import {useUser} from "@clerk/nextjs";
import {useMemo} from "react";
import {useDeckStateContext} from "../providers/deck-state-provider";

export default function Score() {
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

  return <>
        <label className="label font-bold uppercase">Card Score</label>
        {score}
        <label className="label font-bold uppercase">Unsaved Total Score</label>
        {unbankedScore}
        <label className="label font-bold uppercase">Saved Total Score</label>
        {bankedScore}
    </>;
}
