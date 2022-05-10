export const normalizeNumber = (num: number): number => {
  if (num < 1) {
    return Number(num.toPrecision(5));
  }
  return Number(num.toFixed(3));
};
