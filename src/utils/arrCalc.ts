export const sumPrice = (price: number[]) => {
  return price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};
