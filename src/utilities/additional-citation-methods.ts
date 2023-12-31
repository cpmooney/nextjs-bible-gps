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
    `https://www.biblegateway.com/passage/?search=${encodeURIComponent(buildFullCitation(citation))}&version=NKJV`;