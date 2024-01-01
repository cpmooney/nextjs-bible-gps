import { Citation } from "src/models/citation";

interface BuildFullCitationParams {
    book: string;
    chapter: number;
    firstVerse: number;
    suffix: string;
}

export const buildFullCitation = (params: BuildFullCitationParams): string => 
    `${params.book} ${params.chapter}:${params.firstVerse}${params.suffix}`;

export const buildExternalUrl = (citation: Citation): string =>
    `https://www.biblegateway.com/nkjv/?search=${encodeURIComponent(buildFullCitation(citation))}&version=NKJV`;

export const searchByFragmentUrl = (fragment: string): string =>
    `https://www.bing.com/search?q=nkjv+${encodeURIComponent(fragment)}`;
