"use client";
import { Citation } from "@/models/citation";
import { useEffect } from "react";
import { useDeckDataStore } from "src/store/deck-data-store";
import { PromptPreference, useUserPreferenceStore } from "src/store/user-preference-store";

interface Props {
  cards: Citation[];
  promptDisplay: PromptPreference;
  advancedView: boolean;
  manualSave: boolean;
  theme: string;
}

export const DataInitializer = (props: Props) => {
  const deckDataStore = useDeckDataStore();
  const userPreferenceStore = useUserPreferenceStore();

  useEffect(() => {
    deckDataStore.initialize(props.cards);
    userPreferenceStore.initialize(props);
  }, [])
  return null;
};
