"use client";
import { Citation } from "@/models/citation";
import { buildFullCitation } from "@/utilities/additional-citation-methods";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import Answer from "./answer";
import Prompt from "./prompt";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { useCardStateContext } from "./card-state-provider";
import { useUserPreferenceStore } from "src/store/user-preference-store";

export default function Content() {
  const { showingAnswer, showAnswer } = useCardStateContext();
  const { obtainCurrentCard, userHasNoCards } = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);
  const { promptDisplay } = useUserPreferenceStore();

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
      case "fragment-citation":
        return "h-40";
      case "entire-citation":
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
          className={`w-full text-white bg-dark-gray-3 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 text-xl pt-2 ${answerHeight}`}
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
