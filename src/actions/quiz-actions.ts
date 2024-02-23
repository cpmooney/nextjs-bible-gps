import {ScoreChange, recordScoreChange} from "@/utilities/score-recorder";
import {useDrawDeckStore} from "../store/draw-deck-store";
import {useFilterStateStore} from "../store/filter-state-store";
import { useDataStore } from "src/store/data-store";

interface QuizActions {
  advanceToNextCard: () => void;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
}

export const useQuizActions = (): QuizActions => {
  const {currentCard, drawDeck, setCurrentCard, setDrawDeck} =
    useDrawDeckStore();
  const {cards} = useDataStore();
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
