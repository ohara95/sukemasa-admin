import React, { FC } from "react";
import { Label, Input } from "../atoms";

type Props = {
  title: string;
  value: string;
  type: "date" | "text" | "number";
  onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => void;
};

const InputWithLabel: FC<Props> = ({ title, value, onChange, type }) => {
  return (
    <div className="mb-4">
      <Label text={title} />
      <Input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default InputWithLabel;
