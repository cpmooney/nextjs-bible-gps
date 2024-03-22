"use client";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useRef} from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Label from "../label";
import {useDrawerStateContext} from "../providers/drawer-state-provider";
import {ThemeChanger} from "../theme-changer";

export const ExtendedMenu = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const {closeDrawer, isOpen} = useDrawerStateContext();
  return (
    <Drawer
      customIdSuffix="extended-menu"
      open={isOpen}
      direction="right"
      lockBackgroundScroll
      onClose={closeDrawer}
    >
      <div ref={divRef} className="h-full bg-light-primary p-4">
        <button className="mb-8" onClick={closeDrawer}>
          <XMarkIcon className="h-8 w-8" />
        </button>
        <Link href="/list" onClick={closeDrawer}>
          <Label title="My Citations" />
        </Link>
        <Link href="/getting-started" onClick={closeDrawer}>
          <Label title="Getting Started" />
        </Link>
        <Link href="/edit/0" onClick={closeDrawer}>
          <Label title="Add a New Citation" />
        </Link>
        <Link href="/preferences" onClick={closeDrawer}>
          <Label title="Preferences" />
        </Link>
      </div>
    </Drawer>
  );
};
