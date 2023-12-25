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
const sampleDeck = createDrawDeck(sampleCards);

const coarseCounts = (deck: Card[], granularity: number) => {
  const counts = Array.from({ length: max / granularity }, () => 0);
  deck.forEach(({ score }) => {
    counts[Math.floor(score / granularity)]++;
  });
  return counts;
}

const Graph = ({ granularity }: GraphProps) => {
  const sampleDeckAsCards = sampleDeck.map((wrappedCard) => wrappedCard.card);
  const granularCounts = coarseCounts(sampleDeckAsCards, granularity);
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
