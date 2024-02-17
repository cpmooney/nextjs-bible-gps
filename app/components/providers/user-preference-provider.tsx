"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

export type PromptPreference =
  | "entire-citation"
  | "citation-entire"
  | "fragment-citation"
  | "citation-fragment";

export interface UserPreferenceContext {
  obtainPromptDisplay: () => PromptPreference;
  obtainAdvancedView: () => boolean;
  obtainManualSave: () => boolean;
  setPromptDisplay: (value: PromptPreference) => void;
  setAdvancedView: (value: boolean) => void;
  setManualSave: (value: boolean) => void;
}

export const UserPreferenceProvider = ({ children }: Props) => {
  const [promptDisplay, setPromptDisplay] =
    useState<PromptPreference>("entire-citation");
  const [advancedView, setAdvancedView] = useState<boolean>(false);
  const [manualSave, setManualSave] = useState<boolean>(false);

  return (
    <>
      <UserPreferenceContext.Provider
        value={{
          obtainAdvancedView: () => advancedView,
          obtainPromptDisplay: () => promptDisplay,
          obtainManualSave: () => manualSave,
          setAdvancedView,
          setPromptDisplay,
          setManualSave,
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
};

const UserPreferenceContext = createContext<UserPreferenceContext>({
  obtainAdvancedView: () => {
    throw new Error("obtainAdvancedView not implemented");
  },
  obtainPromptDisplay: () => {
    throw new Error("obtainPromptDisplay not implemented");
  },
  obtainManualSave: () => {
    throw new Error("obtainManualSave not implemented");
  },
  setPromptDisplay: (_promptPreference: PromptPreference) => {
    throw new Error("setAdvancedView not implemented");
  },
  setAdvancedView: (_value: boolean) => {
    throw new Error("setAdvancedView not implemented");
  },
  setManualSave: (_value: boolean) => {
    throw new Error("setManualSave not implemented");
  },
});
