"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { duplicateDemoCards } from "app/actions";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";
import { useRouter } from "next/navigation";

export default function LetsGo() {
  const { userHasNoCards } = useDeckStateContext();
  const router = useRouter();
  const letsGo = async () => {
    await duplicateDemoCards();
    router.push("/list");
  };
  return (
    <button
      className="flex-1 btn btn-btnPrimary enabled:bg-green-400 h-20"
      onClick={letsGo}
      disabled={!userHasNoCards()}
    >
      <CheckCircleIcon className="h-10 w-10 mr-2" />
    </button>
  );
}
