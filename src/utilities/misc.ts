export const randomInRange = (min: number, max: number): number => {
  if (min > max)  {
    throw new Error(`min ${min} must be less than or equal to max ${max}`);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toKebabCase = (str: string) => {
  return str.toLowerCase().split(" ").join("-");
};
