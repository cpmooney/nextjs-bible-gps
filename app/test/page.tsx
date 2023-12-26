"use client";
import { createDrawDeck } from "@/utilities/draw-deck-builder";
import { BarGraph } from "app/components/lab/bar-graph";
import { useDeckStateContext } from "app/components/providers/deck-state-provider";

export default function TestPage() {
  const { obtainAllCitations } = useDeckStateContext();
  const drawDeck = createDrawDeck(obtainAllCitations())
    .map((wrappedCard) => {
      return { score: wrappedCard.card.score, group: wrappedCard.group };
    })
    .sort((a, b) => a.score - b.score);
  return (
    <div>
      <div className="card w-auto bg-base-100 shadow-xl mb-3">
        <div className="card-body"></div>
        <div className="card w-auto bg-base-100 shadow-xl mb-3">
          <table className="table-auto">
            <thead>
              <tr>
                <th>Score</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {drawDeck.map(({ score, group }) => {
                return (
                  <tr>
                    <td>{score}</td>
                    <td>{group}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Graph granularity={1} />
    </div>
  );
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
