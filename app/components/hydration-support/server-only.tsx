"use client";

import {ReactNode} from "react";
import Only from "./only";

interface Props {
  children: ReactNode;
}

export default function ServerOnly({children}: Props) {
  return <Only mode="server">{children}</Only>;
}
