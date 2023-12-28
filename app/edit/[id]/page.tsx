import {Citation} from "@/models/citation";
import CardEditForm from "app/components/edit/card-form";

interface CardEditPageParams {
  params: { id: string; }
}

export default function CardEditPage({ params }: CardEditPageParams) {
  const id = parseInt(params.id);

  const obtainInitialCard = (cardId?: number): Citation => {
    if (cardId) {
      return obtainCardById(cardId);
    } else {
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
    }
  }
  
  const initialCard = obtainInitialCard(cardId);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <CardEditForm initialCard={initialCard} />
    </div>
  );
}
