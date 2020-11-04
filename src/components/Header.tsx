import React, { FC } from "react";

type Props = {
  onClick: any;
  title: string;
  buttonText: string;
  render?: JSX.Element;
};
const Temporary: FC<Props> = ({ onClick, title, buttonText, render }) => {
  return (
    <>
      <nav className="w-full z-30 top-0 py-1 flex">
        <nav className="w-2/6 ">
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 leading-loose w-full">
            <li>
              <button
                className="inline-block no-underline hover:text-black hover:underline py-2 px-4 text-center"
                onClick={onClick}
              >
                {buttonText}
              </button>
            </li>
            <li className="w-full">{render}</li>
          </ul>
        </nav>
        <div className="w-full container mx-auto flex flex-wrap items-center justify-center mt-0 px-6 py-3">
          <div className="order-1 md:order-2">
            <h1 className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
              {title}
            </h1>
          </div>
        </div>
      </nav>
      <hr className="my-2 mb-10" />
    </>
  );
};

export default Temporary;
