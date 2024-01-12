"use client";

import {ReactNode} from "react";
import Only from "../utilities/only";

interface Props {
  children: ReactNode;
}

export default function ServerOnly({children}: Props) {
  return <Only mode="server">{children}</Only>;
}
