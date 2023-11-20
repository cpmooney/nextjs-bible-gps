import { Deck } from '@/models/deck';
import { BarGraph } from './bar-graph';
import { weightedRandomNumber } from '@/utilities/weighted-random-number';

interface RandomCardPickerTestProps {
  deck: Deck;
}

export const RandomCardPickerTest = (props: RandomCardPickerTestProps) => {
  const { deck } = props;

  const labels: string[] = Array.from(new Set(deck.activeCards.map((card) => card.score)))
    .sort((a, b) => a - b)
    .map(String);
  const values: number[] = [];

  for (let i = 0; i < 100; i++) {
    values.push(weightedRandomNumber(100));
  }

  return (
    <div>
      <BarGraph labels={labels} values={values} />
    </div>
  );
}
  