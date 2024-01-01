"use client";
import { searchByFragmentUrl } from "@/utilities/additional-citation-methods";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

interface StringEntryProps {
  setString: Dispatch<SetStateAction<string>>;
  initialValue: string;
}

export const FragmentEntry = ({
  setString,
  initialValue,
}: StringEntryProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  const searchByFragment = () => {
    const inputValue = inputRef.current?.value ?? "";
    window.open(searchByFragmentUrl(inputValue), "_blank");
  };

  return (
    <div>
      <div className="w-full">
        <label className="label font-bold">Fragment</label>
      </div>
      <div className="flex">
        <input
          ref={inputRef}
          className={"flex-auto max-w-xs input input-bordered"}
          type="text"
          onChange={handleChange}
          defaultValue={initialValue}
        ></input>
        <button
          className="flex-none btn btn-btnPrimary ml-2 mr-2 mb-2"
          onClick={searchByFragment}
        >
          <MagnifyingGlassCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
