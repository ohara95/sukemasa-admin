import React, { FC } from "react";

type Props = {
  color: string;
  icon: string;
  text: string;
};

const IconPop: FC<Props> = ({ color, icon, text, children }) => (
  <div className="bg-white rounded p-2 ">
    <div className="flex flex-row items-center">
      <div className="flex-shrink">
        <div className={`rounded p-5 bg-${color}-600`}>
          <i className={`${icon} text-white`} />
        </div>
      </div>
      <div className="flex-1 md:text-center">
        <h5 className="block text-gray-700 text-l font-bold mb-2">{text}</h5>
        <h3 className="font-bold text-3xl">{children}</h3>
      </div>
    </div>
  </div>
);

export default IconPop;
