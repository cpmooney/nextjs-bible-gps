import {DrawerButton} from "./drawer-button";
import {HomeButton} from "./home-button";
import {Score} from "./score";
import {UserButton} from "./user-button";

export const Header = () => {
  return (
    <div className="bg-dark-primary text-light-primary flex justify-between p-2">
      <div className="flex-1">
        <UserButton />
      </div>
      <div className="flex-1 text-center">
        <Score />
      </div>
      <HomeButton />
      <DrawerButton />
    </div>
  );
};
