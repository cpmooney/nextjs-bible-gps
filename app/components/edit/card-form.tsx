"use client";
import { Citation } from "@/models/citation";
import { deleteCard, saveCitation } from "app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { buildFullCitation } from "src/utilities/additional-citation-methods";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { BibleSelection } from "./bible-selection";
import { NumberSelection } from "./number-selection";
import { SuffixEntry } from "./suffix-entry";
import { TextArea } from "./text-area";
import Label from "../label";
import { ActionButton } from "../action-button";
import { FragmentEntry } from "./fragment-entry";

interface CardEditFormProps {
  initialCard: Citation;
  onSave?: () => void;
}

export default function CardEditForm({
  initialCard,
  onSave,
}: CardEditFormProps) {
  const searchParams = useSearchParams();
  const initialBook = searchParams?.get("book") ?? initialCard.book;

  const { updateCitation } = useDeckStateContext();
  const [book, setBook] = useState<string>(initialBook);
  const [chapter, setChapter] = useState<number>(initialCard.chapter);
  const [firstVerse, setFirstVerse] = useState<number>(initialCard.firstVerse);
  const [suffix, setSuffix] = useState<string>(initialCard.suffix);
  const [fragment, setFragment] = useState<string>(initialCard.fragment);
  const [entire, setEntire] = useState<string>(initialCard.entire);

  const router = useRouter();
  const score = initialCard?.score;

  const citation = useMemo(() => {
    const id = initialCard.id == 0 ? undefined : initialCard.id;
    return {
      active: true,
      book,
      chapter,
      firstVerse,
      suffix,
      fragment,
      entire,
      score,
      tags: [],
      id,
    };
  }, [
    book,
    chapter,
    firstVerse,
    suffix,
    fragment,
    entire,
    initialCard.id,
    score,
  ]);

  const fullCitation = useMemo(() => {
    return buildFullCitation({ book, chapter, firstVerse, suffix });
  }, [book, chapter, firstVerse, suffix]);

  const cancelMe = () => {
    router.back();
  };

  const deleteThisCard = () => {
    if (!citation.id) {
      throw new Error("Cannot delete a card without an id");
    }
    deleteCard(citation.id);
  };

  const saveAndClose = async () => {
    citation.id = await saveCitation(citation);
    updateCitation(citation);
    if (onSave) {
      onSave();
    }
    router.push(`/list?id=${citation.id}`);
  };

  return (
    <>
      <div className="mt-1 p-4 bg-light-primary">
        <Label title="Citation" />
        <div className="flex space-x-2">
          <BibleSelection setBook={setBook} initialBook={initialBook} />
          <NumberSelection
            setNumber={setChapter}
            initialValue={initialCard.chapter}
          />
          <NumberSelection
            setNumber={setFirstVerse}
            initialValue={initialCard.firstVerse}
          />
          <SuffixEntry
            setString={setSuffix}
            initialValue={initialCard.suffix}
          />
        </div>
      </div>
      <div className="mt-1 p-4 bg-light-primary">
        <FragmentEntry setString={setFragment} initialValue={initialCard.fragment} />
      </div>
      <div className="mt-1 p-4 bg-light-primary">
        <TextArea setString={setEntire} initialValue={initialCard.entire} />
      </div>
      <div className="mt-1 p-4 bg-light-primary flex">
        <ActionButton title="Save" onClick={saveAndClose} />
        <ActionButton title="Cancel" onClick={cancelMe} />
        {citation.id && (
          <ActionButton title="Delete" onClick={deleteThisCard} />
        )}
      </div>
      <div className="mt-1 p-4 bg-light-primary flex">
        {citation.id && (
          <div className="flex ml-auto">
            <div className="w-16 mr-2 mt-2 mb-2">id {citation.id}</div>
            <div className="w-16 mr-2 mt-2 mb-2">score {score}</div>
          </div>
        )}
      </div>
    </>
  );
}
