import { Citation } from "@/models/citation";

export type Filter = {
    kind: 'book' | 'tag',
    value: string,
};

export const filtered = (citations: Citation[], filter?: Filter): Citation[] => {
    if (filter?.kind === 'book') {
        return citations.filter((citation) => citation.book === filter.value);
    }
    if (filter?.kind === 'tag') {
        return citations.filter((citation) => citation.tags.includes(filter.value));
    }
    return citations;
}