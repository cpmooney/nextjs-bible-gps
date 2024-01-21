import { Citation } from "@/models/citation";

export interface Filter {
    book?: string;
    tag?: string;
}

export const filtered = (citations: Citation[], filter?: Filter): Citation[] => {
    const { book, tag } = filter || {};
    if (book) {
        return citations.filter((citation) => citation.book === book);
    }
    if (tag) {
        return citations.filter((citation) => citation.tags.includes(tag));
    }
    return citations;
}