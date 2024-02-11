"use client";
import { Citation } from "@/models/citation";
import { buildFullCitation } from "@/utilities/additional-citation-methods";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Answer from "./answer";
import Prompt from "./prompt";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { useUserPreferenceContext } from "../providers/user-preference-provider";
import { useCardStateContext } from "./card-state-provider";

export default function Content() {
  const { showingAnswer, showAnswer } = useCardStateContext();
  const { obtainCurrentCard, userHasNoCards } = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);
  const { promptDisplay } = useUserPreferenceContext();

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard]);

  const router = useRouter();
  const getStarted = () => {
    router.push("/getting-started");
  };

  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";

  const showAnswerClickHandler = userHasNoCards() ? getStarted : showAnswer;

  const answerHeight = useMemo(() => {
    switch (promptDisplay) {
      case "fragment":
        return "h-40";
      case "entire":
        return "h-24";
    }
  }, [promptDisplay]);

  return (
    <>
        <Prompt
          preference={promptDisplay}
          citation={currentCard}
          userHasNoCards={userHasNoCards()}
        />
        <button
          className={`w-full text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 text-xl pt-2 ${answerHeight}`}
          onClick={showAnswerClickHandler}
          disabled={showingAnswer()}
        >
          {userHasNoCards() ? (
            <PlusCircleIcon className="w-12 h-12" />
          ) : (
            <Answer answer={fullCitation} showingAnswer={showingAnswer()} />
          )}
        </button>
    </>
  );
}
