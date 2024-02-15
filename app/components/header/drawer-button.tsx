"use client";

import {Bars3BottomRightIcon} from "@heroicons/react/24/outline";
import {useDrawerStateContext} from "../providers/drawer-state-provider";

export const DrawerButton = () => {
  const {openDrawer} = useDrawerStateContext();

  return (
    <button onClick={openDrawer}>
      <div className="ml-auto">
        <Bars3BottomRightIcon className="h-8 w-8" />
      </div>
    </button>
  );
};
