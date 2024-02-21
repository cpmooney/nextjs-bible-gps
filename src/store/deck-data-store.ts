import {Citation} from "@/models/citation";
import {buildCardsByBook} from "@/utilities/card-by-book-builder";
import {Filter, filtered} from "@/utilities/filtering";
import {create} from "zustand";

interface DeckDataStore {
  cards: Citation[];
  setCards: (cards: Citation[]) => void;
}

export const useDeckDataStore = create<DeckDataStore>((set) => ({
  cards: [],
  setCards: (cards) => set({cards}),
}));

interface Getters {
  currentCard: () => Citation | null;
  guaranteedCurrentCard: () => Citation;
  cardsByBook: () => Record<string, Citation[]>;
  allCitations: () => Citation[];
  filteredCitations: () => Citation[];
  totalScore: () => number;
  cardById: (id: number) => Citation;
  userHasNoCards: () => boolean;
  filter: () => Filter;
}

export const useDeckDataGetters = (): Getters => {
  const {cards, currentCard} = useDeckDataStore();

  const guaranteedCurrentCard = () => {
    if (!currentCard) {
      throw new Error("No current card");
    }
    return currentCard;
  };
  const cardsByBook = () => buildCardsByBook(cards);
  const allCitations = () => cards;
  const filteredCitations = () => filtered(cards);
  const totalScore = () => computeTotalScore(cards);
  const cardById = (id: number) => cards.find((card) => card.id === id);
  const userHasNoCards = () => cards.length === 0;
  const filter = () => cards.filter;

  return {
    currentCard,
    guaranteedCurrentCard,
    cardsByBook,
    allCitations,
    filteredCitations,
    totalScore,
    cardById,
    userHasNoCards,
    filter,
  };
};

interface QuizActions {
  advanceToNextCard: () => void;
  incrementCurrentCardScore: () => void;
  decrementCurrentCardScore: () => void;
}

interface EditActions {
  updateCitation: (updatedCitation: Citation) => void;
}

interface FilterActions {
  setFilter: (filter: Filter) => void;
}

interface NavigationActions {
  resetDeck: () => void;
}
function computeTotalScore(
  cards: {
    fragment: string;
    book: string;
    chapter: number;
    firstVerse: number;
    suffix: string;
    tags: string[];
    entire: string;
    active: boolean;
    score: number;
    id?: number | undefined;
    lastReviewed?: Date | undefined;
  }[]
) {
  throw new Error("Function not implemented.");
}
