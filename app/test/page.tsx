"use client";
import { createDrawDeck } from "@/utilities/draw-deck-builder";
import { BarGraph } from "app/components/lab/bar-graph";

export default function TestPage() {
  return <div>
    <Graph granularity={1} />
    <Graph granularity={5} />
    <Graph granularity={20} />
  </div>;
}

const max = 200;

interface Card {
    score: number;
}

const sampleCards: Card[] = Array.from({ length: max }, (_, i) => ({ score: i })); 
export const sampleDeck = createDrawDeck(sampleCards);

export const scoreCounts = (deck: Card[]) => {
    const counts = Array.from({ length: max }, () => 0);
    deck.forEach(({ score }) => {
        counts[score]++;
    });
    return counts;
}

const coarseCounts = (deck: Card[], granularity: number) => {
  const counts = Array.from({ length: max / granularity }, () => 0);
  deck.forEach(({ score }) => {
    counts[Math.floor(score / granularity)]++;
  });
  return counts;
}

const Graph = ({ granularity }: GraphProps) => {
  const granularCounts = coarseCounts(sampleDeck, granularity);
  const labels = Array.from({ length: granularCounts.length }, (_, i) => (i * granularity).toString());
  return (
      <div className="card w-auto bg-base-100 shadow-xl mb-3">
        <div className="card-body">
          <BarGraph labels={labels} values={granularCounts} />
        </div>
      </div>
  );
}

interface GraphProps {
  granularity: number;
}
