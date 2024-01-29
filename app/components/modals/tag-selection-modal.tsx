"use client";
import {CheckCircleIcon, NoSymbolIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {TagSelectionInModal} from "../edit/tag-selection-in-modal";
import {useModalCommunicationContext} from "../providers/modal-communication-provider";
import {Modal, closeModal} from "./modal";

export const TagSelectionModal = () => {
  const {invokeCloseModalCallback, obtainInformationAsModal} =
    useModalCommunicationContext();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags((obtainInformationAsModal() as string[] | undefined) ?? []);
  }, [obtainInformationAsModal]);

  const closeMe = () => closeModal("tag_selection");
  const updateAndClose = () => {
    invokeCloseModalCallback(tags);
    closeMe();
  };
  const removeTag = () => {
    setTags(tags.slice(0, tags.length - 1));
  };
  const addTag = (tag: string) => {
    setTags(tags.concat(tag));
  };
  return Modal({
    name: "tag_selection",
    contents: (
      <div>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tag Selection</h3>
          {tags.map((tag) => {
            return (
              <div className="flex mt-2" key={tag}>
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
          <TagSelectionInModal addTag={addTag} />
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

const inputElementId = "tag_selection_modal_new_tag";

const inputElement = (): HTMLInputElement => {
  const element = document.getElementById(inputElementId);
  if (!element || !(element instanceof HTMLInputElement)) {
    throw new Error(`Could not find input element with id ${inputElementId}`);
  }
  return element;
};
