import { Card } from "@/models/card";
import { Modal, closeModal } from "./modal";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { trpc } from "@/utilities/trpc";

interface CardEditProps {
  card: Card | undefined;
}

export const CardEditModal = (props: CardEditProps) => {
  const initialCard: Card = props.card || Card.empty;

  const [fragment, setFragment] = useState(initialCard.fragment);
  const [book, setBook] = useState(initialCard.book);
  const [chapter, setChapter] = useState(initialCard.chapter);
  const [firstVerse, setFirstVerse] = useState(initialCard.firstVerse);
  const [suffix, setSuffix] = useState(initialCard.suffix);
  const [entire, setEntire] = useState(initialCard.entire);

  const updatedCitation = () => { return {
    id: initialCard.id,
    fragment,
    book,
    chapter,
    firstVerse,
    suffix,
    entire,
  }};

  const updateCitationProcedure =
    trpc.editCitationProcedure.useMutation();

  const closeMe = () => closeModal("edit_citation");
  const saveAndClose = async () => {
    await updateCitationProcedure.mutateAsync(updatedCitation());
    closeMe();
  };

  return Modal({
    name: "edit_citation",
    contents: (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <input
              type="text"
              placeholder="Fragment"
              className="input input-bordered w-full max-w-xs"
              value={fragment}
              onChange={(event) => setFragment(event.target.value)}
            />
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
    ),
  });
};
