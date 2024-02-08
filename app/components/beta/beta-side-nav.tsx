"use client";

import {
  ArrowsUpDownIcon,
  BookmarkSquareIcon,
  LightBulbIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "../top-nav/entry";
import { Beta } from "../preference/beta";

export function BetaSideNav() {
  return (
    <Beta>
      <Entry
        title="Focus on a Book"
        modal="edit_filter"
        Icon={MagnifyingGlassCircleIcon}
      />
      <Entry title="Add New" url="/partial-list" Icon={PlusCircleIcon} />
      <Entry title="Export" modal="export_import" Icon={ArrowsUpDownIcon} />
      <Entry
        title="Quick Fragment"
        modal="create_partial_citation"
        Icon={LightBulbIcon}
      />
      <Entry title="About" url="/about" Icon={BookmarkSquareIcon} />
    </Beta>
  );
}
