import {Deck} from "@/models/deck";
import {useState} from "react";
import CardComponent from "./card-component";
import "../app/globals.css";

export const DeckComponent = (props: DeckComponentProps) => {
  const {deck} = props;

  const [currentCard, setCurrentCard] = useState(deck.currentCard);
  const advanceToNextCard = () => {
    setCurrentCard(deck.nextCard());
  };

  const [showAnswer, setShowAnswer] = useState(false);
  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const correct = () => {
    setShowAnswer(false);
    deck.incrementScore();
    advanceToNextCard();
  };

  const wrong = () => {
    setShowAnswer(false);
    deck.resetScore();
    advanceToNextCard();
  };

  return (
    <div>
      <div>
        <CardComponent
          showAnswer={showAnswer}
          card={currentCard}
          correct={correct}
          wrong={wrong}
          toggleShowAnswer={toggleShowAnswer}
          key={currentCard.id}
        />
      </div>
    </div>
  );
};

interface DeckComponentProps {
  deck: Deck;
}
