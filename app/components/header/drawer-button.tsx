"use client";

import {Bars3BottomRightIcon} from "@heroicons/react/24/outline";
import { useDrawerStateStore } from "src/store/drawer-state-store";

export const DrawerButton = () => {
  const {openDrawer} = useDrawerStateStore();

  return (
    <button onClick={openDrawer}>
      <div className="ml-auto">
        <Bars3BottomRightIcon className="h-8 w-8" />
      </div>
    </button>
  );
};
