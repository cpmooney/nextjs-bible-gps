import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "../styles/globals.css";
import { Header } from "./components/header/header";
import { ExtendedMenu } from "./components/menu/extended-menu";
import { ModalCollection } from "./components/modals/modals";
import DeckProvider from "./components/providers/deck-provider";
import { InitializeOnClient } from "./components/initialize-on-client";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <div className="min-h-screen w-screen bg-dark-primary">
          <InitializeOnClient />
          <ClerkProvider>
            <DeckProvider>
              <Header />
              {children}
              <ModalCollection />
              <ExtendedMenu />
            </DeckProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
