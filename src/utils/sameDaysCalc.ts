import { sumPrice } from "./arrCalc";
type CombineData = {
  date: firebase.firestore.Timestamp;
  salesPrice: number | number[];
  buysPrice: number | number[];
  detail: string | string[];
  id: string;
};
// type SalesProps = {
//   date: firebase.firestore.Timestamp;
//   salesPrice: number;
//   id: string;
// };
// type BuysProps = {
//   detail?: string;
//   buysPrice?: number;
//   date: firebase.firestore.Timestamp;
//   id: string;
// };

/** 同じ日付の金額を配列にまとめる */
export const sumData = (selectData: CombineData[]) => {
  const res = [];
  for (const key of selectData) {
    const item = res.find((item) => key.date.seconds === item.date.seconds);
    if (item) {
      // resで作った配列にpush
      // 同じ日付のデータのみ
      if (item.detail && key.detail) item.detail.push(key.detail);
      if (item.buysPrice && key.buysPrice) item.buysPrice.push(key.buysPrice);
      if (item.salesPrice && key.salesPrice)
        item.salesPrice.push(key.salesPrice);
    } else {
      if (key.detail && key.buysPrice) {
        if (key.salesPrice) {
          res.push({
            ...key,
            buysPrice: [key.buysPrice],
            salesPrice: [key.salesPrice],
            detail: [key.detail],
          });
        } else {
          res.push({
            ...key,
            buysPrice: [key.buysPrice],
            salesPrice: [],
            detail: [key.detail],
          });
        }
      } else if (key.salesPrice) {
        res.push({
          ...key,
          buysPrice: [],
          salesPrice: [key.salesPrice],
          detail: [],
        });
      }
    }
  }
  return res;
};

// const test = (selectData: CombineData[]) => {
//   const newArr: CombineData[] = [];
//   const set = new Set();
//   selectData.forEach((dateCheck) => {
//     if (set.has(dateCheck.date)) {
//       newArr.forEach((el, i) => {
//         if (dateCheck.date === el.date) {
//           (newArr[i].buysPrice as number) += el.buysPrice as number;
//           (newArr[i].salesPrice as number) += el.salesPrice as number;
//         }
//       });
//     } else {
//       newArr.push(dateCheck.date);
//     }
//   });
//   return newArr;
// };
