import {themes} from ".";

type ThemeColorKey =
  | "primary"
  | "secondary"
  | "white"
  | "darkPrimary"
  | "lightPrimary";

export type ThemeColors = Partial<Record<ThemeColorKey, string>>;

export type ThemeColorDictionary = Record<string, ThemeColors>;

export const mapTheme = (theme: ThemeColors): Record<string, string | null> => {
  const colorMap: Record<string, string | null> = {};
  Object.entries(theme).forEach(([key, hash]) => {
    colorMap[`--color-${camelToKebab(key)}`] = hash;
  });
  return colorMap;
};

export const applyTheme = (theme: string): void => {
  const themeObject = mapTheme(themes[theme]);
  if (!themeObject) {
    throw new Error(`Theme ${theme} not found`);
  }
  const root = document.documentElement;
  Object.keys(themeObject).forEach((property) => {
    if (property !== "name") {
      root.style.setProperty(property, themeObject[property]);
    }
  });
};

export const extend = (
  theme: ThemeColors,
  extension: ThemeColors
): ThemeColors => {
  return {...theme, ...extension};
};

const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};
