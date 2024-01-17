"use client";
import Link from "next/link";
import { showModal } from "../modals/modal";
import { FunctionComponent } from "react";

interface IconProps {
  // TODO: Why does string | null not work here?
  className?: any;
}

interface Props {
  title: string;
  url?: string;
  modal?: string;
  Icon: FunctionComponent<IconProps>;
}

export function Entry({ title, url, modal, Icon }: Props) {
  const onClick = () => {
    // TODO: There must be a more react-y way to accomplish this
    const drawerInput = document.getElementById(
      "my-drawer"
    ) as HTMLInputElement; if (!drawerInput) {
      throw new Error("drawerInput is null");
    }
    drawerInput.checked = false;
    if (modal) {
      window.postMessage({ name: modal, action: "show" }, "*");
      showModal(modal);
    }
  };

  return (
    <li onClick={onClick}>
      <LinkElement url={url}>
        <Icon className="w-6" />
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
  return <div>{children}</div>;
};
