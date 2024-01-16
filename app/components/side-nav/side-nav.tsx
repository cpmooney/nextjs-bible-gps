import {
  ArrowsUpDownIcon,
  Bars3Icon,
  FaceSmileIcon,
  HomeIcon,
  InformationCircleIcon,
  LightBulbIcon,
  ListBulletIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "./entry";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ExportImportModal from "../modals/export-import-modal";

export function SideNav() {
  return (
    <div className="drawer z-50">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
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
          <Entry title="Home" url="/">
            <HomeIcon className="w-6" />
          </Entry>
          <Entry title="Info" modal="full_citation">
            <InformationCircleIcon className="w-6" />
          </Entry>
          <SignedIn>
          <Entry title="List" url="/list">
            <ListBulletIcon className="w-6" />
          </Entry>
          <Entry title="Add New" url="/partial-list">
            <PlusCircleIcon className="w-6" />
          </Entry>
          <Entry title="Export" modal="export_import">
            <ArrowsUpDownIcon className="w-6" />
          </Entry>
          <Entry title="Quick Fragment" modal="create_partial_citation">
            <LightBulbIcon className="w-6" />
          </Entry>
            <UserButton />
            <SignOutButton>
              <Entry title="Sign Out">
                <FaceSmileIcon className="w-6" />
              </Entry>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Entry title="Sign In">
                <FaceSmileIcon className="w-6" />
              </Entry>
            </SignInButton>
          </SignedOut>
        </ul>
      </div>
    </div>
  );
}
