"use client";
import Link from "next/link";
import { showModal } from "../modals/modal";

interface Props {
  title: string;
  url?: string;
  modal?: string;
}

export function Entry({ title, url, modal }: Props) {
  const onClick = () => {
    // TODO: There must be a more react-y way to accomplish this
    if (modal) {
      window.postMessage({ name: modal, action: "show" }, "*");
      showModal(modal);
    }
  };

  return (
    <li onClick={onClick}>
      <LinkElement url={url}>
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
