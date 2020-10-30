import { sumData } from "./sameDaysCalc";
import { Sales, Buys } from "../types";

type CombineData = {
  date: firebase.firestore.Timestamp;
  salesPrice: number;
  buysPrice: number;
  detail: string;
  id: string;
};

/** 日付順にソート */
export const sort = (sortData: CombineData[]) => {
  return sumData(sortData).sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });
};
