import {Citation} from "@/models/citation";

export type Filter = {
  kind: "book" | "tag" | "none" | "missing-fragment";
  value: string;
};

export const filtered = (citations: Citation[], filter: Filter): Citation[] => {
  if (filter.kind === "none" || filter.value === "none") {
    return citations;
  }
  if (filter.kind === "book" && filter.value !== "none") {
    return citations.filter((citation) => citation.book === filter.value);
  }
  if (filter.kind === "tag" && filter.value !== "none") {
    return citations.filter((citation) => citation.tags.includes(filter.value));
  }
  if (filter.kind === "missing-fragment") {
    return citations.filter((citation) => !citation.fragment);
  }
  throw new Error(`Invalid filter: ${filter}`);
};

export const hasFilterOfKind = (kind: "tag" | "book", filter: Filter) => {
  return filter?.kind === kind && filter.value !== "none";
};

export const valueOfFilter = (filter: Filter) => {
  return filter.value;
};

export const emptyFilter = (): Filter => {
  return {kind: "none", value: "none"};
};
