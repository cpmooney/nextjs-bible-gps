"use client";
import { Citation } from "@/models/citation";
import {
  CheckCircleIcon,
  NoSymbolIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteCard, saveCitation } from "app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { buildFullCitation } from "src/utilities/additional-citation-methods";
import { useDeckStateContext } from "../providers/deck-state-provider";
import { BibleSelection } from "./bible-selection";
import { FragmentEntry } from "./fragment-entry";
import { NumberSelection } from "./number-selection";
import { SuffixEntry } from "./suffix-entry";
import { TextArea } from "./text-area";
import Label from "../label";

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
      <div className="m-4 p-4 bg-white shadow-xl">
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
      <div className="m-4 p-4 bg-white shadow-xl">
        <TextArea setString={setEntire} initialValue={initialCard.entire} />
      </div>
      <div className="m-4 p-4 bg-white shadow-xl flex">
        <button
          className="ml-2 mr-2 mt-2 mb-2 flex-1"
          onClick={saveAndClose}
        >
          <Label title="Save" />
        </button>
        <button className=" ml-2 mr-2 mt-2 mb-2 flex-1" onClick={cancelMe}>
          <Label title="Cancel" />
        </button>
        {citation.id && (
          <button
            className="h-8 ml-2 mt-2 flex-1"
            onClick={deleteThisCard}
          >
            <Label title="Delete" />
          </button>
        )}
      </div>
      <div className="m-4 p-4 bg-white shadow-xl">
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
