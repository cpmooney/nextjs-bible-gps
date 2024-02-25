"use client";
import { Citation } from "@/models/citation";
import CardEditForm from "app/components/edit/card-form";
import { useSearchParams } from "next/navigation";
import { useDeckDataStore } from "src/store/deck-data-store";

interface CardEditPageParams {
  params: { id: string };
}

export default function CardEditPage({ params }: CardEditPageParams) {
  const { guaranteedById } = useDeckDataStore();

  // TODO: How do adapt this so that id is undefined when we want to create a new card?
  const id = parseInt(params.id);
  const searchParams = useSearchParams();
  const fragment = searchParams?.get("fragment");
  const initialCard = id > 0 ? guaranteedById(id) : defaultInitialCard(fragment);

  return (
    <>
      <CardEditForm initialCard={initialCard} />
    </>
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


