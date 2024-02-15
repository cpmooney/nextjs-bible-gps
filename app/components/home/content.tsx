"use client";
import {Citation} from "@/models/citation";
import {buildFullCitation} from "@/utilities/additional-citation-methods";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {useDeckStateContext} from "../providers/deck-state-provider";
import {useUserPreferenceContext} from "../providers/user-preference-provider";
import Answer from "./answer";
import {useCardStateContext} from "./card-state-provider";
import Prompt from "./prompt";

export default function Content() {
  const {showingAnswer, showAnswer} = useCardStateContext();
  const {obtainCurrentCard, userHasNoCards} = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);
  const {obtainPromptDisplay} = useUserPreferenceContext();

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard]);

  const router = useRouter();
  const getStarted = () => {
    router.push("/getting-started");
  };

  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";

  const showAnswerClickHandler = userHasNoCards() ? getStarted : showAnswer;

  const promptDisplay = useMemo(
    () => obtainPromptDisplay(),
    [obtainPromptDisplay]
  );

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
