"use client";
import {SignedIn} from "@clerk/nextjs";
import {updateTagsOnCitation} from "app/actions";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {showModal} from "../modals/modal";
import {useDeckStateContext} from "../providers/deck-state-provider";
import {useModalCommunicationContext} from "../providers/modal-communication-provider";

interface Props {
  setTags?: Dispatch<SetStateAction<string[]>>;
  tags?: string[];
}

export const TagSelectionOnForm = ({setTags, tags}: Props) => {
  const {obtainCurrentCard, updateCitationLocally} = useDeckStateContext();
  const {initializeModal} = useModalCommunicationContext();
  const onAddTag = () => {
    initializeModal({
      data: currentTags,
      callback: (data) => {
        if (currentCitationId) {
          updateCitationLocally({
            id: currentCitationId,
            changes: {tags: data as string[]},
          });
        }
        updateTagsOnServer(data as string[], currentCitationId, setTags);
      },
    });
    showModal("tag_selection");
  };

  // TODO: These were originally useMemos but that was being run from the server.  Why?
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [currentCitationId, setCurrentCitationId] = useState<
    number | undefined
  >();

  useEffect(() => {
    const currentCard = obtainCurrentCard();
    setCurrentTags(tags ?? currentCard.tags);
    setCurrentCitationId(currentCard.id);
  }, [obtainCurrentCard, tags]);

  return (
    <SignedIn>
      <div onClick={onAddTag}>{currentTagListComponent(tags)}</div>
    </SignedIn>
  );
};

const currentTagList = (tags: string[]): string[] => {
  if (tags.length === 0) {
    return ["None"];
  }
  return tags.sort();
};

export const currentTagListComponent = (tags?: string[]) =>
  currentTagList(tags ?? []).map((tag) => (
    <div key={tag} className="badge badge-lg badge-outline h-5 w-32 ml-2 mt-2">
      {tag}
    </div>
  ));

const updateTagsOnServer = (
  data: string[],
  citationId?: number,
  setTags?: Dispatch<SetStateAction<string[]>>
) => {
  if (setTags) {
    setTags(data);
  } else {
    if (!citationId) {
      throw new Error(
        "citationId is required by defaultSetTags when setTags is not provided"
      );
    }
    updateTagsOnCitation(citationId, data);
  }
};
