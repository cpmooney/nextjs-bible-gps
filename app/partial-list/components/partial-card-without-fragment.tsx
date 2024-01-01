"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ParitalCardWithoutFragment() {
  const router = useRouter();

  const editCard = () => {
    router.push('/edit/0');
  };

  return (
    <div className="flex">
      <button
        className="flex-auto btn btn-btnPrimary bg-green-400"
        onClick={editCard}
      >
        <PlusCircleIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
