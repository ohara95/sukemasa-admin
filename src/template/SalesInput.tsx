import React, { FC } from "react";
import { Label, Button, Input, Alert } from "../atoms";

type Props = {
  salesDate: string;
  setSalesDate: (param: string) => void;
  salesPrice: string;
  setSalesPrice: (param: string) => void;
  inputErr: boolean;
};

const SalesInput: FC<Props> = ({
  setSalesDate,
  salesPrice,
  setSalesPrice,
  salesDate,
  inputErr,
}) => (
  <>
    <div>
      {inputErr && (
        <Alert text="入力してください" icon="fas fa-exclamation-circle" />
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
    <div>
      <Button text="計上" />
    </div>
  </>
);

export default SalesInput;
