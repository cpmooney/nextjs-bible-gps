"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface CardContentComponentProps {
    answer: string;
    showingAnswer: boolean;
}

export default function CardContentComponent(props: CardContentComponentProps) {
    if (props.showingAnswer) {
        return props.answer;
    }
    return <QuestionMarkCircleIcon className="h-16 w-16 mr-2" />;
}