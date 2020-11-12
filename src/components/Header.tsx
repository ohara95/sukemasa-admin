import React, { FC } from "react";

type Props = {
  onClick: any;
  title: string;
  buttonText: string;
  render?: JSX.Element;
  single?: Boolean;
};
const Temporary: FC<Props> = ({
  onClick,
  title,
  buttonText,
  render,
  single = false,
}) => {
  return (
    <>
      <nav className="w-full z-10 py-1 flex bg-teal-500 ">
        <nav className={single ? "" : "w-2/6"}>
          <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0 leading-loose w-full">
            <li>
              <button
                className="inline-block no-underline hover:text-black hover:underline py-2 px-4 text-center"
                onClick={onClick}
              >
                {buttonText}
              </button>
            </li>
            {render}
          </ul>
        </nav>
        <div className="w-full container flex flex-wrap items-center justify-center  px-6 py-3  ">
          <h1 className="font-bold text-white text-xl">{title}</h1>
        </div>
        <div className={single ? "" : "w-2/6"} />
      </nav>
      <hr />
    </>
  );
};

export default Temporary;
