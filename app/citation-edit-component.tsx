import { Citation } from "@/models/citation";

interface CitationEditComponentProps {
  citation?: Citation;
}

export const CitationEditComponent = (props: CitationEditComponentProps) => {
  if (!props.citation) {
    props.citation = starterCitation();
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitting");
  }

return (
  <form onSubmit={handleSubmit}>
  </form>
};

const starterCitation = (): Citation => {
  return {
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
  };
};
