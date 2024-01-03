import {BookOpenIcon} from "@heroicons/react/24/outline";
import {
  buildExternalUrl,
  buildFullCitation,
} from "src/utilities/additional-citation-methods";
import ClientOnly from "./hydration-support/client-only";
import {Modal} from "./modal";
import {useDeckStateContext} from "./providers/deck-state-provider";

export const CitationInfo = () => {
  const {obtainCurrentCard} = useDeckStateContext();

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
          <h3 className="font-bold text-lg mb-4">
            <ClientOnly>{fullCitation}</ClientOnly>
          </h3>
          <p className="text-lg">
            <ClientOnly>{entire}</ClientOnly>
          </p>
        </div>
        <div className="modal-action">
          <div className="btn btn-btnPrimary mr-2 mt-2 mb-2 justify-start">
            id <ClientOnly>{currentCard.id}</ClientOnly>
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
