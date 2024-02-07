"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  BookmarkSquareIcon,
  FaceSmileIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "./entry";

export function TopNav() {
  return (
    <div className="navbar bg-base-100 w-96 mb-4">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
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
          </SignedIn>
        </ul>
      </div>
    </div>
  );
}
