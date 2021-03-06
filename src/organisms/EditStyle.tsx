import React, { FC } from "react";
import { Label, Textarea, Alert } from "../atoms";
import CategoryOutline from "../organisms/CategoryOutline";

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
  errorMessage: string | undefined;
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
  errorMessage,
  id,
}) => (
  <div id={id} className="p-8 mt-6 lg:mt-0 rounded">
    <form>
      <div className="md:flex mb-6">
        <div className="md:w-1/3 flex items-center ">
          <Label text={title} size="xl" stylePlus="mr-4" />
          {errorMessage && <Alert text={errorMessage} icon={alertIcon} />}
        </div>
      </div>
      <CategoryOutline
        text="投稿内容"
        onChange={onChangeSelect}
        optionData={selectCategory}
      />

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
        <div className="md:w-1/3" />
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
