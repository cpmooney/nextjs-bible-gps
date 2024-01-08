import {
  BookOpenIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import {
  buildExternalUrl,
  buildFullCitation,
} from "src/utilities/additional-citation-methods";
import { Modal } from "./modal";
import { useDeckStateContext } from "./providers/deck-state-provider";
import { useEffect, useState } from "react";
import { Citation } from "@/models/citation";
import { useRouter } from "next/navigation";

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
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">{fullCitation}</h3>
          <p className="text-lg">{entire}</p>
        </div>
        <div className="modal-action">
          <div className="mr-2 mt-2 mb-2 justify-start">id {id}</div>
          <div className="mr-2 mt-2 mb-2 justify-start">score {score}</div>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={editCitation}
          >
            <PencilIcon className="w-6" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={showInExternalApp}
          >
            <BookOpenIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    )});
};

const editUrl = (cardId?: number) => {
  const id: number = cardId ? cardId : 0;
  return `/edit/${id}`;
};
