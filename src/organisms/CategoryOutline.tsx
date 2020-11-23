import React, { FC } from "react";
import MiddleCategory from "../molecules/MiddleCategory";
import Label from "../atoms/Label";

type Props = {
  text: string;
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

const CategoryOutline: FC<Props> = ({ text, onChange, optionData, dbData }) => {
  return (
    <div className="md:flex mb-6">
      <div className="md:w-1/3">
        <Label text={text} />
      </div>
      <div className="md:w-2/3 border-gray-400 border-2 rounded">
        <MiddleCategory
          onChange={onChange}
          optionData={optionData}
          dbData={dbData}
        />
      </div>
    </div>
  );
};

export default CategoryOutline;
