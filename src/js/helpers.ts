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

export const formatDate = (input: string) => {
  // input format: "230731150019"
  const year = input.slice(0, 2);
  const month = input.slice(2, 4);
  const day = input.slice(4, 6);
  const hour = input.slice(6, 8);
  const minute = input.slice(8, 10);
  const second = input.slice(10, 12);

  const formattedDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

  return formattedDate;
};
