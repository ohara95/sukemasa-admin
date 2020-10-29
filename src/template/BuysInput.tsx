import React, { FC } from "react";
import { Button, Input, Label, Alert } from "../atoms";
import { errors } from "../utils";

type Props = {
  buysPrice: string;
  setBuysPrice: (param: string) => void;
  buysDetail: string;
  setBuysDetail: (param: string) => void;
  buysDate: string;
  setBuysDate: (param: string) => void;
  isError: boolean;
  errorMessages: { [param: string]: 1 | 2 | 3 | 4 }[];
};

const BuysInput: FC<Props> = ({
  setBuysPrice,
  buysDetail,
  setBuysDetail,
  buysDate,
  setBuysDate,
  buysPrice,
  isError,
  errorMessages,
}) => {
  const inputErr = errorMessages && errorMessages[0]?.buysInput;
  return (
    <>
      <div>
        {isError && inputErr && (
          <Alert text={errors[inputErr]} icon="fas fa-exclamation-circle" />
        )}
      </div>
      <div className="mb-4">
        <Label text="出費日" />
        <Input
          type="date"
          value={buysDate}
          onChange={(e) => setBuysDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label text="出費額" />
        <Input
          type="number"
          value={buysPrice}
          onChange={(e) => setBuysPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label text="出費明細" />
        <Input
          type="text"
          value={buysDetail}
          onChange={(e) => setBuysDetail(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button text="計上" />
      </div>
    </>
  );
};

export default BuysInput;
