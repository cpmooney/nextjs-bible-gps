import {AdditionalActionComponents} from "./additional-actions";
import CardComponent from "./card-component";
import ScoreComponent from "./score";

export const DeckComponent = () => {
  return (
    <div>
      <CardComponent />
      <ScoreComponent />
      <AdditionalActionComponents />
    </div>
  );
};
