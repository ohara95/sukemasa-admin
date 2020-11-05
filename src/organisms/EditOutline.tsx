import React, { FC } from "react";
import { Label } from "../atoms";
import SelectButton from "../molecules/SelectButton";

type MethodProps = "add" | "edit" | "delete" | "";
type Props = {
  setState: (param: MethodProps) => void;
  select: MethodProps;
  alertText?: string | undefined;
  title: string;
  id?: string;
};

const EditOutline: FC<Props> = ({
  children,
  setState,
  select,
  alertText,
  title,
  id,
}) => (
  <div id={id} className="p-8 mt-6 lg:mt-0 rounded">
    <form>
      <div className="md:flex mb-6">
        <div className="md:w-1/3">
          <Label text={title} size="xl" />
        </div>
        <SelectButton
          setState={setState}
          select={select}
          alertText={alertText}
        />
      </div>
      {children}
    </form>
  </div>
);

export default EditOutline;
