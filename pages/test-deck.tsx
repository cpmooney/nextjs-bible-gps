import {Citation} from "@/models/citation";
import {DeckPage} from "./deck";

const sampleCitations: Citation[] = [
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
    score: 0,
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
    score: 0,
  },
];

const TestDeck = () => {
  return (
    <div>
      <DeckPage sampleCitations={sampleCitations} />
    </div>
  );
};

export default TestDeck;
