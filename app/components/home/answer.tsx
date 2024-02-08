"use client";

interface CardAnswerComponentProps {
  answer: string;
  showingAnswer: boolean;
}

export default function Answer(props: CardAnswerComponentProps) {
  if (props.showingAnswer) {
    return props.answer;
  }
  return <label className="label font-bold uppercase">Show Citation</label>;
}
