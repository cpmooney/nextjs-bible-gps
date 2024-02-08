import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "../styles/globals.css";
import { ModalCollection } from "./components/modals/modals";
import DeckProvider from "./components/providers/deck-provider";
import { UserPreferenceProvider } from "./components/providers/user-preference-provider";
import { TopNavBar } from "./components/top-nav/top-nav-bar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <div className="w-full bg-gray-200">
          <ClerkProvider>
            <UserPreferenceProvider>
              <TopNavBar />
              <DeckProvider>
                {children}
                <ModalCollection />
              </DeckProvider>
            </UserPreferenceProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
