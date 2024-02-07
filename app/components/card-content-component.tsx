"use client";
import {Citation} from "@/models/citation";
import {buildFullCitation} from "@/utilities/additional-citation-methods";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import CardAnswerComponent from "./card-answer-component";
import Prompt from "./prompt";
import {useDeckStateContext} from "./providers/deck-state-provider";
import { useUserPreferenceContext } from "./providers/user-preference-provider";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({
  showingAnswer,
  showAnswer,
}: CardContentComponentProps) {
  const router = useRouter();
  const getStarted = () => {
    router.push("/getting-started");
  };

  const {obtainCurrentCard, userHasNoCards} = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);
  const {promptDisplay} = useUserPreferenceContext();

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard]);

  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const score = currentCard?.score ?? "";

  const bigButtonClickHandler = userHasNoCards() ? getStarted : showAnswer;

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
        className={`btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 text-xl ${answerHeight}`}
        onClick={bigButtonClickHandler}
        disabled={showingAnswer}
      >
        {userHasNoCards() ? (
          <PlusCircleIcon className="w-12 h-12" />
        ) : (
          <CardAnswerComponent
            answer={fullCitation}
            showingAnswer={showingAnswer}
          />
        )}
      </button>
      <div className="absolute right-0 bottom-0 p-2 text-xl">{score}</div>
    </>
  );
}
