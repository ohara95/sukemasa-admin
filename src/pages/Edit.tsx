import React, { FC } from "react";
import RecruitEdit from "../template/RecruitEdit";
import MenuEdit from "../components/MenuEdit";
import NoticeEdit from "../template/NoticeEdit";
import BanquetEdit from "../components/BanquetEdit";
import * as H from "history";
import ImageUpLoader from "../components/ImageUpLoader";

type Props = {
  history: H.History;
};
const Edit: FC<Props> = ({ history }) => {
  return (
    <>
      {/* <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
          <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">
            編集メニュー
          </p>
          <div className="block lg:hidden sticky inset-0">
            <button
              id="menu-toggle"
              className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-orange-600 appearance-none focus:outline-none"
            ></button>
          </div>
          <div
            className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
            style={{ top: "6em" }}
            id="menu-content"
          >
            <ul className="list-reset py-2 md:py-0">
              <li className="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-orange-600">
                <a
                  href="#section1"
                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Section 1</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section2"
                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Section 2</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section3"
                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Section 3</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section4"
                  className="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Section 4</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <h1>
        <div style={{ display: "flex" }}>
          <button
            className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
            type="button"
            onClick={() => history.goBack()}
          >
            戻る
          </button>
        </div>
      </h1>
      <section className="w-full">
        <h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
          ホームページ編集
        </h1>
        {/* <ImageUpLoader /> */}
        <MenuEdit />
        <hr className="bg-gray-300 my-12" />
        <BanquetEdit />
        <hr className="bg-gray-300 my-12" />
        <RecruitEdit />
        <hr className="bg-gray-300 my-12" />
        <NoticeEdit />
      </section>
    </>
  );
};

export default Edit;
