import React, { FC } from "react";
import { Button, Alert } from "../atoms";
import InputWithLabel from "../molecules/InputWithLabel";

type Props = {
  buysPrice: string;
  setBuysPrice: (param: string) => void;
  buysDetail: string;
  setBuysDetail: (param: string) => void;
  buysDate: string;
  setBuysDate: (param: string) => void;
  errorMessage: string | undefined;
  errorType: string | undefined;
};

type InputDetail = {
  title: string;
  type: "text" | "number" | "date";
  value: string;
  onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => void;
};

const BuysInput: FC<Props> = ({
  setBuysPrice,
  buysDetail,
  setBuysDetail,
  buysDate,
  setBuysDate,
  buysPrice,
  errorMessage,
  errorType,
}) => {
  const inputDetail: InputDetail[] = [
    {
      title: "出費日",
      type: "date",
      value: buysDate,
      onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) =>
        setBuysDate(e.target.value),
    },
    {
      title: "出費額",
      type: "number",
      value: buysPrice,
      onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) =>
        setBuysPrice(e.target.value),
    },
    {
      title: "出費明細",
      type: "text",
      value: buysDetail,
      onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) =>
        setBuysDetail(e.target.value),
    },
  ];

  return (
    <>
      <div>
        {errorType === "buysInput" && (
          <Alert text={errorMessage} icon="fas fa-exclamation-circle" />
        )}
      </div>
      {inputDetail.map((input) => {
        return <InputWithLabel {...input} />;
      })}
      <div className="flex justify-end">
        <Button text="計上" />
      </div>
    </>
  );
};

export default BuysInput;
