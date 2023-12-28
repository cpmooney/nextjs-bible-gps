"use client";
import { Citation } from "@/models/citation";
import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
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
}

export default function CardEditForm({ initialCard }: CardEditFormProps) {
  const [citation, setCitation] = useState<Citation>(initialCard);
  const [book, setBook] = useState<string>(initialCard.book);
  const [chapter, setChapter] = useState<number>(initialCard.chapter);
  const [firstVerse, setFirstVerse] = useState<number>(initialCard.firstVerse);
  const [suffix, setSuffix] = useState<string>(initialCard.suffix);
  const [fragment, setFragment] = useState<string>(initialCard.fragment);
  const [entire, setEntire] = useState<string>(initialCard.entire);
  const [fullCitation, setFullCitation] = useState<string>(
    buildFullCitation(initialCard)
  );

  const router = useRouter();

  useEffect(() => {
    const newCitation = {
      active: true,
      book,
      chapter,
      firstVerse,
      suffix,
      fragment,
      entire,
      score: 0,
      tags: [],
    };
    setCitation(newCitation);
    setFullCitation(buildFullCitation(newCitation));
  }, [book, chapter, firstVerse, suffix, fragment, entire]);

  const closeMe = () => {
    router.push("/");
  };

  const saveAndClose = async () => {
    saveCitation(citation);
    closeMe();
  };

  return (
    <>
      <div className="card-body">
        <div className="w-full">
          <label className="label font-bold">Citation</label>
        </div>
        <div className="flex space-x-2">
          <BibleSelection setBook={setBook} />
          <NumberSelection setNumber={setChapter} />
          <NumberSelection setNumber={setFirstVerse} />
          <SuffixEntry setString={setSuffix} />
        </div>
        <FragmentEntry setString={setFragment} />
        <TextArea setString={setEntire} />
      </div>
      <div className="modal-action">
        <button
          className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
          onClick={saveAndClose}
        >
          <CheckCircleIcon className="h-8 w-8" />
        </button>
        <button
          className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
          onClick={closeMe}
        >
          <NoSymbolIcon className="h-8 w-8" />
        </button>
      </div>
    </>
  );
}
