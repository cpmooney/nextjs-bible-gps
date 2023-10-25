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

  const [showingAnswer, setShowingAnswer] = useState(false);
  const toggleShowAnswer = () => {
    setShowingAnswer(!showingAnswer);
  };

  const correct = () => {
    setShowingAnswer(false);
    deck.incrementScore();
    advanceToNextCard();
  };

  const wrong = () => {
    setShowingAnswer(false);
    deck.resetScore();
    advanceToNextCard();
  };

  return (
    <div>
      <div>
        <CardComponent
          showingAnswer={showingAnswer}
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
