"use client"
import { scoreCounts } from "@/utilities/sample-deck";
import { BarGraph } from "app/components/lab/bar-graph";

export default function TestPage() {
    const counts = scoreCounts()
        .map((count) => count);
    const labels = Array.from({ length: counts.length}, (_, i) => i.toString());
    return <BarGraph labels={labels} values={counts} />;
}
