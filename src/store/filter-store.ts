import { Filter, emptyFilter } from "@/utilities/filtering";
import { create } from "zustand";

interface FilterStateStore {
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

export const useFilterStore = create<FilterStateStore>((set) => ({
    filter: emptyFilter(),
    setFilter: (filter) => set({filter}),
}));
