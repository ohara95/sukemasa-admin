import React, { FC } from "react";

type Props = {
  text: string;
  size?: string;
  color?: string;
};
const Label: FC<Props> = ({ text, size = "l", color = "gray" }) => {
  return (
    <>
      <label className={`block text-${color}-700 text-${size} font-bold mb-2`}>
        {text}
      </label>
    </>
  );
};

export default Label;
