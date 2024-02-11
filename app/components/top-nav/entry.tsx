"use client";
import Link from "next/link";

interface Props {
  title: string;
  url?: string;
}

export function Entry({ title, url }: Props) {
  return (
    <li>
      <LinkElement url={url}>
        <div className="mt-1 uppercase">
          {title}
        </div>
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
