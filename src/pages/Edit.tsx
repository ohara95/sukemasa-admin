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
      />
      <section className="w-full">
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
