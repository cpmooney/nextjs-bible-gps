import {Deck} from "@/models/deck";
import {useEffect, useState} from "react";
import CardComponent from "./card-component";
import "./globals.css";

export const DeckComponent = (props: DeckComponentProps) => {
  const {deck} = props;
  const [currentCard, setCurrentCard] = useState(deck.currentCard);
  const [showingAnswer, setShowingAnswer] = useState(false);

  useEffect(() => {
    setCurrentCard(deck.currentCard);
  }, [deck]);

  const advanceToNextCard = () => {
    setCurrentCard(deck.nextCard());
  };

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

  if (!currentCard) {
    return <div></div>;
  }

  return (
    <CardComponent
      showingAnswer={showingAnswer}
      card={currentCard}
      correct={correct}
      wrong={wrong}
      toggleShowAnswer={toggleShowAnswer}
    />
  );
};

interface DeckComponentProps {
  deck: Deck;
}
