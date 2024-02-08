"use client";
import {
  Bars3Icon,
  BookmarkSquareIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "../top-nav/entry";
import { SignedIn } from "@clerk/nextjs";
import { BetaSideNav } from "./beta-side-nav";

export function SideNav() {
  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button mb-2"
        >
          <Bars3Icon className="w-6" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 w-56">

          <SignedIn>
            <Entry title="List" url="/list" />
            <Entry
              title="Getting Started"
              url="/getting-started"
            />
            <BetaSideNav />
          </SignedIn>
        </ul>
      </div>
    </div>
  );
}
