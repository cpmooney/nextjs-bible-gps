import { ReactNode } from "react";
import { ImageBackground } from "./components/image-background";
import DeckProvider from "./components/providers/deck-provider";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import UserHeaderComponent from "./components/user-header-component";
import '../styles/globals.css';

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
            <UserHeaderComponent />
            <SignedIn>
              <DeckProvider>{children}</DeckProvider>
            </SignedIn>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
