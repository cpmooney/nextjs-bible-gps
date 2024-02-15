"use client";
import {createContext, useContext, useState} from "react";

interface DrawerStateContext {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const useDrawerStateContext = () => {
  const context = useContext(DrawerStateContext);
  if (!context) {
    throw new Error(
      "useDrawerStateContext must be used within a DrawerStateProvider"
    );
  }
  return context;
};

export const DrawerStateProvider = ({children}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DrawerStateContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
    </DrawerStateContext.Provider>
  );
};

const DrawerStateContext = createContext<DrawerStateContext | null>(null);

export default DrawerStateProvider;
