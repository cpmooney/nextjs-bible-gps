"use client";

import {Filter} from "@/utilities/filtering";
import {useEffect, useState} from "react";
import {useDeckStateContext} from "../providers/deck-state-provider";

export default function BookFocusDisplay() {
  const {obtainFilter} = useDeckStateContext();
  const [bookFocus, setBookFocus] = useState<string | null>(null);

  useEffect(() => {
    const filter: Filter = obtainFilter();
    if (filter.kind === "book" && filter.value !== "none") {
      setBookFocus(filter.value);
    } else {
      setBookFocus(null);
    }
  }, [obtainFilter]);

  return bookFocus ? (
    <div className="card bg-base-100 shadow-xl mt-4 mb-4">
      <div className="card-body text-xl">Focus: {bookFocus}</div>
    </div>
  ) : null;
}
