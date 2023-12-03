import { Modal, closeModal } from "./modal";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { trpc } from "@/utilities/trpc";
import { Citation } from "@/models/citation";

export const CardEditModal = () => {
  const updatedCitation = (): Citation => { return {
    id: 378,
    active: true,
    book: "Romans",
    chapter: 1,
    firstVerse: 1,
    suffix: "-2",
    fragment: "Toaster wosters",
    score: 0,
    tags: [],
    entire: "Entire blah blah blah",
  }};

  const updateCitationProcedure =
    trpc.updateCitationRequest.useMutation();

  const closeMe = () => closeModal("edit_citation");
  const saveAndClose = async () => {
    await updateCitationProcedure.mutateAsync(updatedCitation());
    closeMe();
  };

  return Modal({
    name: "edit_citation",
    contents: (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          Go
        </div>
        <div className="modal-action">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={saveAndClose}
          >
            <CheckCircleIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    ),
  });
};
