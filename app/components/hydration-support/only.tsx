"use client";

import {ReactNode, useEffect, useState} from "react";

interface Props {
  mode: "server" | "client";
  children: ReactNode;
}

export default function Only({children, mode}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shouldUseChildren = mode === "client" ? isClient : !isClient;
  return shouldUseChildren ? children : null;
}
