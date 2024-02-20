"use client";

import { useEffect } from "react";
import { DEFAULT_THEME } from "src/themes";
import { applyTheme } from "src/themes/utils";

export const InitializeOnClient = () => {
  useEffect(() => {
    applyTheme(DEFAULT_THEME);
  }, []);
  return <></>
};
