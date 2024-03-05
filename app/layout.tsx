import {ClerkProvider} from "@clerk/nextjs";
import {ReactNode} from "react";
import "../styles/globals.css";
import {Header} from "./components/header/header";
import {InitializeOnClient} from "./components/initialize-on-client";
import {ExtendedMenu} from "./components/menu/extended-menu";
import {ModalCollection} from "./components/modals/modals";
import DataProvider from "./components/providers/data-loader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <html>
      <body>
        <div className="min-h-screen w-screen bg-dark-primary">
          <InitializeOnClient />
          <ClerkProvider>
            <DataProvider />
              <Header />
              {children}
              <ModalCollection />
              <ExtendedMenu />
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
