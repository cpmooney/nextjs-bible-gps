"use client";
import {Citation} from "@/models/citation";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {BibleSelection} from "../components/edit/bible-selection";
import {FragmentEntry} from "../components/edit/fragment-entry";
import {NumberSelection} from "../components/edit/number-selection";
import {SuffixEntry} from "../components/edit/suffix-entry";
import {TextArea} from "../components/edit/text-area";
import {closeModal} from "../components/modal";
import {buildFullCitation} from "src/utilities/additional-citation-methods";

export default function CardEditPage() {
  const [citation, setCitation] = useState<Citation | null>(null);
  const [fullCitation, setFullCitation] = useState<string>("");
  const [book, setBook] = useState<string>("Genesis");
  const [chapter, setChapter] = useState<number>(1);
  const [firstVerse, setFirstVerse] = useState<number>(1);
  const [suffix, setSuffix] = useState<string>("");
  const [fragment, setFragment] = useState<string>("");
  const [entire, setEntire] = useState<string>("");

  const updatedCitation = useEffect(() => {
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

  //  const updateCitationProcedure = trpc.updateCitationRequest.useMutation();

  const closeMe = () => closeModal("edit_citation");
  const saveAndClose = async () => {
    //    await updateCitationProcedure.mutateAsync(updatedCitation());
    closeMe();
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
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
      </div>
    </div>
  );
}
