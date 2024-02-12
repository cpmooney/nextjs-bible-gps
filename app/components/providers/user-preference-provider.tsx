"use client";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode;
}

export type PromptPreference = "key-words" | "entire";

export interface UserPreferenceContext {
  promptDisplay: PromptPreference;
  advancedView: boolean
  manualSave: boolean;
}

export const UserPreferenceProvider = ({ children }: Props) => {
  return (
    <>
      <UserPreferenceContext.Provider
        value={{
          promptDisplay: "entire",
          manualSave: false,
          advancedView: false
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
  promptDisplay: "entire",
  manualSave: false,
  advancedView: false
});
