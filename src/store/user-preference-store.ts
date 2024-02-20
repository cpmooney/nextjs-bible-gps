import { create } from 'zustand';

export const PromptPreferenceOptions = [
  "entire-citation",
  "citation-entire",
  "fragment-citation",
  "citation-fragment"
];

export type PromptPreference = typeof PromptPreferenceOptions[number];

interface UserPreferenceStore {
  promptDisplay: PromptPreference;
  advancedView: boolean
  manualSave: boolean;
  setPromptDisplay: (promptDisplay: PromptPreference) => void;
  setAdvancedView: (advancedView: boolean) => void;
  setManualSave: (manualSave: boolean) => void;
}

export const useUserPreferenceStore = create<UserPreferenceStore>((set) => ({
    advancedView: false,
    manualSave: false,
    promptDisplay: "entire-citation",
    setAdvancedView: (advancedView) => set({ advancedView }),
    setManualSave: (manualSave) => set({ manualSave }),
    setPromptDisplay: (promptDisplay) => set({ promptDisplay })
}));