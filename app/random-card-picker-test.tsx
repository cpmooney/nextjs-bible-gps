import { drawCard } from '@/utilities/card-arrays';
import { BarGraph } from './bar-graph';

export const RandomCardPickerTest = () => {
  const drawScores: number[] = [];
  drawScores.length = 100;
  drawScores.fill(0);

  for (let i = 0; i < 1000; i++) {
    const card = drawCard();
    drawScores[card.score]++;
  }

  const labels = drawScores.map((_, index) => index.toString());

  return (
    <div>
      <BarGraph values={drawScores} labels={labels} />
    </div>
  );
}
  