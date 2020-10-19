import React, { FC } from "react";
import { SwitchButton } from "../atoms";

type MethodProps = "add" | "edit" | "delete" | "none" | "";

type Props = {
  setState: (param: MethodProps) => void;
  select: MethodProps;
  color?: string;
};

const SelectButton: FC<Props> = ({ setState, select, color = "indigo" }) => (
  <div className="md:w-2/3">
    <div
      className="pt-8"
      onClick={(e) => {
        setState((e.target as HTMLInputElement).value as MethodProps);
      }}
    >
      <SwitchButton value="add" text="追加" select={select} color={color} />
      <SwitchButton value="edit" text="変更" select={select} color={color} />
      <SwitchButton value="delete" text="削除" select={select} color={color} />
    </div>
  </div>
);

export default SelectButton;
