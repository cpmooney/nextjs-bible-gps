"use client";
import {SignInButton, SignOutButton, SignedIn, SignedOut} from "@clerk/nextjs";

const UserHeaderComponent = () => {
  return (
    <div className="mb-2 mt-2 h-8">
      <SignedIn>
        <SignOutButton>
          <button className="rounded border border-gray-400 px-3 py-0.5">
            Sign Out
          </button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded border border-gray-400 px-3 py-0.5">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default UserHeaderComponent;
