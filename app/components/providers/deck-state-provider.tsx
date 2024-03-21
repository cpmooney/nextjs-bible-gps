"use client";
import {
  OrderedCardsByBook,
  buildCardsByBook,
} from "@/utilities/card-by-book-builder";
import {Filter, emptyFilter, filtered} from "@/utilities/filtering";
import {useUser} from "@clerk/nextjs";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {Citation} from "src/models/citation";
import {WrappedCard, createDrawDeck, scoreCutoffs} from "src/utilities/draw-deck-builder";
import {randomInRange} from "src/utilities/misc";
import {useUserPreferenceContext} from "./user-preference-provider";
import { useDbActionContext } from "./db-actions-provider";
import { ScoreUpdate } from "src/server/actions/db-update-citation";

export interface DeckStateContext {
  obtainCurrentCard: () => Citation;
  obtainOptionalCurrentCard: () => Citation | null;
  drawCitation: () => Citation | undefined;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainAllCitations: () => Citation[];
  obtainTotalScore: () => number;
  obtainCurrentCardGroup: () => number;
  obtainCardById: (id: number) => Citation;
  updateCitation: (citation: Citation) => void;
  userHasNoCards: () => boolean;
  setCurrentCard: Dispatch<SetStateAction<Citation | null>>;
  obtainFilter: () => Filter;
  resetDeck: (filter: Filter) => void;
}

interface DeckStateProviderProps {
  children: React.ReactNode;
  citations: Citation[];
  initialBankedScore: number;
  allCards: Citation[];
}

export const useDeckStateContext = () => {
  const context = useContext(DeckStateContext);
  if (!context) {
    throw new Error(
      "useCardArrayContext must be used within a CardArrayProvider"
    );
  }
  return context;
};

export const CardArrayProvider = (props: DeckStateProviderProps) => {
  const {manualSave} = useUserPreferenceContext();
  const {isSignedIn} = useUser();
  const {invokeSaveScoreAction, queueSaveScoreAction} = useDbActionContext();
  const [totalScore, setTotalScore] = useState<number>(
    props.initialBankedScore
  );

  const drawDeck = useRef<WrappedCard[]>([]);
  const [currentCard, setCurrentCard] = useState<Citation | null>(null);
  const [currentCardGroup, setCurrentCardGroup] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>(emptyFilter());
  const [triggerDrawDeck, setTriggerDrawDeck] = useState<boolean>(false);

  const userHasNoCards = useCallback(
    () => props.allCards.length === 0,
    [props.allCards]
  );

  const guaranteeCurrentCardGroup = (): number => {
    return currentCardGroup ?? -1;
  };

  const guaranteeCurrentCard = (): Citation => {
    if (!currentCard) {
      const nextCard = drawCitation();
      if (!nextCard) {
        throw new Error("No cards to draw from");
      }
      setCurrentCard(nextCard);
    }
    return currentCard!;
  };

  const guaranteeDrawDeck = useCallback(() => {
    if (drawDeck.current.length === 0) {
      const filteredCards = filtered(props.citations, filter);
      drawDeck.current = createDrawDeck(filteredCards);
    }
  }, [props.citations, filter]);

  const drawCitation = useCallback((): Citation | undefined => {
    guaranteeDrawDeck();
    if (!userHasNoCards()) {
      const randomIndex = randomInRange(0, drawDeck.current.length - 1);
      const chosenWrappedCard = drawDeck.current.splice(randomIndex, 1)[0];
      const currentCitation = chosenWrappedCard.card as Citation;
      setCurrentCard(currentCitation);
      setCurrentCardGroup(chosenWrappedCard.group); // TODO: Groups should no longer be needed
      return currentCitation;
    }
  }, [userHasNoCards, guaranteeDrawDeck]);

  useEffect(() => {
    if (triggerDrawDeck) {
      drawCitation();
      setTriggerDrawDeck(false);
    }
  }, [triggerDrawDeck, drawCitation]);

  const resetDeck = (newFilter: Filter) => {
    setFilter(newFilter);
    drawDeck.current = [];
    setTriggerDrawDeck(true);
  };

  const recordScoreChange = (
    card: Citation,
    scoreChange: ScoreChange
  ) => {
    if (!card.id) {
      throw new Error("Card has no id");
    }
    const scoreDelta = computeScoreDelta(scoreChange, card.score);
    const scoreUpdate: ScoreUpdate = {
      id: card.id,
      score: card.score + scoreDelta,
      lastReviewed: new Date(),
    };
    if (isSignedIn) {
      if (manualSave) {
        queueSaveScoreAction(scoreUpdate);
      } else {
        invokeSaveScoreAction(scoreUpdate);
      }
      setTotalScore(() => totalScore + scoreDelta);
    } else {
      if (!card.id) {
        throw "Card has no id";
      }
    }
  };

  const incrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreChange.Increment
    );

  const decrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreChange.Decrement
    );

  const obtainCardsByBook = () => buildCardsByBook(props.allCards);
  const obtainAllCitations = () => props.allCards;
  const obtainCardById = (id: number): Citation => {
    const card = props.allCards.find((c) => c.id === id)!;
    if (!card) {
      throw new Error(`No card found with id ${id}`);
    }
    return card;
  };

  const updateCitation = (updatedCitation: Citation) => {
    const index = props.allCards.findIndex((c) => c.id === updatedCitation.id);
    if (index < 0) {
      props.allCards.push(updatedCitation);
    } else {
      props.allCards[index] = updatedCitation;
    }
  };

  return (
    <DeckStateContext.Provider
      value={{
        drawCitation,
        obtainCurrentCard: guaranteeCurrentCard,
        obtainOptionalCurrentCard: () => currentCard,
        obtainCurrentCardGroup: guaranteeCurrentCardGroup,
        incrementCurrentCardScore,
        decrementCurrentCardScore: decrementCurrentCardScore,
        obtainCardsByBook,
        obtainAllCitations,
        obtainTotalScore: () => totalScore,
        obtainCardById,
        updateCitation,
        setCurrentCard,
        userHasNoCards,
        obtainFilter: () => filter,
        resetDeck,
      }}
    >
      {props.children}
    </DeckStateContext.Provider>
  );
};

enum ScoreChange {
  Increment,
  Decrement
}

interface ScoreChangeRecord {
  id: number;
  score: number;
  lastReviewed: string;
}

const computeScoreDelta = (scoreChange: ScoreChange, score: number): number => {
  if (scoreChange === ScoreChange.Increment) {
    return 1;
  } else if (scoreChange === ScoreChange.Decrement) {
    return -Math.min(score, 10);
  }
  throw new Error(`Invalid score change: ${scoreChange}`);
}

const DeckStateContext = createContext<DeckStateContext | null>(null);
