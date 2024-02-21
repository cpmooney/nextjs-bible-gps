import {Filter, emptyFilter, filtered} from "@/utilities/filtering";
import {create} from "zustand";
import {useDeckDataStore} from "./deck-data-store";

interface FilterStateStore {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useFilterStateStore = create<FilterStateStore>((set) => ({
  filter: emptyFilter(),
  setFilter: (filter) => set({filter}),
}));

export const useFilteredCitations = () => {
  const {filter} = useFilterStateStore();
  const {cards} = useDeckDataStore();
  return filtered(cards, filter);
};
