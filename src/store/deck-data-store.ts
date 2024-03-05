import { Citation } from "@/models/citation";
import { ScoreUpdate } from "src/server/actions/db-update-citation";
import { create } from "zustand";

interface DeckDataStore {
  cards: Citation[];
  totalScore: () => number;
  initialize: (cards: Citation[]) => void;
  userHasNoCards: () => boolean;
  update: (card: Citation) => void;
  delete: (id: number) => void;
  updateScore: (args: ScoreUpdate) => void;
  guaranteedById: (id: number) => Citation;
}

const defaults: DeckDataStore = {
  cards: [],
  totalScore: () => 0,
  initialize: () => {},
  userHasNoCards: () => true,
  update: () => {},
  delete: () => {},
  updateScore: () => {},
  guaranteedById: () => {
    throw new Error("Card not found");
  },
};

export const useDeckDataStore = create((set, get: () => DeckDataStore) => {
  const values = () => get() ?? defaults;
  return {
    cards: values().cards,
    initialize: (cards) => {
      set((state) => ({
        ...state,
        cards,
      }));
    },
    userHasNoCards: () => {
      return values().cards.length === 0;
    },
    update: (card) => {
      if (!card.id) {
        throw new Error(
          "Attempted to add new card which has not yet been added to the db"
        );
      }
      set((state) => {
        const index = state.cards.findIndex((c) => c.id === card.id);
        if (index === -1) {
          state.cards.push(card);
          return state;
        }
        state.cards[index] = card;
        return state;
      });
    },
    delete: (id) => {
      set((state) => {
        const index = state.cards.findIndex((c) => c.id === id);
        if (index === -1) {
          return state; // Return the state as is if the card is not found
        }
        state.cards.splice(index, 1);
        return state; // Return the updated state
      });
    },
    updateScore: (args) => {
      const { id, score, lastReviewed } = args;
      set((state) => {
        const index = state.cards.findIndex((c) => c.id === id);
        if (index === -1) {
          throw new Error(`Card with id ${id} not found`);
        }
        state.cards[index].score = score;
        state.cards[index].lastReviewed = lastReviewed;
        return state; // Return the updated state
      });
    },
    guaranteedById: (id) => {
      const foundCard = values().cards.find((c) => c.id === id);
      if (!foundCard) {
        throw new Error(`Card with id ${id} not found`);
      }
      return foundCard;
    },
    totalScore: () => {
      // TODO: How do we make this more efficient?  We should be able to just add the delta upon updateScore
      return values().cards.reduce((acc, c) => acc + c.score, 0);
    },
  };
});
