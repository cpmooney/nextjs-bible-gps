"use client";
import Drawer from "react-modern-drawer";
import {useDrawerStateContext} from "../providers/drawer-state-provider";
import {Entry} from "./entry";

import {XMarkIcon} from "@heroicons/react/24/outline";
import "react-modern-drawer/dist/index.css";

export const ExtendedMenu = () => {
  const {closeDrawer, isOpen} = useDrawerStateContext();
  return (
    <Drawer open={isOpen} direction="right">
      <div id="menu-section" className="bg-off-white-1">
        <button onClick={closeDrawer}>
          <XMarkIcon className="h-8 w-8" />
        </button>
        <Entry title="Quiz Me!" url="/" />
        <Entry title="My Citations" url="/list" />
        <Entry title="Getting Started" url="/getting-started" />
      </div>
    </Drawer>
  );
};
