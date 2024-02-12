import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { UserName } from "./user-name";

export function UserButton() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <div className="flex">
            <FaceSmileIcon className="w-8 mr-2" />
            <span>Sign In</span>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex">
          <ClerkUserButton />
          <UserName />
        </div>
      </SignedIn>
    </div>
  );
}
