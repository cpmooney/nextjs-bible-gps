"use client";
import {Citation} from "@/models/citation";
import {buildFullCitation} from "@/utilities/additional-citation-methods";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import CardAnswerComponent from "./card-answer-component";
import {useDeckStateContext} from "./providers/deck-state-provider";

interface CardContentComponentProps {
  showingAnswer: boolean;
  showAnswer: () => void;
}

export default function CardContentComponent({
  showingAnswer,
  showAnswer,
}: CardContentComponentProps) {
  const router = useRouter();
  const editCard = () => {
    router.push("/edit/0");
  };

  const {obtainCurrentCard, userHasNoCards} = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard]);

  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const fragment = currentCard?.fragment ?? "/";
  const score = currentCard?.score ?? "";

  let fragmentPieces = fragment.split("/");
  if (userHasNoCards()) {
    fragmentPieces = ["Click to start", "adding verses!"];
  }

  const bigButtonClickHandler = userHasNoCards() ? editCard : showAnswer;

  return (
    <>
      <h2 className="text-center text-2xl h-16 mb-2">
        {fragmentPieces[0]}
        <br />
        {fragmentPieces[1]}
      </h2>
      <button
        className="btn btn-btnPrimary text-white bg-blue-600 hover:bg-blue-300 disabled:bg-blue-200 disabled:text-gray-700 h-40 text-xl"
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
