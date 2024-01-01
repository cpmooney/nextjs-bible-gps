"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  fragment: string;
}

export default function PartialCitationElement({ id, fragment }: Props) {
  const router = useRouter();
  const editCard = () => {
    router.push(editUrl(fragment, id));
  };
  return (
    <button
      className="flex-1 btn btn-btnPrimary enabled:bg-green-400"
      onClick={editCard}
    >
      {fragment}
    </button>
  );
}

const editUrl = (fragment: string, id: number): string => {
  return `/edit/0?fragment=${fragment}&fragment-id=${id}`;
}
