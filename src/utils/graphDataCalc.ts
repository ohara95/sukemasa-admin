import { sumData } from "./sameDaysCalc";
import { format } from "date-fns";
import { toMonth } from "./month";
import { sumPrice } from "./arrCalc";
import { CombineData } from "../types";

/** 今月のグラフデータ */
export const graphData = (dbData: CombineData[]) => {
  return sumData(dbData)
    .filter((data) => parseInt(format(data.date.toDate(), "MM")) === toMonth)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: Array.isArray(data.salesPrice)
          ? data.salesPrice[0]
          : data.salesPrice,
        経費: Array.isArray(data.buysPrice)
          ? data.buysPrice[0]
          : data.buysPrice,
      };
    });
};

/** 年間のグラフデータ */
export const allMonthData = (dbData: CombineData[]) => {
  const arr = [];
  const totalData = sumData(dbData);

  for (const key of totalData) {
    const item = arr.find((data) => {
      const itemDate = format(data.date.toDate(), "MM");
      const keyDate = format(key.date.toDate(), "MM");
      return itemDate === keyDate;
    });
    if (item) {
      Array.prototype.push.apply(item.buysPrice, key.buysPrice);
      Array.prototype.push.apply(item.salesPrice, key.salesPrice);
      continue;
    }
    arr.push({ ...key });
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

/** 月指定のグラフデータ */
export const chooseGraphData = (dbData: CombineData[], chooseBtn: string) => {
  return sumData(dbData)
    .filter((data) => format(data.date.toDate(), "MM") === chooseBtn)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: Array.isArray(data.salesPrice)
          ? data.salesPrice[0]
          : data.salesPrice,
        経費: Array.isArray(data.buysPrice)
          ? data.buysPrice[0]
          : data.buysPrice,
      };
    });
};
