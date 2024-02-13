"use client";

import {duplicateDemoCards} from "app/actions";
import {ActionButton} from "app/components/action-button";
import {useDeckStateContext} from "app/components/providers/deck-state-provider";
import {useRouter} from "next/navigation";

export default function LetsGo() {
  const {userHasNoCards} = useDeckStateContext();
  const router = useRouter();
  const letsGo = async () => {
    await duplicateDemoCards();
    router.push("/list");
  };
  return userHasNoCards() ? (
    <ActionButton title="Let's Go!" onClick={letsGo} />
  ) : null;
}
