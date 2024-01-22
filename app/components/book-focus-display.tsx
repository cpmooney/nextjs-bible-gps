"use client";

import {useEffect, useState} from "react";
import {useDeckStateContext} from "./providers/deck-state-provider";

export default function BookFocusDisplay() {
  const {obtainFilter} = useDeckStateContext();
  const [bookFocus, setBookFocus] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (obtainFilter()?.kind === "book") {
      setBookFocus(obtainFilter()?.value);
    }
  }, [obtainFilter]);

  return bookFocus ? (
    <div className="card bg-base-100 shadow-xl mt-4 mb-4 w-96">
      <div className="card-body text-xl">Focus: {bookFocus}</div>
    </div>
  ) : null;
}
