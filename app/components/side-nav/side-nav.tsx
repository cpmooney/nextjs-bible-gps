import {
  Bars3Icon,
  HomeIcon,
  ListBulletIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Entry } from "./entry";
import { UserButton } from "@clerk/nextjs";
import ExportImportButton from "../export-import/export-import-button";

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
          <Entry title="List" url="/list">
            <ListBulletIcon className="w-6" />
          </Entry>
          <Entry title="Add New" url="/partial-list">
            <PlusCircleIcon className="w-6" />
          </Entry>
          <ExportImportButton />
          <UserButton />
        </ul>
      </div>
    </div>
  );
}
