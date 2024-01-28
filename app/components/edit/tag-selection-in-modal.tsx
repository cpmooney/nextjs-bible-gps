"use client";

import { useDeckStateContext } from "../providers/deck-state-provider";
import { useModalCommunicationContext } from "../providers/modal-communication-provider";

interface Props {
  addTag: (tag: string) => void;
}

export const TagSelectionInModal = ({ addTag }: Props) => {
  const { obtainAvailableTagList } = useDeckStateContext();
  const completeOptionList = buildOptionList(obtainAvailableTagList());

  const addSelectedTag = () => {
    const value = getCurrentlySelectedValue();
    if (value !== "none") {
      addTag(value);
    }
  };

  return (
    <div>
      <select className="select select-bordered w-full max-w-xs mt-2" id="tag_selection" onChange={addSelectedTag}>
        {completeOptionList}
      </select>
    </div>
  );
};

const getCurrentlySelectedValue = (): string => {
  const selectElement = document.getElementById(
    "tag_selection"
  ) as HTMLSelectElement;
  const value = selectElement.value;
  selectElement.selectedIndex = 0;
  return value;
};

const buildOptionList = (availableTags: string[]) => {
  const availableOptionList = availableTags.map((tag) => {
    return <option key={tag} value={tag}>{tag}</option>;
  });
  return (
    <>
      <option selected value="none">None</option>{availableOptionList}
    </>
  );
};
