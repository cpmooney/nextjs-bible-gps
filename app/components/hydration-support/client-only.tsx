"use client";

import {ReactNode} from "react";
import Only from "../utilities/only";

interface Props {
  children: ReactNode;
}

export default function ClientOnly({children}: Props) {
  return <Only mode="client">{children}</Only>;
}
