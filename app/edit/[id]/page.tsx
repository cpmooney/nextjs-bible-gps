"use client";
import { Citation } from "@/models/citation";
import { deletePartialCard } from "app/actions";
import CardEditForm from "app/components/edit/card-form";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";
import { useSearchParams } from "next/navigation";

interface CardEditPageParams {
  params: { id: string };
}

export default function CardEditPage({ params }: CardEditPageParams) {
  const { obtainCardById } = useDeckStateContext();

  // TODO: How do adapt this so that id is undefined when we want to create a new card?
  const id = parseInt(params.id);

  const searchParams = useSearchParams();
  const fragment = searchParams?.get("fragment");
  const fragmentId = searchParams?.get("fragment-id");

  const initialCard = id > 0 ? obtainCardById(id) : defaultInitialCard(fragment);
  const onSave = () => {
    if (fragmentId) {
      deletePartialCard(parseInt(fragmentId));
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <CardEditForm initialCard={initialCard} onSave={onSave} />
    </div>
  );
}

const defaultInitialCard = (fragment: string | null): Citation => {
  return {
    active: true,
    book: "Genesis",
    chapter: 1,
    firstVerse: 1,
    suffix: "",
    fragment: fragment ?? "",
    entire: "",
    score: 0,
    tags: [],
  };
};


