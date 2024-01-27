"use client";
import { CheckCircleIcon, NoSymbolIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Modal, closeModal } from "./modal";
import { useModalCommunicationContext } from "../providers/modal-communication-provider";
import { useState } from "react";

export const TagSelectionModal = () => {
  const [tags, setTags] = useState<string[]>([]);
  const { invokeCloseModalCallback } = useModalCommunicationContext();
  const closeMe = () => closeModal("tag_selection");
  const updateAndClose = () => {
    invokeCloseModalCallback(tags);
    closeMe();
  };
  const removeTag = () => {
    setTags(tags.slice(0, tags.length - 1));
  };
  const addTag = () => {
    setTags(tags.concat(getInputValue("tag_selection_modal_new_tag")));
  };
  return Modal({
    name: "tag_selection",
    contents: (
      <div>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tag Selection</h3>
          {tags.map((tag) => {
            return (
              <div className="flex">
                <button className="flex-auto btn btn-btnPrimary bg-green-400">
                  {tag}
                </button>
                <button
                  className="flex-none btn btn-btnPrimary bg-red-400 ml-2"
                  onClick={removeTag}
                >
                  <NoSymbolIcon className="w-6 h-6" />
                </button>
              </div>
            );
          })}
          <input id="tag_selection_modal_new_tag" className="input input-bordered" placeholder="Tag . . ." />
          <button
            className="flex-none btn btn-btnPrimary bg-green-400 ml-2"
            onClick={addTag}
          >
            <PlusCircleIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={updateAndClose}
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

