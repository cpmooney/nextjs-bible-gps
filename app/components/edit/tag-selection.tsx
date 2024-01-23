import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {MultiSelect} from "react-multi-select-component";
import {useDeckStateContext} from "../providers/deck-state-provider";

interface Props {
  setTags: Dispatch<SetStateAction<string[]>>;
  initialTags: string[];
}

export const TagSelection = ({setTags, initialTags}: Props) => {
  const {obtainTagList} = useDeckStateContext();
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTags = Array.from(event.target.selectedOptions, (option) => {
      return option.value;
    });
    setTags(selectedTags);
  };
  const options = obtainTagList()
    .sort()
    .map((tag) => {
      return {label: tag, value: tag};
    });
  return <MultiSelect options={options} value={initialTags} />;
};
