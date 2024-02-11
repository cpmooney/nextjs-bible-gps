"use client";
import { BookOpenIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  buildExternalUrl,
  buildFullCitation,
} from "src/utilities/additional-citation-methods";
import { Modal } from "./modal";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { useEffect, useState } from "react";
import { Citation } from "@/models/citation";
import { useRouter } from "next/navigation";
import Label from "../label";

export const CitationInfo = () => {
  const { obtainCurrentCard } = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);

  const router = useRouter();

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, [obtainCurrentCard]);

  const entire = currentCard?.entire ?? "";
  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const externalUrl = currentCard ? buildExternalUrl(currentCard) : "";
  const id = currentCard?.id?.toString() ?? "-";
  const score = currentCard?.score?.toString() ?? "-";

  const editCitation = () => router.push(editUrl(obtainCurrentCard().id));

  const showInExternalApp = () => {
    window.open(externalUrl, "_blank");
  };

  return Modal({
    name: "full_citation",
    contents: (
      <div>
        <div>
          <Label title={fullCitation} />
          <p className="text-lg">{entire}</p>
        </div>
        <div>
          <div className="flex mr-2 mt-6 mb-2 justify-start bg-gray-200">
            <div className="flex-1 m-1">
              Current Score on This Citation
            </div>
            <div className="flex-1 m-1">
              {score}
            </div>
          </div>
          <button className=" mr-2 mt-2 mb-2" onClick={editCitation}>
            <PencilIcon className="w-6" />
          </button>
          <button className=" mr-2 mt-2 mb-2" onClick={showInExternalApp}>
            <BookOpenIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    ),
  });
};

const editUrl = (cardId?: number) => {
  const id: number = cardId ? cardId : 0;
  return `/edit/${id}`;
};
