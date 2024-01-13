"use client";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  title: string;
  url: string;
}

export function Entry({ children, title, url }: Props) {
    const onClick = () => {
        // TODO: There must be a more react-y way to accomplish this
        const drawerInput = document.getElementById("my-drawer") as HTMLInputElement;
        if (!drawerInput) {
            throw new Error("drawerInput is null");
        }
        drawerInput.checked = false;
    }

  return (
    <li onClick={onClick}>
      <Link href={url}>
        {children}
        {title}
      </Link>
    </li>
  );
}
