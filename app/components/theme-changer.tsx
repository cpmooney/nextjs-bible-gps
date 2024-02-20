"use client";

import {useEffect} from "react";
import { useUserPreferenceStore } from "src/store/user-preference-store";
import {ThemeOptions} from "src/themes";
import {applyTheme} from "src/themes/utils";

export const ThemeChanger = () => {
  const {theme, setTheme} = useUserPreferenceStore();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <select
      value={theme}
      onChange={handleThemeChange}
    >
      {ThemeOptions.map(({name, themeName}) => (
        <option key={themeName} value={themeName}>
          {name}
        </option>
      ))}
    </select>
  );
};
