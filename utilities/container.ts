import {Container} from "inversify";

const container = new Container();

type typeName = "chapter-titles" | "random-number-generator";

interface ThingDefaults {
  [typeName: string]: unknown;
}

const defaults: ThingDefaults = {
  "chapter-titles": [],
  "random-number-generator": Math.random,
};

export const provide = (typeName: typeName, thing: unknown): void => {
  container.bind(typeName).toConstantValue(thing);
};

export const obtain = <T>(typeName: string): any => {
  if (container.isBound(typeName)) {
    return container.get<T>(typeName);
  }
  return defaults[typeName]; // TODO Figure out if inversify can handle defaults natively
};
