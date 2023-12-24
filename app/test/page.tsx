"use client";
import { scoreCounts } from "@/utilities/sample-deck";
import { BarGraph } from "app/components/lab/bar-graph";

export default function TestPage() {
  const counts = scoreCounts().map((count) => count);
  const labels = Array.from({ length: counts.length }, (_, i) => i.toString());
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <BarGraph labels={labels} values={counts} />;
      </div>
    </div>
  );
}
