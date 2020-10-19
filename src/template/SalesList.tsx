import React, { FC } from "react";
import { db } from "../config/firebese";
import { format } from "date-fns";
import { changeDisplayList } from "../utils";
import { Sales, ToggleTable } from "../types";

type Props = {
  dbSales: Sales[];
  salesEdit: boolean;
  setSalesEdit: (param: boolean) => void;
  salesEditId: string;
  setSalesEditId: (param: string) => void;
  salesPrice: string;
  setSalesPrice: (param: string) => void;
  toggleTable: ToggleTable;
  choiceMonth: string;
};

/** 売上一覧 */
const SalesList: FC<Props> = ({
  dbSales,
  salesEdit,
  setSalesEdit,
  salesEditId,
  setSalesEditId,
  salesPrice,
  setSalesPrice,
  toggleTable,
  choiceMonth,
}) => {
  const salesRef = db
    .collection("management")
    .doc("NcmaRejmRabdytHQfbKU")
    .collection("sales");

  /** 売上項目編集 */
  const upDateSales = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setSalesPrice("");
    setSalesEdit(false);
    if (salesPrice) {
      salesRef
        .doc(id)
        .get()
        .then((res) => {
          res.ref.update({
            salesPrice: parseInt(salesPrice),
          });
        });
    }
  };

  /** 押した編集ボタンのID取得(売上) */
  const inputPossible = (id: string) => {
    setSalesEdit(!salesEdit);
    return dbSales.map((db) => {
      if (id === db.id) setSalesEditId(db.id);
    });
  };

  /** 売上削除 */
  const deleteSales = (id: string) => {
    salesRef
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      })
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
                onClick={(e) => {
                  inputPossible((e.target as HTMLInputElement).id);
                }}
                className="text-teal-500 far fa-edit focus:outline-none"
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
              {salesEdit && salesEditId === db.id ? (
                <form
                  onSubmit={(e) => {
                    upDateSales(e, db.id);
                  }}
                >
                  <input
                    type="number"
                    value={salesPrice}
                    onChange={(e) => {
                      setSalesPrice(e.target.value);
                    }}
                    placeholder={db.salesPrice}
                  />
                  <button
                    type="submit"
                    className="fas fa-check focus:outline-none"
                  />
                </form>
              ) : (
                <p className="text-l">{db.salesPrice.toLocaleString()}円</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SalesList;
