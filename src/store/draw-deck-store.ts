import {Citation} from "@/models/citation";
import {create} from "zustand";

interface DrawDeckStore {
  drawDeck: Citation[];
  currentCard: Citation | null;
  setDrawDeck: (drawDeck: Citation[]) => void;
  setCurrentCard: (card: Citation | null) => void;
}

export const useDrawDeckStore = create<DrawDeckStore>((set) => ({
  drawDeck: [],
  currentCard: null,
  setDrawDeck: (drawDeck) => set({drawDeck}),
  setCurrentCard: (currentCard) => set({currentCard}),
}));

export const useGuaranteedCurrentCard = () => {
  const {currentCard} = useDrawDeckStore();
  if (!currentCard) {
    throw new Error("No current card");
  }
  return currentCard;
};
