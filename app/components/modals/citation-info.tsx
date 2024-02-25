"use client";
import {
  buildFullCitation,
} from "src/utilities/additional-citation-methods";
import { Modal, closeModal } from "./modal";
import { useRouter } from "next/navigation";
import Label from "../label";
import { ActionButton } from "../action-button";
import { useDrawDeckStore } from "src/store/draw-deck-store";

export const CitationInfo = () => {
  const { currentCard } = useDrawDeckStore();

  const router = useRouter();

  const entire = currentCard?.entire ?? "";
  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const score = currentCard?.score?.toString() ?? "-";
  const id = currentCard?.id ?? 0;

  const editCitation = () => {
    router.push(editUrl(id));
    closeModal("full_citation");
  }

  return Modal({
    name: "full_citation",
    contents: (
      <>
        <div>
          <Label title={fullCitation} />
          <p className="text-lg">{entire}</p>
          <div className="flex mr-2 mt-6 mb-2 justify-start border-b-2">
            <div className="m-1">Score . . .</div>
            <div className="ml-auto m-1">{score}</div>
          </div>
          <div className="flex mr-2 mt-6 mb-2 justify-start border-b-2">
            <div className="m-1">ID . . .</div>
            <div className="ml-auto m-1">{id}</div>
          </div>
          <ActionButton title="Edit" onClick={editCitation} />
        </div>
      </>
    ),
  });
};

const editUrl = (cardId?: number) => {
  const id: number = cardId ? cardId : 0;
  return `/edit/${id}`;
};
