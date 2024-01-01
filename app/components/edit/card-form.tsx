"use client";
import { Citation } from "@/models/citation";
import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { buildFullCitation } from "src/utilities/additional-citation-methods";
import { BibleSelection } from "./bible-selection";
import { FragmentEntry } from "./fragment-entry";
import { NumberSelection } from "./number-selection";
import { SuffixEntry } from "./suffix-entry";
import { TextArea } from "./text-area";
import { saveCitation } from "app/actions";
import { useRouter } from "next/navigation";

interface CardEditFormProps {
  initialCard: Citation;
  onSave?: () => void;
}

export default function CardEditForm({ initialCard, onSave }: CardEditFormProps) {
  const [book, setBook] = useState<string>(initialCard.book);
  const [chapter, setChapter] = useState<number>(initialCard.chapter);
  const [firstVerse, setFirstVerse] = useState<number>(initialCard.firstVerse);
  const [suffix, setSuffix] = useState<string>(initialCard.suffix);
  const [fragment, setFragment] = useState<string>(initialCard.fragment);
  const [entire, setEntire] = useState<string>(initialCard.entire);

  const router = useRouter();

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
      score: 0,
      tags: [],
      id
    };
  }, [book, chapter, firstVerse, suffix, fragment, entire, initialCard.id]);

  const fullCitation = useMemo(() => {
    return buildFullCitation({ book, chapter, firstVerse, suffix });
  }, [book, chapter, firstVerse, suffix]);

  const closeMe = () => {
    router.push("/");
  };

  const saveAndClose = async () => {
    saveCitation(citation);
    if (onSave) {
      onSave();
    }
    closeMe();
  };

  return (
    <>
      <div className="card-body">
        <div className="w-full">
          <label className="label font-bold">Citation</label>
        </div>
        <div className="flex space-x-2">
          <BibleSelection setBook={setBook} initialBook={initialCard.book} />
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
        <label className="label font-italics">{fullCitation}</label>
        <FragmentEntry
          setString={setFragment}
          initialValue={initialCard.fragment}
        />
        <TextArea setString={setEntire} initialValue={initialCard.entire} />
        <div className="card-actions">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2 bg-green-400"
            onClick={saveAndClose}
          >
            <CheckCircleIcon className="h-8 w-8" />
          </button>
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2 bg-red-400"
            onClick={closeMe}
          >
            <NoSymbolIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </>
  );
}
