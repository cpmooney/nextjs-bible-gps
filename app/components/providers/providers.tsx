import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { UserPreferenceProvider } from "./user-preference-provider";
import DeckProvider from "./deck-provider";
import DrawerStateProvider from "./drawer-state-provider";
import { DbActionProvider } from "./db-actions-provider";

interface Props {
  children: ReactNode;
}
export const Providers = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <DbActionProvider>
        <UserPreferenceProvider>
          <DeckProvider>
            <DrawerStateProvider>{children}</DrawerStateProvider>
          </DeckProvider>
        </UserPreferenceProvider>
      </DbActionProvider>
    </ClerkProvider>
  );
};
