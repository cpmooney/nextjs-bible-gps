import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface StringEntryProps {
  setString: Dispatch<SetStateAction<string>>;
}

export const FragmentEntry = ({ setString }: StringEntryProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };
  return (
    <div>
      <div className="w-full">
        <label className="label font-bold">Fragment</label>
      </div>
      <input
        className={"w-full max-w-xs input input-bordered"}
        type="text"
        onChange={handleChange}
      ></input>
    </div>
  );
};
