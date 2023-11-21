import { dumpCardArrays } from '@/utilities/card-arrays';

export const RandomCardPickerTest = () => {
  const allCards = dumpCardArrays();

  return (
    <div>
    {allCards.intro.map((card) => 
      `${card.id} ${card.score} ${card.fragment} ${card.fullCitation}`
    )}
    </div>
  );
}
  