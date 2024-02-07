"use client";

interface CardAnswerComponentProps {
  answer: string;
  showingAnswer: boolean;
}

export default function CardAnswerComponent(props: CardAnswerComponentProps) {
  if (props.showingAnswer) {
    return props.answer;
  }
  return <label className="label font-bold">SHOW CITATION</label>;
}
