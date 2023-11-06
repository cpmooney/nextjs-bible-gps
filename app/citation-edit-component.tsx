import {Citation} from "@/models/citation";
import {useState} from "react";

export const CitationEditComponent = (props: {id?: string}) => {
  const citation = obtainCitation(props.id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitting");
  };

  const [fragment, setFragment] = useState(citation.fragment);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Fragment"
            className="input w-full max-w-xs"
            value={fragment}
            onChange={(event) => setFragment(event.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

const obtainCitation = (id?: string): Citation => {
  if (!id) {
    return starterCitation();
  }
  throw new Error("Not implemented yet!");
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
