"use client"

import { Citation } from "@/models/citation";
import { buildFullCitation } from "@/utilities/additional-citation-methods";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface Props {
    citation: Citation;
}

export default function CitationDisplay({citation}: Props) {
    const router = useRouter();
    const fullCitation = buildFullCitation(citation);
    const editCard = () => {
        router.push(`/edit/${citation.id}`);
    };
    
    return <div>
    <div className="h-5 w-64 btn btn-btnPrimary bg-green-400 ml-2 mt-2">
        {fullCitation}
    </div>
    <div className="h-5 w-64 btn btn-btnPrimary bg-green-400 ml-2 mt-2">
        {citation.fragment}
    </div>
    <button
        className="h-5 flex-auto btn btn-btnPrimary bg-green-400 ml-2 mt-2"
        onClick={editCard}
    >
        <PencilIcon className="h-5 w-5" />
    </button>
    </div>;
}