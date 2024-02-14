import {Go} from "./go";
import {Score} from "./score";
import {UserButton} from "./user-button";

export const Header = () => {
  return (
    <div className="bg-dark-gray-1 text-off-white-1 flex justify-between p-2">
      <div className="flex-1">
        <UserButton />
      </div>
      <div className="flex-1 text-center">
        <Score />
      </div>
      <Go />
    </div>
  );
};
