"use client";
import { BarGraph } from "app/components/lab/bar-graph";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";

export default function TestPage() {
  return <Graph granularity={1} />
}

const max = 200;

interface Card {
  score: number;
}

const coarseCounts = (deck: Card[], granularity: number) => {
  const counts = Array.from({ length: max / granularity }, () => 0);
  deck.forEach(({ score }) => {
    counts[Math.floor(score / granularity)]++;
  });
  return counts;
};

const Graph = ({ granularity }: GraphProps) => {
  const { obtainAllCitations } = useDeckStateContext();
  const counts = coarseCounts(obtainAllCitations(), granularity);
  const labels = Array.from({ length: counts.length }, (_, i) =>
    (i * granularity).toString()
  );
  return (
    <div className="card w-auto bg-base-100 shadow-xl mb-3">
      <div className="card-body">
        <BarGraph labels={labels} values={counts} />
      </div>
    </div>
  );
};

interface GraphProps {
  granularity: number;
}
