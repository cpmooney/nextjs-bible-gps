"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { UserPreferenceProvider } from "./user-preference-provider";
import DeckProvider from "./deck-provider";
import DrawerStateProvider from "./drawer-state-provider";

interface Props {
  children: ReactNode;
}
export const Providers = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <UserPreferenceProvider>
        <DeckProvider>
          <DrawerStateProvider>{children}</DrawerStateProvider>
        </DeckProvider>
      </UserPreferenceProvider>
    </ClerkProvider>
  );
};
