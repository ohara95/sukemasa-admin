type SalesProps = {
  date: firebase.firestore.Timestamp;
  salesPrice?: number;
  id: string;
};
type BuysProps = {
  detail?: string;
  buysPrice?: number;
  date: firebase.firestore.Timestamp;
  id: string;
};

/** 同じ日付の金額足し算 */
export const sumData = (selectData: (SalesProps & BuysProps)[]) => {
  const res = [];
  for (const key of selectData) {
    const item = res.find((item) => key.date.seconds === item.date.seconds);
    if (item) {
      // resで作った配列にpush
      if (item.detail && key.detail) {
        item.detail.push(key.detail);
      }
      if (item.buysPrice && key.buysPrice) {
        item.buysPrice.push(key.buysPrice);
      }
      if (item.salesPrice && key.salesPrice) {
        item.salesPrice.push(key.salesPrice);
      }
      continue;
    }
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
  return res;
};
