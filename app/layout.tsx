import { ReactNode } from "react";
import "../styles/globals.css";
import { Header } from "./components/header/header";
import { ExtendedMenu } from "./components/menu/extended-menu";
import { ModalCollection } from "./components/modals/modals";
import { Providers } from "./components/providers/providers";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <div className="min-h-screen w-screen bg-dark-primary">
          <Providers>
            <Header />
            {children}
            <ModalCollection />
            <ExtendedMenu />
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default Layout;
