import { Dispatch, SetStateAction, useState } from "react";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}

export const TagSelection = ({ setTags, tags }: Props) => {
  const { obtainTagList } = useDeckStateContext();
  const onAddTag = () => {
    const newTag = prompt("Enter a new tag");
    if (newTag) {
      setTags([...tags, newTag]);
    }
  }
  return (
    <div>
      <label className="label font-bold">Tags</label>
      {
        tags
        .sort()
        .map((tag) => (
          <div key={tag}>{tag}</div>
        ))}
                <button
          className="btn btn-btnPrimary h-5 w-32 ml-2 mt-2 bg-blue-400"
          onClick={onAddTag}
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
    </div>
  );
};
