import { Citation} from "@/models/citation";
import { ScoreUpdate } from "src/server/actions/db-update-citation";
import {create} from "zustand";
import { immer } from "zustand/middleware/immer";

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

export const useDeckDataStore = create(
  immer<DeckDataStore>((set, get) => ({
    cards: get().cards,
    initialize: (cards) => {
      set((state: DeckDataStore) => {
        state.cards = cards;
      });
    },
    userHasNoCards: () => {
      return get().cards.length === 0;
    },
    update: (card) => {
      if (!card.id) {
        throw new Error('Attempted to add new card which has not yet been added to the db');
      }
      set((state: DeckDataStore) => {
        const index = state.cards.findIndex((c) => c.id === card.id);
        if (index === -1) {
          state.cards.push(card);
          return;
        }
        state.cards[index] = card;
      });
    },
    delete: (id) => {
      set((state: DeckDataStore) => {
        const index = state.cards.findIndex((c) => c.id === id);
        if (index === -1) {
          return;
        }
        state.cards.splice(index, 1);
      });
    },
    updateScore: (args) => {
      const { id, score, lastReviewed } = args;
      set((state: DeckDataStore) => {
        const index = state.cards.findIndex((c) => c.id === id);
        if (index === -1) {
          throw new Error(`Card with id ${id} not found`);
        }
        state.cards[index].score = score;
        state.cards[index].lastReviewed = lastReviewed;
      });
    },
    guaranteedById: (id) => {
      const foundCard = get().cards.find((c) => c.id === id);
      if (!foundCard) {
        throw new Error(`Card with id ${id} not found`);
      }
      return foundCard;
    },
    totalScore: () => {
      // TODO: How do we make this more efficient?  We should be able to just add the delta upon updateScore
      return get().cards.reduce((acc, c) => acc + c.score, 0);
    }
})));
