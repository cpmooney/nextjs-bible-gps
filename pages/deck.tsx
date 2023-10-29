"use client";
import {trpc} from "../utilities/trpc";

/*
const ShowDeckResponse = (deckResponse: DeckPayload) => {
  return (
    <div>
      {deckResponse.cards.map((card) => (
        <div key={card.id}>
          <h1 style={{padding: "10px"}}>
            {" "}
            {deckResponse.module} / {deckResponse.chapter.number} -{" "}
            {deckResponse.chapter.title}{" "}
          </h1>
          <div>
            <em>{card.question}</em>
            <ul>
              {card.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
*/

const Home = () => {
  /*
  const {data} = trpc.deck.useQuery({
    module: "aws-foundations",
    chapter: 1,
  });
  if (!data) {
    return <div>Loading...</div>;
  }
  */
  return (
    <div>
    Dude
    </div>
  );
};

export default trpc.withTRPC(Home);
