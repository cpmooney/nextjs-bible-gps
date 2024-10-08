"use client";
import Label from "app/components/label";
import { ThemeChanger } from "app/components/theme-changer";
import Link from "next/link";
import {useMemo} from "react";
import { useDeckDataStore } from "src/store/deck-data-store";
import { useUserPreferenceStore } from "src/store/user-preference-store";

export default function Preferences() {
  const {
    advancedView,
    promptDisplay,
    manualSave,
    setAdvancedView,
    setPromptDisplay,
    setManualSave,
  } = useUserPreferenceStore();
  const {cards} = useDeckDataStore();
  const citationsWithoutFragmentsCount = useMemo(() => {
    if (
      promptDisplay === "citation-fragment" ||
      promptDisplay === "fragment-citation"
    ) {
      return cards.filter((citation) => !citation.fragment)
        .length;
    }
    return 0;
  }, [cards, promptDisplay]);

  return (
    <>
      <div className="bg-light-primary mt-1 p-4">
        <Label title="Preferences" />
        <div className="mt-2">
          Advanced view:{" "}
          <input
            type="checkbox"
            checked={advancedView}
            onChange={(e) => setAdvancedView(e.target.checked)}
          />
          Manual save:{" "}
          <input
            type="checkbox"
            checked={manualSave}
            onChange={(e) => setManualSave(e.target.checked)}
          />
          Prompt type:{" "}
          <select
            value={promptDisplay}
            onChange={(e) => setPromptDisplay(e.target.value as any)}
          >
            <option value="entire-citation">Entire citation</option>
            <option value="citation-entire">Citation entire</option>
            <option value="fragment-citation">Fragment citation</option>
            <option value="citation-fragment">Citation fragment</option>
          </select>
          Theme:{" "}
          <ThemeChanger />
        </div>
      </div>
      <div
        className={`bg-off-white-1 mt-1 p-4 ${
          citationsWithoutFragmentsCount > 0 ? null : "hidden"
        }`}
      >
        <Label title="Citations Missing Fragments" />
        <div>
          You have {citationsWithoutFragmentsCount} citations missing fragments.
          These will not show up until you add a fragment to them.
        </div>
        <div className="mt-6 ml-6">
          <Link href="/list?filter=missingFragments">
            <Label title="Let's Fix Them!" />
          </Link>
        </div>
      </div>
    </>
  );
}