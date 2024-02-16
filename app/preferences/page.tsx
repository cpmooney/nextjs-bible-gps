"use client";
import Label from "app/components/label";
import {useDeckStateContext} from "app/components/providers/deck-state-provider";
import {useUserPreferenceContext} from "app/components/providers/user-preference-provider";
import Link from "next/link";
import {useMemo} from "react";

export default function Preferences() {
  const {
    obtainAdvancedView,
    obtainPromptDisplay,
    obtainManualSave,
    setAdvancedView,
    setPromptDisplay,
    setManualSave,
  } = useUserPreferenceContext();
  const {obtainAllCitations} = useDeckStateContext();
  const promptDisplay = useMemo(
    () => obtainPromptDisplay(),
    [obtainPromptDisplay]
  );
  const citationsWithoutFragmentsCount = useMemo(() => {
    if (
      promptDisplay === "citation-fragment" ||
      promptDisplay === "fragment-citation"
    ) {
      return obtainAllCitations().filter((citation) => !citation.fragment)
        .length;
    }
    return 0;
  }, [obtainAllCitations, promptDisplay]);

  return (
    <>
      <div className="bg-off-white-1 mt-1 p-4">
        <Label title="Preferences" />
        <div className="mt-2">
          Advanced view:{" "}
          <input
            type="checkbox"
            checked={obtainAdvancedView()}
            onChange={(e) => setAdvancedView(e.target.checked)}
          />
          Manual save:{" "}
          <input
            type="checkbox"
            checked={obtainManualSave()}
            onChange={(e) => setManualSave(e.target.checked)}
          />
          Prompt type:{" "}
          <select
            value={obtainPromptDisplay()}
            onChange={(e) => setPromptDisplay(e.target.value as any)}
          >
            <option value="entire-citation">Entire citation</option>
            <option value="citation-entire">Citation entire</option>
            <option value="fragment-citation">Fragment citation</option>
            <option value="citation-fragment">Citation fragment</option>
          </select>
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
