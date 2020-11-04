import React, { FC } from "react";
import RecruitEdit from "../template/RecruitEdit";
import MenuEdit from "../template/MenuEdit";
import NoticeEdit from "../template/NoticeEdit";
import BanquetEdit from "../template/BanquetEdit";
import * as H from "history";
import Header from "../components/Header";

type Props = {
  history: H.History;
};
const Edit: FC<Props> = ({ history }) => {
  return (
    <>
      <Header
        onClick={() => history.goBack()}
        title="HP編集"
        buttonText="戻る"
        render={
          <div className="flex justify-between w-9/12">
            <li className="hover:text-black hover:underline">
              <a href="#menu">メニュー</a>
            </li>
            <li className="hover:text-black hover:underline">
              <a href="#banquet">宴会</a>
            </li>
            <li className="hover:text-black hover:underline">
              <a href="#recruit">求人</a>
            </li>
            <li className="hover:text-black hover:underline">
              <a href="#other">その他</a>
            </li>
          </div>
        }
      />
      <div className="mt-10">
        {/* <ImageUpLoader /> */}
        <MenuEdit />
        <hr className="bg-gray-300 my-12" />
        <BanquetEdit />
        <hr className="bg-gray-300 my-12" />
        <RecruitEdit />
        <hr className="bg-gray-300 my-12" />
        <NoticeEdit />
      </div>
    </>
  );
};

export default Edit;
