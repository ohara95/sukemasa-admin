export const sumPrice = (price: number[]) => {
  if (price.length) {
    return price.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }
  return price;
};
