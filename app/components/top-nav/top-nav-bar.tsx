import { Entry } from "./entry";
import { UserButton } from "./user-button";

export const TopNavBar = () => {
  return (
    <div className="bg-dark-brown text-white flex justify-between list-none w-full p-4">
      <div className="flex-1">
        <UserButton />
      </div>
      <Entry title="Quiz Me!" url="/" />
      <Entry title="My Citations" url="/list" />
      <Entry title="Getting Started" url="/getting-started" />
    </div>
  );
};
