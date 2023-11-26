import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Modal } from "./modal";
import { Card } from "@/models/card";

interface CitationInfoProps {
  card: Card;
}

export const CitationInfo = (props: CitationInfoProps) => {
  const { entire, fullCitation, bibleGatewayUrl } = props.card;

  const showInBibleApp = () => {
    window.open(bibleGatewayUrl, "_blank");
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
            onClick={showInBibleApp}
          >
            <BookOpenIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    ),
  });
};
