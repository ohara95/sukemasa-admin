import React, { FC } from "react";

type Props = {
  text: string;
  size?: string;
  color?: string;
  stylePlus?: string;
};
const Label: FC<Props> = ({ text, size = "l", color = "gray", stylePlus }) => {
  return (
    <>
      <label
        className={`block text-${color}-700 text-${size} font-bold ${stylePlus}`}
      >
        {text}
      </label>
    </>
  );
};

export default Label;
