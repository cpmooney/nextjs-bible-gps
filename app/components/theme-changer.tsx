"use client";

import {useEffect, useState} from "react";
import {DEFAULT_THEME, ThemeOptions} from "src/themes";
import {applyTheme} from "src/themes/utils";

export const ThemeChanger = () => {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  return (
    <select
      value={currentTheme}
      onChange={handleThemeChange}
      className="absolute top-0 right-0 p-2 m-4 bg-white rounded-md"
    >
      {ThemeOptions.map(({name, themeName}) => (
        <option key={themeName} value={themeName}>
          {name}
        </option>
      ))}
    </select>
  );
};
