import React, { FC } from "react";
import { Label } from "../atoms";
import SelectButton from "../molecules/SelectButton";
import { ErrorDetail } from "../types";

type MethodProps = "add" | "edit" | "delete" | "none" | "";
type Props = {
  setState: (param: MethodProps) => void;
  select: MethodProps;
  alertText: ErrorDetail;
  alertType: string;
  title: string;
};

const EditOutline: FC<Props> = ({
  children,
  setState,
  select,
  alertText,
  alertType,
  title,
}) => (
  <div className="p-8 mt-6 lg:mt-0 rounded">
    <form>
      <div className="md:flex mb-6">
        <div className="md:w-1/3">
          <Label text={title} size="xl" />
        </div>
        <SelectButton
          setState={setState}
          select={select}
          alertText={alertText}
          alertType={alertType}
        />
      </div>
      {children}
    </form>
  </div>
);

export default EditOutline;
