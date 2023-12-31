import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface StringEntryProps {
  setString: Dispatch<SetStateAction<string>>;
  initialValue: string;
}

export const FragmentEntry = ({ setString, initialValue }: StringEntryProps) => {
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
        defaultValue={initialValue}
      ></input>
    </div>
  );
};
