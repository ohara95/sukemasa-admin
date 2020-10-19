import React, { FC } from "react";
import { Select } from "../atoms";

type Props = {
  setState: (param: string) => void;
  optionData: { value: string; name: string }[];
};

const MiddleCategory: FC<Props> = ({ setState, optionData }) => (
  <Select
    onChange={(e) => {
      setState(e.target.value);
    }}
  >
    {optionData.map((category) => {
      return (
        <option key={category.value} value={category.value}>
          {category.name}
        </option>
      );
    })}
  </Select>
);

export default MiddleCategory;
