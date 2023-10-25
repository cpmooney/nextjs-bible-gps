import {Card} from "@/types/card";

export default function CardComponent(card: Card) {
  return (
    <>
      <div>Question: {card.question}</div>
      <div>
        Answers:
        {card.answers.map((answer, index) => {
          return <div key={index}>{answer}</div>;
        })}
      </div>
    </>
  );
}
