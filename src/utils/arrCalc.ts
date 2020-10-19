type SumPrice = (param: number[]) => number;
export const sumPrice: SumPrice = (price) => {
  let sum = 0;
  if (price) {
    for (let i = 0; i < price.length; i++) {
      sum += price[i];
    }
    return sum;
  } else {
    return sum;
  }
};
