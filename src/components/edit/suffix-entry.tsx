import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface StringEntryProps {
  setString: Dispatch<SetStateAction<string>>;
}

export const SuffixEntry = ({ setString }: StringEntryProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };
  return (
    <div>
      <input
        className={"input input-bordered w-16"}
        type="text"
        onChange={handleChange}
      ></input>
    </div>
  );
};
