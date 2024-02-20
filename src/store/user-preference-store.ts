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
  theme: string;
  setPromptDisplay: (promptDisplay: PromptPreference) => void;
  setAdvancedView: (advancedView: boolean) => void;
  setManualSave: (manualSave: boolean) => void;
  setTheme: (theme: string) => void;
}

export const useUserPreferenceStore = create<UserPreferenceStore>((set) => ({
    advancedView: false,
    manualSave: false,
    promptDisplay: "entire-citation",
    theme: "base",
    setAdvancedView: (advancedView) => set({ advancedView }),
    setManualSave: (manualSave) => set({ manualSave }),
    setPromptDisplay: (promptDisplay) => set({ promptDisplay }),
    setTheme: (theme) => set({ theme }),
}));