import { Citation } from "@/models/citation";
import { TSV } from "tsv";

export const deserialize = (tsv: string): Citation[] =>
    TSV.parse(tsv).map(citation => decodeCitation(citation));

export const serialize = (deck: Citation[]): string => 
    TSV.stringify(deck.map(citation => encodeCitation(citation)));

const encodeCitation = (citation: Citation) => ({
    ...citation,
    entire: encodeNewLines(citation.entire)
});

const decodeCitation = (citation: Citation) => ({
    ...citation,
    entire: decodeNewLines(citation.entire)
});

const encodeNewLines = (str: string) => str.replace(/\n/g, "%");

const decodeNewLines = (str: string) => str.replace(/%/g, "\n");
