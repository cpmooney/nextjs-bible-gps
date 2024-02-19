import base from "./base";
import girlPower from "./girl-power";
import {ThemeColorDictionary} from "./utils";

export const DEFAULT_THEME: string = "base";

export const themes: ThemeColorDictionary = {
  base,
  girlPower,
};

interface Option {
  name: string;
  themeName: string;
}

const camelCaseToReadable = (str: string): string => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
};

export const ThemeOptions: Option[] = Object.keys(themes).map((themeName) => ({
  name: camelCaseToReadable(themeName),
  themeName,
}));
