import { Entry } from "./entry";

export const SideDrawer = () => {
  return (
    <div className="">
      <Entry title="Quiz Me!" url="/" />
      <Entry title="My Citations" url="/list" />
      <Entry title="Getting Started" url="/getting-started" />
    </div>
  );
};
