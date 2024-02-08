"use client";

import { PartialCitation } from "src/server/db-load-all-partial-citations";
import PartialCardWithoutFragment from "./partial-card-without-fragment";
import PartialCardWithFragment from "./partial-card-with-fragment";
import { useState } from "react";

interface Props {
  partialCitationList: PartialCitation[];
}

export default function PartialCardList({ partialCitationList }: Props) {
  const [list, setList] = useState<PartialCitation[]>(partialCitationList);
  const removeFromList = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <PartialCardWithoutFragment />
      {list.map(({ id, fragment }) => (
        <PartialCardWithFragment
          key={id}
          id={id}
          fragment={fragment}
          afterDeleteHandler={() => removeFromList(id)}
        />
      ))}
    </>
  );
}
