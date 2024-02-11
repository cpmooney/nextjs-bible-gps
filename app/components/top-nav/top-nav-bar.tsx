import { Entry } from "./entry";
import { UserButton } from "./user-button";

export const TopNavBar = () => {
  return (
    <ul className="flex justify-between list-none w-full bg-blue-200 p-4">
      <UserButton />
      <Entry title="Quiz Me!" url="/" />
      <Entry title="My Citations" url="/list" />
      <Entry title="Getting Started" url="/getting-started" />
    </ul>
  );
};
