"use client";

import {ReactNode} from "react";
import Only from "./only";

interface Props {
  children: ReactNode;
}

export default function ClientOnly({children}: Props) {
  return <Only mode="client">{children}</Only>;
}
