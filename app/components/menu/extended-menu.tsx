"use client";
import Drawer from "react-modern-drawer";
import {useDrawerStateContext} from "../providers/drawer-state-provider";
import {XMarkIcon} from "@heroicons/react/24/outline";
import "react-modern-drawer/dist/index.css";
import { useRef } from "react";
import Link from "next/link";
import Label from "../label";

export const ExtendedMenu = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const {closeDrawer, isOpen} = useDrawerStateContext();
  return (
    <Drawer open={isOpen} direction="right" lockBackgroundScroll onClose={closeDrawer}>
      <div ref={divRef} className="h-full bg-off-white-1 p-4">
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
