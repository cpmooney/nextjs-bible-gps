import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface NumberSelectionProps {
  setNumber: Dispatch<SetStateAction<number>>;
  initialValue: number;
}

export const NumberSelection = ({ setNumber, initialValue }: NumberSelectionProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(event.target.value));
  };
  return (
    <input
      className="input input-bordered w-16"
      type="number"
      onChange={handleChange}
      defaultValue={initialValue}
    ></input>
  );
};
