import React, { FC } from "react";
import { db } from "../config/firebese";
import { format } from "date-fns";
import { changeDisplayList } from "../utils";
import { Buys, ToggleTable } from "../types";

type Props = {
  dbBuys: Buys[];
  buysDetail: string;
  setBuysDetail: (param: string) => void;
  editBuys: string;
  setEditBuys: (param: string) => void;
  toggleTable: ToggleTable;
  choiceMonth: string;
};

/** 経費一覧 */
const BuysList: FC<Props> = ({
  editBuys,
  setEditBuys,
  dbBuys,
  setBuysDetail,
  buysDetail,
  toggleTable,
  choiceMonth,
}) => {
  const buysRef = db
    .collection("management")
    .doc("NcmaRejmRabdytHQfbKU")
    .collection("buys");

  /** 経費項目編集 */
  const upDateBuys = (id: string) => {
    const findChecked = dbBuys.find((db) => db.id === id)?.isChecked;

    if (editBuys) {
      buysRef
        .doc(id)
        .update({
          buysPrice: parseInt(editBuys),
        })
        .then(() => {
          setEditBuys("");
        });
    } else if (buysDetail) {
      buysRef
        .doc(id)
        .update({
          detail: buysDetail,
        })
        .then(() => {
          setBuysDetail("");
        });
    } else {
      buysRef.doc(id).update({
        isChecked: !findChecked,
      });
    }
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
      {changeDisplayList(toggleTable, dbBuys, choiceMonth).map((db: any) => {
        return (
          <div key={db.id}>
            <div className="flex mt-2">
              <button
                onClick={() => upDateBuys(db.id)}
                className={`text-teal-500 ${
                  db.isCheck ? "fas fa-check" : "far fa-edit"
                } focus:outline-none`}
              />
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
              {db.isChecked ? (
                <div className="flex">
                  <input
                    type="number"
                    value={editBuys}
                    onChange={(e) => {
                      setEditBuys(e.target.value);
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
                  {db.buysPrice.toLocaleString()}円&nbsp;&nbsp;
                  <i className="fas fa-caret-right " />
                  &nbsp;&nbsp;
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

// const [search, setSearch] = useState("");
// const [searchResult, setSearchResult] = useState([]);

// const searchBuys = () => {
//   setSearch("");
//   console.log(searchResult);
// };

// const filterData = dbBuys.filter((db) => db.detail === search);
// console.log(filterData);

{
  /* <Input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button text="検索" onClick={searchBuys} /> */
}
