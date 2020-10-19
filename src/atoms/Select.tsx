import React, { FC } from "react";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
};

const Select: FC<Props> = ({ children, onChange, onClick }) => {
  return (
    <select
      className="form-select block w-full focus:bg-white rounded py-3 pl-3"
      onChange={onChange}
      onClick={onClick}
    >
      {children}
    </select>
  );
};

export default Select;
