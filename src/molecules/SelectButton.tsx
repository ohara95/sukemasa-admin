import React, { FC } from "react";
import { SwitchButton, Alert } from "../atoms";
import { ErrorDetail } from "../types";

type MethodProps = "add" | "edit" | "delete" | "none" | "";

type Props = {
  setState: (param: MethodProps) => void;
  select: MethodProps;
  color?: string;
  alertText?: ErrorDetail;
  alertIcon?: "fas fa-exclamation-circle" | "fas fa-question-circle";
  alertType?: string;
};

const SelectButton: FC<Props> = ({
  setState,
  select,
  color = "teal",
  alertText,
  alertIcon = "fas fa-exclamation-circle",
  alertType,
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
        {alertText?.isError && alertText.errorName === alertType && (
          <Alert text={alertText?.errorMessage} icon={alertIcon} />
        )}
      </div>
    </div>
  </div>
);

export default SelectButton;
