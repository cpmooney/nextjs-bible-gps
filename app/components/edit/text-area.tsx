import { ChangeEvent } from "react";

interface Props {
  setString: (value: string) => void;
}

export const TextArea = ({ setString }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setString(event.target.value);
  };
  return (
    <div>
      <div className="w-full">
        <label className="label font-bold">Entire Block</label>
      </div>
      <textarea
        className="input input-bordered w-full h-32"
        onChange={handleChange}
      ></textarea>
    </div>
  );
};
