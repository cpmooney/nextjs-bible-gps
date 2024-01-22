import BookFocusDisplay from "./book-focus-display";
import CardComponent from "./card-component";
import ScoreComponent from "./score";

export const DeckComponent = () => {
  return (
    <div>
      <CardComponent />
      <ScoreComponent />
      <BookFocusDisplay />
    </div>
  );
};
