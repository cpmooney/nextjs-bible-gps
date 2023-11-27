import { ChartBarIcon, InformationCircleIcon, LightBulbIcon, PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { showModal } from "./modal";
import { PartialCitationModal } from "./partial-citations";
import { CitationInfo } from "./citation-info";
import { Card } from '@/models/card'
import { CardEditModal } from "./card-edit-modal";

interface AdditionalActionProps {
    // TODO: Need to move this kind of thing to context
    card: Card;
}

export const AdditionalActionComponents = (props: AdditionalActionProps) => {
  const showFullCitation = () => showModal("full_citation");
  const editCitation = () => showModal("edit_citation");
  const createPartialCitation = () => showModal("create_partial_citation");
  const addNewCitation = () => showModal("edit_citation");

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
          >
            <ChartBarIcon className="h-8 w-8" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2 flex-1"
            onClick={createPartialCitation}
          >
            <LightBulbIcon className="h-8 w-8" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2 flex-1"
            onClick={addNewCitation}
          >
            <PlusCircleIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      <div>
        <PartialCitationModal />
        <CitationInfo card={props.card}/>
        <CardEditModal card={props.card}/>
      </div>
    </>
  );
};


