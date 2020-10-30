import React, { FC } from "react";
import { db } from "../config/firebese";
import { format } from "date-fns";
import { changeDisplayList } from "../utils";
import { Sales, ToggleTable } from "../types";

type Props = {
  dbSales: Sales[];
  isSalesEdit: boolean;
  setIsSalesEdit: (param: boolean) => void;
  salesEditId: string;
  setSalesEditId: (param: string) => void;
  toggleTable: ToggleTable;
  choiceMonth: string;
  editSales: string;
  setEditSales: (param: string) => void;
};

/** 売上一覧 */
const SalesList: FC<Props> = ({
  dbSales,
  isSalesEdit,
  setIsSalesEdit,
  salesEditId,
  setSalesEditId,
  toggleTable,
  choiceMonth,
  editSales,
  setEditSales,
}) => {
  const salesRef = db
    .collection("management")
    .doc("NcmaRejmRabdytHQfbKU")
    .collection("sales");

  const upDateSales = (id: string) => {
    setIsSalesEdit(!isSalesEdit);
    if (editSales) {
      salesRef
        .doc(id)
        .update({
          salesPrice: parseInt(editSales),
        })
        .then(() => {
          setEditSales("");
        });
    }
  };

  /** 押した編集ボタンのID取得(売上) */
  const inputPossible = (id: string) => {
    setIsSalesEdit(!isSalesEdit);
    return dbSales.map((db) => {
      if (id === db.id) setSalesEditId(db.id);
    });
  };

  /** 売上削除 */
  const deleteSales = (id: string) => {
    salesRef
      .doc(id)
      .delete()
      .catch((e) => console.log(e));
  };

  return (
    <>
      {changeDisplayList(toggleTable, dbSales, choiceMonth).map((db: any) => {
        return (
          <div key={db.id}>
            <div className="flex mt-2">
              {isSalesEdit && salesEditId === db.id ? (
                <button
                  id={db.id}
                  onClick={(e) => {
                    upDateSales((e.target as HTMLInputElement).id);
                  }}
                  className="text-teal-500 fas fa-check focus:outline-none"
                />
              ) : (
                <button
                  id={db.id}
                  onClick={(e) => {
                    inputPossible((e.target as HTMLInputElement).id);
                  }}
                  className="text-teal-500 far fa-edit focus:outline-none"
                />
              )}

              <button
                onClick={() => {
                  deleteSales(db.id);
                }}
                className="text-teal-500 py-1 px-2 far fa-trash-alt focus:outline-none"
              />
              <p className="text-l mr-2">
                {format(db.date.toDate(), "MM/dd")}
                &nbsp;
              </p>
              {isSalesEdit && salesEditId === db.id ? (
                <input
                  type="number"
                  value={editSales}
                  onChange={(e) => {
                    setEditSales(e.target.value);
                  }}
                  placeholder={db.salesPrice}
                />
              ) : (
                <p className="text-l">{db.salesPrice?.toLocaleString()}円</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SalesList;
