"use client";

import {useEffect, useState} from "react";
import { useFilterStateStore } from "src/store/filter-state-store";

export default function BookFocusDisplay() {
  const {filter} = useFilterStateStore();
  const [bookFocus, setBookFocus] = useState<string | null>(null);

  useEffect(() => {
    if (filter.kind === "book" && filter.value !== "none") {
      setBookFocus(filter.value);
    } else {
      setBookFocus(null);
    }
  }, [filter]);

  return bookFocus ? (
    <div className="card bg-base-100 shadow-xl mt-4 mb-4">
      <div className="card-body text-xl">Focus: {bookFocus}</div>
    </div>
  ) : null;
}
