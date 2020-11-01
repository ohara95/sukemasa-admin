import React, { FC } from "react";
import { Label, Select } from "../atoms";

type Props = {
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isSelect?: boolean;
  option?: { value: string; name: string }[];
  isComponent?: boolean;
  render?: JSX.Element;
};

const MenuSelector: FC<Props> = ({
  title,
  onChange,
  isSelect = false,
  option,
  isComponent = false,
  render,
}) => (
  <div className="md:flex mb-6">
    <div className="md:w-1/3">
      <Label text={title} />
    </div>
    <div className="md:w-2/3 border-gray-400 border-2 rounded">
      {isComponent ? (
        render
      ) : (
        <Select onChange={onChange}>
          {isSelect && <option value="none">選択して下さい</option>}
          {option}
        </Select>
      )}
    </div>
  </div>
);

export default MenuSelector;
