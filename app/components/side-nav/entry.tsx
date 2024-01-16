"use client";
import Link from "next/link";
import { showModal } from "../modals/modal";

interface Props {
  children: React.ReactNode;
  title: string;
  url?: string;
  modal?: string;
}

export function Entry({ children, title, url, modal}: Props) {
  const onClick = () => {
    // TODO: There must be a more react-y way to accomplish this
    const drawerInput = document.getElementById(
      "my-drawer"
    ) as HTMLInputElement; if (!drawerInput) {
      throw new Error("drawerInput is null");
    }
    drawerInput.checked = false;
    if (modal) {
      showModal(modal);
    }
  };

  return (
    <li onClick={onClick}>
      <LinkElement url={url}>
        {children}
        {title}
      </LinkElement>
    </li>
  );
}

interface LinkElementProps {
  url?: string;
  children: React.ReactNode;
}

const LinkElement = ({ children, url }: LinkElementProps) => {
  if (url) {
    return <Link href={url}>{children}</Link>;
  }
  return <>{children}</>;
};
