import {Citation} from "@/models/citation";
import {create} from "zustand";

interface DeckDataStore {
  cards: Citation[];
  setCards: (cards: Citation[]) => void;
  userHasNoCards: () => boolean;
}

export const useDeckDataStore = create<DeckDataStore>((set, get) => ({
  cards: [],
  setCards: (cards) => set({cards}),
  userHasNoCards: () => get().cards.length === 0,
}));

interface EditActions {
  updateCitation: (updatedCitation: Citation) => void;
}
