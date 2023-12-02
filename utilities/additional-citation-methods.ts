import { Citation } from "@/models/citation";

export const buildFullCitation = (citation: Citation): string => 
    `${citation.book} ${citation.chapter}:${citation.firstVerse}${citation.suffix}`;

export const buildExternalUrl = (citation: Citation): string =>
    `https://www.biblegateway.com/passage/?search=${encodeURIComponent(buildFullCitation(citation))}&version=NKJV`;