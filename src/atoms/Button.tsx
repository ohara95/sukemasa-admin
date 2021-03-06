import React, { FC } from "react";

type Props = {
  text: string;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: string;
};
const Button: FC<Props> = ({ text, value, onClick, color = "teal" }) => {
  return (
    <button
      className={`bg-${color}-500 hover:bg-${color}-700 border-${color}-500 hover:border-${color}-700 text-sm border-4 text-white py-1 px-2 rounded `}
      value={value}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
