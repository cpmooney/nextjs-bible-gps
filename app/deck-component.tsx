import {Deck} from "@/models/deck";
import {useEffect, useState} from "react";
import CardComponent from "./card-component";
import "./globals.css";
import CardStatComponent from "./card-stats";

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
    <CardStatComponent
      card={currentCard}
      totalNumber={deck.activeNumber}
      changedNumber={deck.changedNumber}
    />
    <div className="fixed bottom-0">
    <a
      href="https://www.freepik.com/free-photo/light-gray-concrete-wall_4139268.htm#query=texture%20background&position=0&from_view=keyword&track=ais"
      >Image by rawpixel.com</a> on Freepik
    </div>
</div>
    );
  };
  
  interface DeckComponentProps {
    deck: Deck;
  }
  