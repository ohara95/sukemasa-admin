import React, { FC } from "react";
import { SwitchButton, Alert } from "../atoms";

type MethodProps = "add" | "edit" | "delete" | "";

type Props = {
  setState: (param: MethodProps) => void;
  select: MethodProps;
  color?: string;
  alertText?: string | undefined;
  alertIcon?: "fas fa-exclamation-circle" | "fas fa-question-circle";
};

const SelectButton: FC<Props> = ({
  setState,
  select,
  color = "teal",
  alertText,
  alertIcon = "fas fa-exclamation-circle",
}) => (
  <div className="md:w-2/3">
    <div
      className="pt-8"
      onClick={(e) => {
        setState((e.target as HTMLInputElement).value as MethodProps);
      }}
    >
      <div className="flex">
        <SwitchButton value="add" text="追加" select={select} color={color} />
        <SwitchButton value="edit" text="変更" select={select} color={color} />
        <SwitchButton
          value="delete"
          text="削除"
          select={select}
          color={color}
        />
        {alertText && <Alert text={alertText} icon={alertIcon} />}
      </div>
    </div>
  </div>
);

export default SelectButton;
