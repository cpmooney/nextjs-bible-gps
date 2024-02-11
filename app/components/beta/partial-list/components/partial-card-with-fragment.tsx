"use client";

import { NoSymbolIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { deletePartialCard, guaranteeUserId } from "app/actions";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  fragment: string;
  afterDeleteHandler: () => void;
}

export default function PartialCardWithFragment({
  id,
  fragment,
  afterDeleteHandler,
}: Props) {
  const router = useRouter();

  const editUrl = (): string => {
    return `/edit/0?fragment=${fragment.toLowerCase()}&fragment-id=${id}`;
  };

  const editCard = () => {
    router.push(editUrl());
  };

  const deleteCard = async () => {
    await deletePartialCard(id);
    afterDeleteHandler();
  };

  return (
    <div className="flex">
      <button
        className="flex-auto  bg-green-400"
        onClick={editCard}
      >
        {fragment}
      </button>
      <button
        className="flex-none  bg-red-400 ml-2"
        onClick={deleteCard}
      >
        <NoSymbolIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
