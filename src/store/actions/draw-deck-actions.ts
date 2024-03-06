import {Citation} from "@/models/citation";
import {createDrawDeck} from "@/utilities/draw-deck-builder";
import {ScoreChange, recordScoreChange} from "@/utilities/score-recorder";
import {useMemo} from "react";
import {useDeckDataStore} from "../deck-data-store";
import {useDrawDeckStore} from "../draw-deck-store";
import {useFilteredCitations} from "../filter-state-store";

export const useGuaranteedCurrentCard = () => {
  const {currentCard} = useDrawDeckStore();
  if (!currentCard) {
    throw new Error("No current card");
  }
  return currentCard;
};

interface DrawDeckActions {
  advanceToNextCard: () => void;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
  guaranteedCurrentCard: () => Citation;
  optionalCurrentCard: () => Citation | null;
  rebuildDrawDeck: () => void;
  totalScore: number;
}

export const useDrawDeckActions = (): DrawDeckActions => {
  const {currentCard, drawDeck, setCurrentCard, setDrawDeck} =
    useDrawDeckStore();
  const {cards} = useDeckDataStore();
  const filteredCitations = useFilteredCitations();

  const rebuildDrawDeck = () => {
    setDrawDeck(createDrawDeck(filteredCitations) as Citation[]);
  };

  const guaranteeDrawDeck = () => {
    if (drawDeck.length === 0) {
      rebuildDrawDeck();
    }
    if (drawDeck.length === 0) {
      throw new Error("No cards");
    }
  };

  const guaranteedNextCard = () => {
    if (drawDeck.length === 0) {
      guaranteeDrawDeck();
    }
    return drawDeck[0];
  };

  const advanceToNextCard = () => {
    setCurrentCard(guaranteedNextCard());
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

  const guaranteedCurrentCard = () => {
    if (!currentCard) {
      guaranteedNextCard();
    }
    if (!currentCard) {
      throw new Error("No current card");
    }
    return currentCard;
  };

  const totalScore = useMemo(
    () => cards.reduce((total, card) => total + card.score, 0),
    [cards]
  );

  return {
    advanceToNextCard,
    incrementCurrentCardScore,
    decrementCurrentCardScore,
    totalScore,
    guaranteedCurrentCard,
    rebuildDrawDeck,
    optionalCurrentCard: () => currentCard,
  };
};
