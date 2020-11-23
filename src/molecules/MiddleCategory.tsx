import React, { FC } from "react";
import { Select } from "../atoms";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionData?: { value: string; name: string }[];
  dbData?: {
    price: number;
    category?: string;
    item?: string;
    id?: string;
    title?: string;
    detail?: string;
  }[];
};

const MiddleCategory: FC<Props> = ({ onChange, optionData, dbData }) => {
  return (
    <Select onChange={onChange}>
      {optionData &&
        optionData?.map((category) => (
          <option key={category.value} value={category.value}>
            {category.name}
          </option>
        ))}
      {dbData && (
        <>
          <option value="none">選択してください</option>
          {dbData?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.item} ¥{el.price}
            </option>
          ))}
        </>
      )}
    </Select>
  );
};

export default MiddleCategory;
