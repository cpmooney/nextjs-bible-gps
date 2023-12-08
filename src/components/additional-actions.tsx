import { ChartBarIcon, InformationCircleIcon, LightBulbIcon, PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { showModal } from "./modal";
import { PartialCitationModal } from "./partial-citations";
import { CitationInfo } from "./citation-info";
import { CardEditModal } from "../../pages/edit";

export const AdditionalActionComponents = () => {
  const showFullCitation = () => showModal("full_citation");
  const editCitation = () => showModal("edit_citation");
  const createPartialCitation = () => showModal("create_partial_citation");
  const addNewCitation = () => showModal("edit_citation");

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mt-4">
        <div className="card-actions">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={showFullCitation}
          >
            <InformationCircleIcon className="w-6" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={editCitation}
          >
            <PencilIcon className="w-6" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={addNewCitation}
          >
            <PlusCircleIcon className="w-6" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={createPartialCitation}
          >
            <LightBulbIcon className="w-6" />
          </button>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
          >
            <ChartBarIcon className="w-6" />
          </button>
        </div>
      </div>
      <div>
        <PartialCitationModal />
        <CitationInfo />
        <CardEditModal />
      </div>
    </>
  );
};


