export const sumPrice = (price: number[]) => {
  if (price.length) {
    return price.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }
  return price;
};
// type SumPrice = (param: number[]) => number;
// export const sumPrice: SumPrice = (price) => {
//   let sum = 0;
//   if (price) {
//     for (let i = 0; i < price.length; i++) {
//       sum += price[i];
//     }
//     return sum;
//   } else {
//     return sum;
//   }
// };
