export const monetize = (num) => {
  if (num) {
    return "$" + num.toFixed(2);
  } else {
    return " ";
  }
};
