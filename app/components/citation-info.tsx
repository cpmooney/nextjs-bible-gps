import {BookOpenIcon} from "@heroicons/react/24/outline";
import {
  buildExternalUrl,
  buildFullCitation,
} from "src/utilities/additional-citation-methods";
import {Modal} from "./modal";
import {useDeckStateContext} from "./providers/deck-state-provider";
import { useEffect, useState } from "react";
import { Citation } from "@/models/citation";

export const CitationInfo = () => {
  const {obtainCurrentCard} = useDeckStateContext();
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);

  useEffect(() => {
    setCurrentCard(obtainCurrentCard());
  }, []);

  const entire = currentCard?.entire ?? "";
  const fullCitation = currentCard ? buildFullCitation(currentCard) : "";
  const externalUrl = currentCard ? buildExternalUrl(currentCard) : "";

  const showInExternalApp = () => {
    window.open(externalUrl, "_blank");
  };

  return Modal({
    name: "full_citation",
    contents: (
      <div>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {fullCitation}
          </h3>
          <p className="text-lg">
            {entire}
          </p>
        </div>
        <div className="modal-action">
          <div className="btn btn-btnPrimary mr-2 mt-2 mb-2 justify-start">
             id {currentCard?.id ?? ""}
          </div>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={showInExternalApp}
          >
            <BookOpenIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    ),
  });
};
