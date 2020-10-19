import React, { FC } from "react";

type Props = {
  type: "text" | "number" | "date";
  onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => void;
  value: string | number;
  placeholder?: string;
  plusStyle?: string;
};

const Input: FC<Props> = ({
  type,
  onChange,
  value,
  placeholder,
  plusStyle,
}) => (
  <input
    className={`appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-white ${plusStyle}`}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default Input;
