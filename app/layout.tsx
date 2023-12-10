import {ClerkProvider, UserButton} from "@clerk/nextjs";
import {ReactNode} from "react";
import {ImageBackground} from "./components/image-background";
import DeckProvider from "./components/providers/deck-provider";

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

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <DeckPageWithBackground />
      <div className="ml-5 mt-5">
        <ClerkProvider>
          <div className="mb-2">
            <div className="btn">
              <UserButton />
            </div>
          </div>
          <DeckProvider>{children}</DeckProvider>
        </ClerkProvider>
      </div>
    </>
  );
};

export default Layout;
