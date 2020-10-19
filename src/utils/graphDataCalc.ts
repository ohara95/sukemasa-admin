import { sumData } from "./sameDaysCalc";
import { format } from "date-fns";
import { toMonth } from "./month";
import { sumPrice } from "./arrCalc";
import { Sales, Buys } from "../types";

//今月
export const graphData = (dbData: (Sales | Buys)[]) => {
  return sumData(dbData)
    .filter((data) => parseInt(format(data.date.toDate(), "MM")) === toMonth)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice),
        経費: sumPrice(data.buysPrice),
      };
    });
};

//年間
export const allMonthData = (dbData: (Sales | Buys)[]) => {
  let arr = [];
  const totalData = sumData(dbData);

  for (const key of totalData) {
    const item = arr.find(
      (data) =>
        format(data.date.toDate(), "MM") === format(key.date.toDate(), "MM")
    );
    if (item) {
      if (item.buysPrice) {
        Object.assign(item.buysPrice, key.buysPrice);
      }
      if (item.salesPrice) {
        Object.assign(item.salesPrice, key.salesPrice);
      }
      continue;
    }
    arr.push({
      ...key,
    });
  }
  const newArr = arr.map((data) => {
    return {
      日付: `${format(data.date.toDate(), "MM")}月`,
      売上: sumPrice(data.salesPrice),
      経費: sumPrice(data.buysPrice),
    };
  });
  return newArr;
};

//選択
export const chooseGraphData = (
  dbData: (Sales | Buys)[],
  chooseBtn: string
) => {
  return sumData(dbData)
    .filter((data) => format(data.date.toDate(), "MM") == chooseBtn)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice),
        経費: sumPrice(data.buysPrice),
      };
    });
};
