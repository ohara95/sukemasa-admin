import React, { FC } from "react";

type Props = {
  select: "add" | "edit" | "delete" | "none" | "";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ToggleButton: FC<Props> = ({ select, onClick }) => (
  <div className="md:w-2/3 flex justify-end">
    {select === "delete" ? (
      <button
        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded "
        onClick={onClick}
      >
        削除
      </button>
    ) : (
      <button
        className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        送信
      </button>
    )}
  </div>
);

export default ToggleButton;
