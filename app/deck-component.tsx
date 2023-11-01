import {Deck} from "@/models/deck";
import {useState} from "react";
import CardComponent from "./card-component";

interface ButtonBarComponentProps {
  showAnswer: boolean;
  toggleShowAnswer: () => void;
  correct: () => void;
  wrong: () => void;
}

const ButtonBarComponent = (props: ButtonBarComponentProps) => {
  const {toggleShowAnswer, correct, wrong, showAnswer} = props;

  if (!showAnswer) {
    return (<div>
      <button onClick={toggleShowAnswer}>Show Answer</button>
    </div>);
  }
  return (
    <div>
      <button onClick={correct}>Correct</button>
      <button onClick={wrong}>Wrong</button>
    </div>
  );
};

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
          key={currentCard.id}
        />
      </div>
      <ButtonBarComponent
        showAnswer={showAnswer}
        correct={correct}
        wrong={wrong}
        toggleShowAnswer={toggleShowAnswer}
      />
    </div>
  );
};

interface DeckComponentProps {
  deck: Deck;
}
