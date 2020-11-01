import React, { FC } from "react";
import { Label, Button, Input, Alert } from "../atoms";
import { ErrorDetail } from "../types";

type Props = {
  salesDate: string;
  setSalesDate: (param: string) => void;
  salesPrice: string;
  setSalesPrice: (param: string) => void;
  errorMessages: ErrorDetail;
};

const SalesInput: FC<Props> = ({
  setSalesDate,
  salesPrice,
  setSalesPrice,
  salesDate,
  errorMessages,
}) => {
  return (
    <>
      <div>
        {errorMessages?.isError && errorMessages.errorName === "salesInput" && (
          <Alert
            text={errorMessages.errorMessage}
            icon="fas fa-exclamation-circle"
          />
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
