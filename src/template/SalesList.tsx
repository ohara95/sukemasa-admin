import React, { FC } from "react";
import { db } from "../config/firebese";
import { format } from "date-fns";
import { changeDisplayList } from "../utils";
import { Sales, ToggleTable } from "../types";

type Props = {
  dbSales: Sales[];
  toggleTable: ToggleTable;
  choiceMonth: string;
  editSales: string;
  setEditSales: (param: string) => void;
};

/** 売上一覧 */
const SalesList: FC<Props> = ({
  dbSales,
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
    const findChecked = dbSales.find((db) => db.id === id)?.isChecked;
    if (editSales) {
      salesRef
        .doc(id)
        .update({
          salesPrice: parseInt(editSales),
          isChecked: false,
        })
        .then(() => {
          setEditSales("");
        });
    } else {
      salesRef.doc(id).update({
        isChecked: !findChecked,
      });
    }
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
              <button
                id={db.id}
                onClick={() => {
                  upDateSales(db.id);
                }}
                className={`text-teal-500 ${
                  db.isChecked ? "fas fa-check" : "far fa-edit"
                } focus:outline-none`}
              />
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
              {db.isChecked ? (
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
