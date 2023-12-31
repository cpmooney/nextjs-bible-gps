"use client";
import { Citation } from "@/models/citation";
import CardEditForm from "app/components/edit/card-form";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";

interface CardEditPageParams {
  params: { id: string };
}

export default function CardEditPage({ params }: CardEditPageParams) {
  const { obtainCardById } = useDeckStateContext();

  // TODO: How do adapt this so that id is undefined when we want to create a new card?
  const id = parseInt(params.id);
  const initialCard = id > 0 ? obtainCardById(id) : defaultInitialCard();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <CardEditForm initialCard={initialCard} />
    </div>
  );
}

const defaultInitialCard = (): Citation => {
  return {
    active: true,
    book: "Genesis",
    chapter: 1,
    firstVerse: 1,
    suffix: "",
    fragment: "",
    entire: "",
    score: 0,
    tags: [],
  };
};


