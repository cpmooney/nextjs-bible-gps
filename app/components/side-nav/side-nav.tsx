"use client";
import {
  ArrowsUpDownIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  FaceSmileIcon,
  HomeIcon,
  InformationCircleIcon,
  LightBulbIcon,
  ListBulletIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "./entry";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Beta } from "../preference/beta";
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
          <SignedOut>
            <SignInButton mode="modal">
              <li>
                <div>
                  <FaceSmileIcon className="w-8" />
                  Sign In
                </div>
              </li>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <li>
              <UserButton />
            </li>
          </SignedIn>
          <Entry title="Home" url="/" Icon={HomeIcon} />
          <Entry
            title="Info"
            modal="full_citation"
            Icon={InformationCircleIcon}
          />
          <SignedIn>
            <Entry title="List" url="/list" Icon={ListBulletIcon} />
            <Entry
              title="Getting Started"
              url="/getting-started"
              Icon={BookmarkSquareIcon}
            />
            <BetaSideNav />
          </SignedIn>
        </ul>
      </div>
    </div>
  );
}
