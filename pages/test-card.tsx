import {Deck} from "@/models/deck";
import {DeckComponent} from "app/deck-component";

const testCard: Deck = Deck.of([
  {
    fragment: "not a slave but a son",
    book: "Galatians",
    chapter: 4,
    firstVerse: 7,
    suffix: "",
    tags: ["Redemption"],
    entire:
      "Therefore you are no longer a SLAVE but a SON and if a SON than an heir of God through Christ.",
    active: true,
    userId: "test-user",
  },
  {
    fragment: "living and active",
    book: "Hebrews",
    chapter: 4,
    firstVerse: 12,
    suffix: "",
    tags: [""],
    entire:
      "For the Word of God is living and active, sharper than any 2 edged sword, piercing even to the division of soul and Spirit and of joints and marrow and is a discerner of the thoughts and intentions of the heart",
    active: true,
    userId: "test-user",
  },
]);

const TestDeck = () => {
  return (
    <div>
      <DeckComponent deck={testCard} />
    </div>
  );
};

export default TestDeck;
