export const monetize = (num: number) => {
  if (num) {
    return "$" + num.toFixed(2);
  } else {
    return " ";
  }
};

export const getLang = () => {
  if (typeof navigator !== "undefined") {
    return navigator.language.split("-")[0] || "en";
  }
  return "en";
};
