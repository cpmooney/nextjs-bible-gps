"use client"

import { Citation } from "@/models/citation";
import { buildFullCitation } from "@/utilities/additional-citation-methods";

interface Props {
    citation: Citation;
}

export default function CitationDisplay({citation}: Props) {
    const fullCitation = buildFullCitation(citation);
    return <div>{fullCitation}</div>
}