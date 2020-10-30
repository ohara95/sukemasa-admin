import { format } from "date-fns";
import { toMonth } from "./month";
import { sumPrice } from "./arrCalc";
import firebase from "../config/firebese";
import { ToggleTable } from "../types";

type PriceArr = {
  date: firebase.firestore.Timestamp;
  price: number;
};

/** グラフ選択に合わせてデータを計算 */
export const dbSumCalc = (
  toggleTable: ToggleTable,
  priceArr: PriceArr[],
  chooseBtn: string
) => {
  if (toggleTable === "chooseMonth") {
    const filterPrice = priceArr.filter(
      (data) => format(data.date.toDate(), "MM") === chooseBtn
    );
    if (filterPrice) return sumPrice(filterPrice.map((data) => data.price));
  } else if (toggleTable === "months") {
    const filterPrice = priceArr.filter(
      (data) => parseInt(format(data.date.toDate(), "MM")) === toMonth
    );
    if (filterPrice) return sumPrice(filterPrice.map((data) => data.price));
  } else {
    if (priceArr) return sumPrice(priceArr.map((data) => data.price));
  }
};
