import {ClerkProvider} from "@clerk/nextjs";
import {ReactNode} from "react";
import "../styles/globals.css";
import {ImageBackground} from "./components/image-background";
import DeckProvider from "./components/providers/deck-provider";
import UserHeaderComponent from "./components/user-header-component";

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
    <html>
      <body>
        <DeckPageWithBackground />
        <div className="ml-5 mt-5">
          <ClerkProvider>
            <DeckProvider>{children}</DeckProvider>
            <UserHeaderComponent />
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
