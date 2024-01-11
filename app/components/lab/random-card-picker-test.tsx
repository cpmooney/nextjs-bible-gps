import {useDeckStateContext} from "../providers/deck-state-provider";
import {BarGraph} from "./bar-graph";

export const RandomCardPickerTest = () => {
  const {drawCitation} = useDeckStateContext();
  const drawScores: number[] = [];
  drawScores.length = 100;
  drawScores.fill(0);

  for (let i = 0; i < 1000; i++) {
    const card = drawCitation();
    if (!card) {
      throw new Error("No cards");
    }
    drawScores[card.score]++;
  }

  const labels = drawScores.map((_, index) => index.toString());

  return (
    <div>
      <BarGraph values={drawScores} labels={labels} />
    </div>
  );
};
