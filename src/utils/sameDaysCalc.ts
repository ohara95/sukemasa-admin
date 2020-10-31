import { CombineData } from "../types";

/** 同じ日付の金額を合算 */
export const sumData = (selectData: CombineData[]) => {
  const res = [];
  for (const key of selectData) {
    const item = res.find((item) => key.date.seconds === item.date.seconds);
    if (item) {
      // resで作った配列にpush
      // 同じ日付のデータのみ
      if (item.detail && key.detail) {
        item.detail.push(key.detail);
      }
      if (item.buysPrice && key.buysPrice) {
        if (Array.isArray(item.buysPrice)) item.buysPrice.push(key.buysPrice);
      }
      if (item.salesPrice && key.salesPrice) {
        if (Array.isArray(item.salesPrice))
          item.salesPrice.push(key.salesPrice);
      }
    } else {
      const buysPrice = Array.isArray(key.buysPrice)
        ? key.buysPrice
        : [key.buysPrice];
      const salesPrice = Array.isArray(key.salesPrice)
        ? key.salesPrice
        : [key.salesPrice];
      const detail = Array.isArray(key.detail) ? key.detail : [key.detail];

      if (key.detail && key.buysPrice) {
        if (key.salesPrice) {
          res.push({
            ...key,
            buysPrice,
            salesPrice,
            detail,
          });
        } else {
          res.push({
            ...key,
            buysPrice,
            salesPrice: [0],
            detail,
          });
        }
      } else if (key.salesPrice) {
        res.push({
          ...key,
          buysPrice: [0],
          salesPrice,
          detail: [] as string[],
        });
      }
    }
  }
  return res;
};
