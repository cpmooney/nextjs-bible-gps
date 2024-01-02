import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface StringEntryProps {
  setString: Dispatch<SetStateAction<string>>;
  initialValue: string;
}

export const SuffixEntry = ({ setString, initialValue }: StringEntryProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };
  return (
    <div>
      <input
        className={"input input-bordered w-16"}
        type="text"
        onChange={handleChange}
        defaultValue={initialValue}
      ></input>
    </div>
  );
};
