"use client";
import {
  OrderedCardsByBook,
  buildCardsByBook,
} from "@/utilities/card-by-book-builder";
import { Filter, emptyFilter, filtered } from "@/utilities/filtering";
import * as ScoreRecorder from "@/utilities/score-recorder";
import { saveChangedCards } from "app/actions";
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
import { Citation } from "src/models/citation";
import { WrappedCard, createDrawDeck } from "src/utilities/draw-deck-builder";
import { randomInRange } from "src/utilities/misc";
import { useUserPreferenceContext } from "./user-preference-provider";
import { useUser } from "@clerk/nextjs";

export interface DeckStateContext {
  obtainCurrentCard: () => Citation;
  drawCitation: () => Citation | undefined;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
  syncScoresToDb: () => Promise<void>;
  obtainCardsByBook: () => OrderedCardsByBook;
  obtainAllCitations: () => Citation[];
  obtainUnbankedScore: () => number;
  obtainBankedScore: () => number;
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
  const { manualSave } = useUserPreferenceContext();
  const { isSignedIn } = useUser();
  const [unbankedScore, setUnbankedScore] = useState<number>(0);
  const [bankedScore, setBankedScore] = useState<number>(
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

  const guaranteeCurrentCard = (): Citation => {
    if (!currentCard) {
      // TODO This seems like a bug of some kind!
      const nextCard = drawCitation();
    }
    return currentCard!;
  };

  const guaranteeCurrentCardGroup = (): number => {
    return currentCardGroup ?? -1;
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

  const syncScoresToDb = async (): Promise<void> => {
    setBankedScore(bankedScore + unbankedScore);
    setUnbankedScore(0);
    saveChangedCards(ScoreRecorder.obtainChangedScoreRequest());
  };

  const resetDeck = (newFilter: Filter) => {
    setFilter(newFilter);
    drawDeck.current = [];
    setTriggerDrawDeck(true);
  };

  const recordScoreChange = (
    card: Citation,
    scoreChange: ScoreRecorder.ScoreChange,
    setUnbankedScore: Dispatch<SetStateAction<number>>
  ) => {
    const scoreChangeRecord = ScoreRecorder.recordScoreChange(card, scoreChange, setUnbankedScore);
    if (isSignedIn && !manualSave) {
      saveChangedCards([scoreChangeRecord]);
    } else {
      // TODO: Implement caching.  cardsWithChangedScores should be moved here.
    }
  };

  const incrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreRecorder.ScoreChange.Increment,
      setUnbankedScore
    );

  const decrementCurrentCardScore = (): void =>
    recordScoreChange(
      guaranteeCurrentCard(),
      ScoreRecorder.ScoreChange.Reset,
      setUnbankedScore
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
        obtainCurrentCardGroup: guaranteeCurrentCardGroup,
        incrementCurrentCardScore,
        decrementCurrentCardScore: decrementCurrentCardScore,
        syncScoresToDb,
        obtainCardsByBook,
        obtainAllCitations,
        obtainUnbankedScore: () => unbankedScore,
        obtainBankedScore: () => bankedScore,
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

const DeckStateContext = createContext<DeckStateContext | null>(null);
