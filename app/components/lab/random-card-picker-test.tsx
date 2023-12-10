import { useDeckStateContext } from 'src/components/providers/deck-state-provider';
import { BarGraph } from './bar-graph';
import { Citation } from 'src/models/citation';

export const RandomCardPickerTest = () => {
  const { drawCitation } = useDeckStateContext();
  const drawScores: number[] = [];
  drawScores.length = 100;
  drawScores.fill(0);

  for (let i = 0; i < 1000; i++) {
    const card: Citation = drawCitation();
    drawScores[card.score]++;
  }

  const labels = drawScores.map((_, index) => index.toString());

  return (
    <div>
      <BarGraph values={drawScores} labels={labels} />
    </div>
  );
}
  