import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface NumberSelectionProps {
    setNumber: Dispatch<SetStateAction<number>>;
}

export const NumberSelection = ({ setNumber }: NumberSelectionProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumber(parseInt(event.target.value));
    };
    return <input className="input input-bordered w-16" type="number" onChange={handleChange}></input>;
}
