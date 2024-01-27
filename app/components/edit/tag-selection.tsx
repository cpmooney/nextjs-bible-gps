import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { showModal } from "../modals/modal";
import { useModalCommunicationContext } from "../providers/modal-communication-provider";

interface Props {
  setTags: Dispatch<SetStateAction<string[]>>;
  tags?: string[];
}

export const TagSelection = ({ setTags, tags }: Props) => {
  const { declareCloseModalCallback } = useModalCommunicationContext();
  const onAddTag = useCallback(() => {
    showModal("tag_selection");
  }, [tags]);

  // TODO: Might need a useEffect with a dependency here, particularly
  // if other modals start using this.
  useEffect(() => {
    declareCloseModalCallback((data) => setTags(data as string[])), [];
  });

  return (
    <div onClick={onAddTag}>
      <label className="label font-bold">Tags</label>
      {currentTagListComponent(tags)}
    </div>
  );
};

const currentTagList = (tags: string[]): string[] => {
  if (tags.length === 0) {
    return ["None"];
  }
  return tags.sort();
};

const currentTagListComponent = (tags?: string[]) =>
  currentTagList(tags ?? []).map((tag) => (
    <div className="badge badge-lg badge-outline h-5 w-32 ml-2 mt-2">{tag}</div>
  ));
