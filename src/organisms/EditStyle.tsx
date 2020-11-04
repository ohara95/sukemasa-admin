import React, { FC } from "react";
import { Label, Select, Textarea, Alert } from "../atoms";
import { ErrorDetail } from "../types";

type Props = {
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectCategory: { value: string; name: string }[];
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  isAlert?: boolean;
  alertText?: string;
  alertIcon?: "fas fa-exclamation-circle" | "fas fa-question-circle";
  errorMessages: ErrorDetail;
  alertType: string;
  id?: string;
};

const EditStyle: FC<Props> = ({
  onChangeSelect,
  selectCategory,
  onChangeText,
  value,
  placeholder,
  onClick,
  title,
  alertIcon = "fas fa-exclamation-circle",
  errorMessages,
  alertType,
  id,
}) => (
  <div id={id} className="p-8 mt-6 lg:mt-0 rounded">
    <form>
      <div className="md:flex mb-6">
        <div className="md:w-1/3 flex items-center ">
          <Label text={title} size="xl" stylePlus="mr-4" />
          {errorMessages.isError && errorMessages.errorName === alertType && (
            <Alert text={errorMessages.errorMessage} icon={alertIcon} />
          )}
        </div>
      </div>

      <div className="md:flex mb-6">
        <div className="md:w-1/3">
          <Label text="投稿内容" />
        </div>
        <div className="md:w-2/3 border-gray-400 border-2 rounded">
          <Select onChange={onChangeSelect}>
            {selectCategory.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="md:flex mb-6">
        <div className="md:w-1/3">
          <Label text="入力欄" />
        </div>
        <div className="md:w-2/3">
          <Textarea
            onChange={onChangeText}
            value={value}
            placeholder={placeholder}
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3 flex justify-end">
          <button
            onClick={onClick}
            type="button"
            className="bg-teal-500 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded "
          >
            送信
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default EditStyle;
