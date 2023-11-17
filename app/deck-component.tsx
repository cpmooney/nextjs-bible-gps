import {Deck} from "@/models/deck";
import {useEffect, useState} from "react";
import CardComponent from "./card-component";
import "./globals.css";
import CardStatComponent from "./card-stats";
import TotalStatComponent from "./total-stat";

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
    <div>
    <CardComponent
    showingAnswer={showingAnswer}
    card={currentCard}
    correct={correct}
    wrong={wrong}
    toggleShowAnswer={toggleShowAnswer}
    />
    <TotalStatComponent totalScore={deck.totalScore} scoreIncrease={deck.changedNumber} />
    </div>
    );
  };
  
  interface DeckComponentProps {
    deck: Deck;
  }
  