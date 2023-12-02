import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Modal } from "./modal";
import { useDeckContext } from "./providers/deck-provider";
import { buildExternalUrl, buildFullCitation } from "@/utilities/additional-citation-methods";

export const CitationInfo = () => {
  const { obtainCurrentCard } = useDeckContext();

  const currentCard = obtainCurrentCard();
  const entire = currentCard.entire;
  const fullCitation = buildFullCitation(currentCard);
  const externalUrl = buildExternalUrl(currentCard);

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
