"use client";

import {importAllCards} from "app/actions";
import {Modal, closeModal} from "../modal";

interface Props {
  content: string;
}

export default function ExportImportModal({content}: Props) {
  const closeMe = () => closeModal("export_import");
  const saveAndClose = async () => {
    const updatedContent = getInputValue("export_import_content_input");
    importAllCards(updatedContent);
    closeMe();
  };
  return Modal({
    name: "export_import",
    contents: (
      <div>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Copy and paste</h3>
          <textarea
            id="export_import_content_input"
            className="textarea h-32 textarea-bordered w-full max-w-xs"
            defaultValue={content}
          ></textarea>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={saveAndClose}
          >
            Import
          </button>
        </div>
      </div>
    ),
  });
}

const getInputValue = (id: string) => {
  const inputElement = document.getElementById(id);
  if (!inputElement || !(inputElement instanceof HTMLInputElement)) {
    throw new Error(`Could not find input element with id ${id}`);
  }
  return inputElement.value;
};
