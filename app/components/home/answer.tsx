"use client";

import Label from "../label";

interface CardAnswerComponentProps {
  answer: string;
  showingAnswer: boolean;
}

export default function Answer(props: CardAnswerComponentProps) {
  if (props.showingAnswer) {
    return <Label title={props.answer} />;
  }
  return <Label title="Click To See Answer" />;
}
