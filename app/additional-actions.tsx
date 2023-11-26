import { BookOpenIcon, InformationCircleIcon, LightBulbIcon, PencilIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { showModal } from "./modal";
import { Citation } from "@/models/citation";
import { PartialCitationModal } from "./partial-citations";

interface AdditionalActionProps {
    // TODO: Need to move this kind of thing to context
    citation: Citation;
}

export const AdditionalActionComponents = (props: AdditionalActionProps) => {
    const {citation} = props;
  const showFullCitation = () => showModal("full_citation");
  const editCitation = () => showModal("edit_citation");
  const createPartialCitation = () => showModal("create_partial_citation");
  const showInBibleApp = () => {
    window.open(bibleGatewayUrl(citation), "_blank");
  }

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mt-4">
        <div className="card-actions">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2 flex-1"
            onClick={showFullCitation}
          >
            <InformationCircleIcon className="h-8 w-8" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2 flex-1"
            onClick={editCitation}
          >
            <PencilIcon className="h-8 w-8" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2 flex-1"
            onClick={showInBibleApp}
          >
            <BookOpenIcon className="h-8 w-8" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2 flex-1"
            onClick={createPartialCitation}
          >
            <LightBulbIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      <div>
        <PartialCitationModal />
      </div>
    </>
  );
};

const bibleGatewayUrl = (citation: Citation) => {
  const {book, chapter} = citation;
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${book} ${chapter}`)}&version=NKJV`;
}
