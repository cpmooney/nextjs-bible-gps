import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "../styles/globals.css";
import { ImageBackground } from "./components/image-background";
import { ModalCollection } from "./components/modals/modals";
import DeckProvider from "./components/providers/deck-provider";
import { SideNav } from "./components/nav/side-nav";
import { UserPreferenceProvider } from "./components/providers/user-preference-provider";
import { TopNav } from "./components/nav/top-nav";

const DeckPageWithBackground = () => {
  return (
    <div>
      <ImageBackground />
    </div>
  );
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <DeckPageWithBackground />
        <div className="ml-5 mt-5">
          <ClerkProvider>
            <UserPreferenceProvider>
              <TopNav />
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
