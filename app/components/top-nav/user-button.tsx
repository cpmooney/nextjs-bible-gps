import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export function UserButton() {
  return (
    <li>
      <SignedOut>
        <SignInButton mode="modal">
          <div className="flex">
            <FaceSmileIcon className="w-8 mr-2" />
            <span>Sign In</span>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <ClerkUserButton />
      </SignedIn>
    </li>
  );
}
