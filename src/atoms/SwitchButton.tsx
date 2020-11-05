import React, { FC } from "react";

type Props = {
  select: string;
  text: string;
  value: string;
  type?: "button" | "submit";
  color?: string;
};

const SwitchButton: FC<Props> = ({
  select,
  text,
  value,
  type = "button",
  color = "indigo",
}) => (
  <button
    className={`shadow hover:bg-${color}-400 text-white ${
      select === value ? `bg-${color}-400` : `bg-${color}-500`
    } font-bold p-4  rounded mr-4`}
    value={value}
    type={type}
  >
    {text}
  </button>
);

export default SwitchButton;
