"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface CardAnswerComponentProps {
    answer: string;
    showingAnswer: boolean;
}

export default async function CardAnswerComponent(props: CardAnswerComponentProps) {
    if (props.showingAnswer) {
        return props.answer;
    }
    return <QuestionMarkCircleIcon className="h-16 w-16 mr-2" />;
}