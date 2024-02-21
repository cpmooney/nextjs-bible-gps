import {ScoreChange, recordScoreChange} from "@/utilities/score-recorder";
import {useDeckDataStore} from "./deck-data-store";
import {useDrawDeckStore} from "./draw-deck-store";
import {useFilterStateStore} from "./filter-state-store";

interface QuizActions {
  advanceToNextCard: () => void;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
}

export const useQuizActions = (): QuizActions => {
  const {currentCard, drawDeck, setCurrentCard, setDrawDeck} =
    useDrawDeckStore();
  const {cards} = useDeckDataStore();
  const {filter} = useFilterStateStore();

  const advanceToNextCard = () => {
    const nextCard = drawDeck.shift();
    if (nextCard) {
      setCurrentCard(nextCard);
    } else {
      setCards([]);
    }
  };

  const incrementCurrentCardScore = () => {
    if (currentCard) {
      recordScoreChange(currentCard, ScoreChange.Increment);
    }
  };

  const decrementCurrentCardScore = () => {
    if (currentCard) {
      recordScoreChange(currentCard, ScoreChange.Reset);
    }
  };

  return {
    advanceToNextCard,
    incrementCurrentCardScore,
    decrementCurrentCardScore,
  };
};
