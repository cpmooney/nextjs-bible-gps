import { Bars3BottomRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { UserButton } from "./user-button";

export const TopNavBar = () => {
  return (
    <div className="bg-dark-gray-1 text-off-white-1 flex justify-between p-4">
      <div className="flex-1">
        <UserButton />
      </div>
      <div className="pr-4">
        <HomeIcon className="h-8 w-8" />
      </div>
      <div className="ml-auto pr-4">
        <Bars3BottomRightIcon className="h-8 w-8" />
      </div>
    </div>
  );
};
