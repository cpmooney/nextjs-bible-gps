import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "../styles/globals.css";
import { ImageBackground } from "./components/image-background";
import DeckProvider from "./components/providers/deck-provider";
import { SideNav } from "./components/side-nav/side-nav";

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
            <SideNav />
            <DeckProvider>{children}</DeckProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
