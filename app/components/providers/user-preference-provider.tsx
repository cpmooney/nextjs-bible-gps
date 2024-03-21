"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

const DefaultPromptPreferenceChoice = "entire-citation";
const PromptPreferenceChoices = ["citation-fragment", "citation-entire", "entire-citation", "fragment-citation"] as const;

export type PromptPreference = typeof PromptPreferenceChoices[number];

export interface UserPreferenceContext {
  promptDisplay: PromptPreference;
  advancedView: boolean
  manualSave: boolean;
  setPromptDisplay: (prompt: PromptPreference) => void;
  setAdvancedView: (advancedView: boolean) => void;
  setManualSave: (manualSave: boolean) => void;
}

export const UserPreferenceProvider = ({ children }: Props) => {
  const [promptDisplay, setPromptDisplay] = useState<PromptPreference>(DefaultPromptPreferenceChoice);
  const [advancedView, setAdvancedView] = useState<boolean>(false);
  const [manualSave, setManualSave] = useState<boolean>(false);
  return (
    <>
      <UserPreferenceContext.Provider
        value={{
          promptDisplay,
          manualSave,
          advancedView,
          setPromptDisplay,
          setAdvancedView,
          setManualSave
        }}
      >
        {children}
      </UserPreferenceContext.Provider>
    </>
  );
};

export const useUserPreferenceContext = () => {
  const context = useContext(UserPreferenceContext);
  if (!context) {
    throw new Error(
      "useUserPreferenceContext must be used within a UserPreferenceProvider"
    );
  }
  return context;
}

const UserPreferenceContext = createContext<UserPreferenceContext>({
  promptDisplay: "entire-citation",
  manualSave: false,
  advancedView: false,
  setPromptDisplay: () => {},
  setAdvancedView: () => {},
  setManualSave: () => {}
});
