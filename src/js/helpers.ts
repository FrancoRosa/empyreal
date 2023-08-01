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

export const toMinSec = (ms: number) => {
  if (ms > 0) {
    const seconds = Math.round(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  } else return "00:00";
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
