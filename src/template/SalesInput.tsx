import React, { FC } from "react";
import { Label, Button, Input, Alert } from "../atoms";
import { errors } from "../utils";

type Props = {
  salesDate: string;
  setSalesDate: (param: string) => void;
  salesPrice: string;
  setSalesPrice: (param: string) => void;
  isError: boolean;
  errorMessages: { [param: string]: 1 | 2 | 3 | 4 }[];
};

const SalesInput: FC<Props> = ({
  setSalesDate,
  salesPrice,
  setSalesPrice,
  salesDate,
  isError,
  errorMessages,
}) => {
  const inputErr = errorMessages && errorMessages[0]?.salesInput;

  return (
    <>
      <div>
        {isError && inputErr && (
          <Alert text={errors[inputErr]} icon="fas fa-exclamation-circle" />
        )}
      </div>

      <div className="mb-4">
        <Label text="売上日" />
        <Input
          type="date"
          value={salesDate}
          onChange={(e) => setSalesDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label text="売上額" />
        <Input
          type="number"
          value={salesPrice}
          onChange={(e) => {
            setSalesPrice(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button text="計上" />
      </div>
    </>
  );
};

export default SalesInput;
