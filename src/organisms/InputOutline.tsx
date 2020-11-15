import React, { FC } from "react";
import Label from "../atoms/Label";

type Props = {
  text: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number";
};

const InputOutline: FC<Props> = ({ text, value, onChange, type }) => {
  return (
    <div className="md:flex mb-6">
      <div className="md:w-1/3">
        <Label text={text} />
      </div>
      <div className="md:w-2/3">
        <input
          className="w-full border-gray-400 border-2 rounded py-3 px-3"
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
    </div>
  );
};

export default InputOutline;
