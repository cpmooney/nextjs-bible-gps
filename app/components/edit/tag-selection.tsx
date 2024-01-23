import { Dispatch, SetStateAction } from "react";
import { useDeckStateContext } from "../providers/deck-state-provider";
import Select, { InputActionMeta, MultiValue } from "react-select";

interface Props {
  setTags: Dispatch<SetStateAction<string[]>>;
  initialTags: string[];
}

export const TagSelection = ({
  setTags,
  initialTags
}: Props) => {
  const { obtainTagList } = useDeckStateContext();
  const onInputChange = (newValue: string[], actionMeta: InputActionMeta) => {
    if (actionMeta.action === "input-change") {
      setTags(newValue);
    }
  }
  const options: string[] = obtainTagList().sort();
  return (
    <Select
      options={options}
      isMulti={true}
      onChange={onInputChange}/>
  );
};
