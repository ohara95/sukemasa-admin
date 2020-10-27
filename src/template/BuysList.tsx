import React, { FC, useState, useEffect } from "react";
import { db } from "../config/firebese";
import { format } from "date-fns";
import { changeDisplayList } from "../utils";
import { Buys, ToggleTable } from "../types";
import { Input, Button } from "../atoms";

type Props = {
  dbBuys: Buys[];
  isBuysEdit: boolean;
  setIsBuysEdit: (param: boolean) => void;
  buysEditId: string;
  setBuysEditId: (param: string) => void;
  buysDetail: string;
  setBuysDetail: (param: string) => void;
  buysPrice: string;
  setBuysPrice: (param: string) => void;
  toggleTable: ToggleTable;
  choiceMonth: string;
};

/** 経費一覧 */
const BuysList: FC<Props> = ({
  dbBuys,
  isBuysEdit,
  setBuysEditId,
  setBuysDetail,
  setBuysPrice,
  buysDetail,
  setIsBuysEdit,
  buysPrice,
  buysEditId,
  toggleTable,
  choiceMonth,
}) => {
  const buysRef = db
    .collection("management")
    .doc("NcmaRejmRabdytHQfbKU")
    .collection("buys");

  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  // const searchBuys = () => {
  //   setSearch("");
  //   console.log(searchResult);
  // };

  // const filterData = dbBuys.filter((db) => db.detail === search);
  // console.log(filterData);

  /** 経費項目編集 */
  const upDateBuys = (id: string) => {
    setBuysPrice("");
    setBuysDetail("");
    setIsBuysEdit(!isBuysEdit);

    if (buysPrice) {
      buysRef.doc(id).update({
        buysPrice: parseInt(buysPrice),
      });
    }

    if (buysDetail) {
      buysRef.doc(id).update({
        detail: buysDetail,
      });
    }
  };

  /** 押した編集ボタンのID取得(経費) */
  const inputPossibleBuys = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsBuysEdit(!isBuysEdit);
    const findData = dbBuys.find(
      (db) => db.id === (e.target as HTMLInputElement).id
    );
    if (findData) setBuysEditId(findData?.id);
  };

  /** 経費削除 */
  const deleteBuys = (id: string) => {
    buysRef
      .doc(id)
      .get()
      .then((res) => res.ref.delete());
  };

  return (
    <>
      {/* <Input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button text="検索" onClick={searchBuys} /> */}
      {changeDisplayList(toggleTable, dbBuys, choiceMonth).map((db: any) => {
        return (
          <div key={db.id}>
            <div className="flex mt-2">
              {isBuysEdit && buysEditId === db.id ? (
                <button
                  onClick={() => upDateBuys(db.id)}
                  className="text-teal-500 fas fa-check focus:outline-none"
                />
              ) : (
                <button
                  id={db.id}
                  onClick={inputPossibleBuys}
                  className="text-teal-500 far fa-edit focus:outline-none"
                />
              )}
              <button
                onClick={() => {
                  deleteBuys(db.id);
                }}
                className="text-teal-500 py-1 px-2 far fa-trash-alt focus:outline-none"
              />
              <p className="text-l mr-2">
                {format(db.date.toDate(), "MM/dd")}
                &nbsp;
              </p>
              {isBuysEdit && buysEditId === db.id ? (
                <div className="flex">
                  <input
                    type="number"
                    value={buysPrice}
                    onChange={(e) => {
                      setBuysPrice(e.target.value);
                    }}
                    placeholder={db.buysPrice}
                    className="w-24"
                  />
                  <input
                    type="text"
                    value={buysDetail}
                    onChange={(e) => {
                      setBuysDetail(e.target.value);
                    }}
                    placeholder={db.detail}
                    className="w-24"
                  />
                </div>
              ) : (
                <p className="text-l">
                  {db.buysPrice.toLocaleString()}
                  円 &nbsp;
                  <i className="fas fa-caret-right " />
                  &nbsp;
                  {db.detail}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BuysList;
