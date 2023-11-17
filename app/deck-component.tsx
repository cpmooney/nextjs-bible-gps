import {Deck} from "@/models/deck";
import {useEffect, useState} from "react";
import CardComponent from "./card-component";
import "./globals.css";
import TotalStatComponent from "./total-stat";
import { SaveChangedScoresRequest } from "server/db-save-changed";
import { trpc } from "@/utilities/trpc";

export const DeckComponent = (props: DeckComponentProps) => {
  const {deck} = props;
  const [currentCard, setCurrentCard] = useState(deck.currentCard);
  const [showingAnswer, setShowingAnswer] = useState(false);

  useEffect(() => {
    setCurrentCard(deck.currentCard);
  }, [deck]);

  const saveChangedScoresProcedure =
    trpc.saveChangedScoresProcedure.useMutation();

  const syncScoresToDb = async () => {
    const changedCards: SaveChangedScoresRequest = deck.changedScoreRequest;
    const results = await saveChangedScoresProcedure.mutateAsync(changedCards);
    deck.addChangeScoreToTotal();
    deck.cardsWithChangedScores = {};
  };
  
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
    <TotalStatComponent initialScore={deck.initialScore} scoreIncrease={deck.scoreIncrease} syncScoresToDb={syncScoresToDb} />
    </div>
    );
  };
  
  interface DeckComponentProps {
    deck: Deck;
  }
  