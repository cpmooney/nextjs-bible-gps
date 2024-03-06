"use client";
import { buildFullCitation } from "@/utilities/additional-citation-methods";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Answer from "./answer";
import Prompt from "./prompt";
import { useCardStateContext } from "./card-state-provider";
import { useUserPreferenceStore } from "src/store/user-preference-store";
import { useDeckDataStore } from "src/store/deck-data-store";
import { useDrawDeckActions } from "src/store/actions/draw-deck-actions";

export default function Content() {
  const { showingAnswer, showAnswer } = useCardStateContext();
  const { userHasNoCards } = useDeckDataStore();
  const { guaranteedCurrentCard } = useDrawDeckActions();
  const { promptDisplay } = useUserPreferenceStore();

  const router = useRouter();
  const getStarted = () => {
    router.push("/getting-started");
  };

  const fullCitation = guaranteedCurrentCard() ? buildFullCitation(guaranteedCurrentCard()) : "";

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
          citation={guaranteedCurrentCard()}
          userHasNoCards={userHasNoCards()}
        />
        <button
          className={`w-full text-white bg-secondary hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 text-xl pt-2 ${answerHeight}`}
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
