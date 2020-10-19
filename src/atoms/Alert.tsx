import React, { FC } from "react";

type Props = {
  text: string;
  icon: "fas fa-exclamation-circle" | "fas fa-question-circle";
};
const Alert: FC<Props> = ({ text, icon }) => {
  return (
    <>
      <div role="alert" className="my-3">
        <div className="flex h-8 ">
          <div className="bg-orange-300 w-10 text-center p-2 rounded-l">
            <div className="flex justify-center h-full items-center">
              <i className={`text-white text-xl ${icon}`}></i>
            </div>
          </div>
          <div className="bg-white border-r-4 border-orange-300 p-1 rounded-r">
            <div>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
