"use client";

import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useDeckStateContext} from "../providers/deck-state-provider";

interface Props {
  addTag: (tag: string) => void;
}

export const TagSelectionInModal = ({addTag}: Props) => {
  const {obtainAvailableTagList} = useDeckStateContext();
  const completeOptionList = buildOptionList(obtainAvailableTagList());

  const addSelectedTag = () => {
    const value = getCurrentlySelectedValue();
    if (value !== "none") {
      addTag(value);
    }
  };

  return (
    <div>
      <select
        value="none"
        className="select select-bordered w-full mt-2 mb-2"
        id="tag_selection"
        onChange={addSelectedTag}
      >
        {completeOptionList}
      </select>
      <div className="flex mt-2 mb-2">
        <input
          id="new_tag"
          type="text"
          placeholder="New tag . . ."
          className="input input-bordered mr-2 w-full"
        />
        <button
          className="btn btn-btnPrimary bg-green-400"
          onClick={() => addTag(getNewTagInputValue())}
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const getNewTagInputValue = (): string => {
  const inputElement = document.getElementById("new_tag") as HTMLInputElement;
  const value = inputElement.value;
  inputElement.value = "";
  return value;
};

const getCurrentlySelectedValue = (): string => {
  // TODO: getElementByIds should be replaced by refs
  const selectElement = document.getElementById(
    "tag_selection"
  ) as HTMLSelectElement;
  const value = selectElement.value;
  selectElement.selectedIndex = 0;
  return value;
};

const buildOptionList = (availableTags: string[]) => {
  const availableOptionList = availableTags.map((tag) => {
    return (
      <option key={tag} value={tag}>
        {tag}
      </option>
    );
  });
  return (
    <>
      <option value="none">Choose existing</option>
      {availableOptionList}
    </>
  );
};
