"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface CardStateContext {
  showingAnswer: boolean;
  showAnswer: () => void;
  hideAnswer: () => void;
}

export const CardStateProvider = ({ children }: Props) => {
  const [showingAnswer, setShowingAnswer] = useState(false);
  return (
    <>
      <CardStateContext.Provider
        value={{
          showingAnswer: false,
          hideAnswer: () => {
            console.log('hideAnswer');
            setShowingAnswer(false);
          },
          showAnswer: () => {
            console.log('showAnswer');
            setShowingAnswer(true);
          }
        }}
      >
        {children}
      </CardStateContext.Provider>
    </>
  );
};

export const useCardStateContext = () => {
  const context = useContext(CardStateContext);
  if (!context) {
    throw new Error(
      "useCardStateContext must be used within a CardStateProvider"
    );
  }
  return context;
}

const CardStateContext = createContext<CardStateContext>({
  showingAnswer: false,
  hideAnswer: () => {
    throw new Error("hideAnswer called too early");
  },
  showAnswer: () => {
    throw new Error("showAnswer called too early");
  },
});
