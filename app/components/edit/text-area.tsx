import { ChangeEvent } from "react";
import Label from "../label";

interface Props {
  setString: (value: string) => void;
  initialValue: string;
}

export const TextArea = ({ setString, initialValue }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setString(event.target.value);
  };
  return (
    <div>
      <div className="w-full">
        <Label title="Entire Passage" />
      </div>
      <textarea
        className="input input-bordered w-full h-32"
        onChange={handleChange}
        defaultValue={initialValue}
      ></textarea>
    </div>
  );
};
