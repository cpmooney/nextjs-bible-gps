"use client";

import {duplicateDemoCards} from "app/actions";
import {ActionButton} from "app/components/action-button";
import {useRouter} from "next/navigation";
import { useDeckDataStore } from "src/store/deck-data-store";

export default function LetsGo() {
  const {userHasNoCards} = useDeckDataStore();
  const router = useRouter();
  const letsGo = async () => {
    await duplicateDemoCards();
    router.push("/list");
  };
  return userHasNoCards() ? (
    <ActionButton title="Let's Go!" onClick={letsGo} />
  ) : null;
}
