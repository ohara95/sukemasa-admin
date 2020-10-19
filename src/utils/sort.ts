import { sumData } from "./sameDaysCalc";
import { Sales, Buys } from "../types";

/** 日付順にソート */
export const sort = (sortData: (Sales | Buys)[]) => {
  return sumData(sortData).sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });
};
