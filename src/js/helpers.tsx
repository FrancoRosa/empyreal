export const monetize = (num: number) => {
  if (num) {
    return "$" + num.toFixed(2);
  } else {
    return " ";
  }
};
