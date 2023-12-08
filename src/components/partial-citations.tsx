import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {Modal, closeModal} from "./modal";

export const PartialCitationModal = () => {
  const closeMe = () => closeModal("create_partial_citation");
  const saveAndClose = async () => {
    const fragment = getInputValue("create_partial_citation_fragment_input");
    if (fragment) {
      await createPartialCitationProcedure.mutateAsync({
        fragment: getInputValue("create_partial_citation_fragment_input"),
      });
    }
    closeMe();
  };
  return Modal({
    name: "create_partial_citation",
    contents: (
      <div>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            What fragment is on your mind?
          </h3>
          <input
            id="create_partial_citation_fragment_input"
            type="text"
            placeholder="Fragment"
            className="input input-bordered w-full max-w-xs"
          />
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

const getInputValue = (id: string) => {
  const inputElement = document.getElementById(id);
  if (!inputElement || !(inputElement instanceof HTMLInputElement)) {
    throw new Error(`Could not find input element with id ${id}`);
  }
  return inputElement.value;
};
