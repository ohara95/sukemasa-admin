import React, { FC } from "react";
import { Button, Alert } from "../atoms";
import InputWithLabel from "../molecules/InputWithLabel";

type Props = {
  salesDate: string;
  setSalesDate: (param: string) => void;
  salesPrice: string;
  setSalesPrice: (param: string) => void;
  errorMessages: string | undefined;
  errorType: string | undefined;
};

const SalesInput: FC<Props> = ({
  setSalesDate,
  salesPrice,
  setSalesPrice,
  salesDate,
  errorMessages,
  errorType,
}) => {
  return (
    <>
      <div>
        {errorType === "salesInput" && (
          <Alert text={errorMessages} icon="fas fa-exclamation-circle" />
        )}
      </div>
      <InputWithLabel
        title="売上日"
        type="date"
        value={salesDate}
        onChange={(e) => setSalesDate(e.target.value)}
      />
      <InputWithLabel
        title="売上額"
        type="number"
        value={salesPrice}
        onChange={(e) => {
          setSalesPrice(e.target.value);
        }}
      />
      <div className="flex justify-end">
        <Button text="計上" />
      </div>
    </>
  );
};

export default SalesInput;
