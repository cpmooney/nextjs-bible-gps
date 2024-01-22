import {Citation} from "@/models/citation";

export type Filter = {
  kind: "book" | "tag";
  value: string;
};

export const filtered = (
  citations: Citation[],
  filter?: Filter
): Citation[] => {
  if (!filter || filter?.value === "none") {
    return citations;
  }
  if (filter?.kind === "book" && filter.value !== "none") {
    return citations.filter((citation) => citation.book === filter.value);
  }
  if (filter?.kind === "tag" && filter.value !== "none") {
    return citations.filter((citation) => citation.tags.includes(filter.value));
  }
  throw new Error(`Invalid filter: ${filter}`);
};
