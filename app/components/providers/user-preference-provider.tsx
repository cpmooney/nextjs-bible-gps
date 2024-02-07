"use client";
import { ReactNode, createContext, useContext } from "react";

// TODO: Does this need to be client?

interface Props {
  children: ReactNode;
}

export type PromptPreference = "fragment" | "entire";

export interface UserPreferenceContext {
  promptDisplay: PromptPreference;
  betaFeatures: boolean;
}

export const UserPreferenceProvider = ({ children }: Props) => {
  return (
    <>
      <UserPreferenceContext.Provider
        value={{
          betaFeatures: false,
          promptDisplay: "entire",
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
  betaFeatures: true,
  promptDisplay: "entire",
});
