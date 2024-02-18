import {ClerkProvider} from "@clerk/nextjs";
import {ReactNode} from "react";
import "../styles/globals.css";
import {Header} from "./components/header/header";
import {ExtendedMenu} from "./components/menu/extended-menu";
import {ModalCollection} from "./components/modals/modals";
import DeckProvider from "./components/providers/deck-provider";
import DrawerStateProvider from "./components/providers/drawer-state-provider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <html>
      <body>
        <div className="min-h-screen w-screen bg-dark-gray-1">
          <ClerkProvider>
              <DeckProvider>
                <DrawerStateProvider>
                  <Header />
                  {children}
                  <ModalCollection />
                  <ExtendedMenu />
                </DrawerStateProvider>
              </DeckProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
