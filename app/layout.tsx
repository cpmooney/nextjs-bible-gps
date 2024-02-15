import {ClerkProvider} from "@clerk/nextjs";
import {ReactNode} from "react";
import "../styles/globals.css";
import {Header} from "./components/header/header";
import {ExtendedMenu} from "./components/menu/extended-menu";
import {ModalCollection} from "./components/modals/modals";
import DeckProvider from "./components/providers/deck-provider";
import DrawerStateProvider from "./components/providers/drawer-state-provider";
import {UserPreferenceProvider} from "./components/providers/user-preference-provider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <html>
      <body>
        <div className="min-h-screen w-screen bg-dark-gray-1">
          <ClerkProvider>
            <UserPreferenceProvider>
              <DeckProvider>
                <DrawerStateProvider>
                  <Header />
                  {children}
                  <ModalCollection />
                  <ExtendedMenu />
                </DrawerStateProvider>
              </DeckProvider>
            </UserPreferenceProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
