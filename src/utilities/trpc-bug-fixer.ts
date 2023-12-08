import { Citation } from "src/models/citation";

export const fixTrpcBug = (data: any[] | undefined): Citation[] => 
    data?.map((citation) => {
        const lastReviewed = citation.lastReviewed ?
        new Date(citation.lastReviewed) : undefined;
        return {
            ...citation,
            lastReviewed
        };
    }) ?? [];