import { type DateTime } from "luxon";
import { MoneyMarketProduct } from "~/server/api/models/investing";

export const maskAccountNumber = (num: string | undefined) => {
  if (num === undefined || num.length < 6) return num;
  const mask = "x".repeat(num.length - 6);
  return num.substring(0, 3) + mask + num.slice(-3);
};

export const formatCurrency = (num: number) => {
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
};

export const formatDate = (startDate: DateTime): string => {
  if (startDate === undefined)
    return "N/A";
  else return startDate.toFormat("yyyy-MM-dd");
};

export const formatErrorMssg = (message: string): string => {
  if (message == undefined) {
    return "N/A";
  } else return message.replaceAll(/[\{\}]/g, "");
};

export const formatStatus = (status: string | undefined): string => {
  if (status == undefined) {
    return "N/A";
  } else return status.replaceAll("_", " ");
};

export const capitalize = (word: string) => word?.toLowerCase().replace(/\b([a-zA-Z])/gm, match => match.toUpperCase());

export const capitalizeWords = (words: string) => words.split("_").map(word => word.toLowerCase().replace(/^[a-z]/, match => match.toUpperCase())).join(" ");

export const convertDate = (inputStr: string) => {
  // Split the input string into year, month, and day
  const [year, month, day] = inputStr.split("T")[0]!.split("-").map(Number);

  // Convert the components to strings with no leading zeros for day
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const resultStr = `${year ?? ""}, ${month ?? ""}, ${parseInt(day.toString(), 10)}`;

  return Number(new Date(resultStr));
};

export const formatMoneyWithSymbol = (currency: string, number: number): string => {
  //Convert the currency code to a symbol and append it to the formatted money
  let symbol = "";
  switch (currency) {
    case "USD":
      symbol = "$";
      break;
    case "EUR":
      symbol = "€";
      break;
    case "GBP":
      symbol = "£";
      break;
    case "NGN":
      symbol = "₦";
      break;
    default:
      symbol = currency;
  }

  return symbol + formatMoney(number);
};
export const formatMoney = (number: number): string => {
  // Convert the number to a fixed-point number with two decimal places
  let formattedMoney: string = number?.toFixed(2);

  // Add commas as thousands separators
  formattedMoney = formattedMoney?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedMoney;
};

function isLeapYear(dateString: string) {
  const year = parseInt(dateString.split("-")[0] ?? "");
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function subTractDates(date1: string, date2: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return (new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24);
}

export const formatNetProfit = (product: MoneyMarketProduct, faceValue: number) => {
  let dayCount: number;
  switch (product?.interestBasis) {
    case (MoneyMarketProduct.interestBasis.ACTUAL360 || MoneyMarketProduct.interestBasis.THIRTY360US || MoneyMarketProduct.interestBasis.THIRTY360EUROPEAN):
      dayCount = 360;
      break;
    case MoneyMarketProduct.interestBasis.ACTUAL364:
      dayCount = 364;
      break;
    case (MoneyMarketProduct.interestBasis.ACTUAL365 || MoneyMarketProduct.interestBasis.THIRTY365):
      dayCount = 365;
      break;
    case MoneyMarketProduct.interestBasis.ACTUAL_ACTUAL:
      dayCount = isLeapYear(new Date().toISOString().split("T")[0]!) ? 366 : 365;
      break;
    default:
      dayCount = 365;
  }
  const discRate = product?.interestConfig.defaultRate / 100;
  const maturityDate = product?.maturityDate ?? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]!;
  const startDate = new Date().toISOString().split("T")[0]!;
  const tenor = subTractDates(maturityDate, startDate);
  const termIntRate = discRate / (1 - discRate * tenor / dayCount);
  const termFaceValue = faceValue * (1 + termIntRate * tenor / dayCount);

  //Compute Interest amount
  const amount = termFaceValue - faceValue;

  //Discounted value
  const discountedValue = faceValue - amount;

  return { amount, discountedValue };
};

export function formatFileSize(fileSizeInBytes: number) {
  return (fileSizeInBytes / 1024).toFixed(2) + " KB";
}


export function formatCreatedAt(createdAt: string) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ⦿ ${hours}:${minutes}:${seconds}`;
}

export function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    // Subtracting 3 to account for the length of the ellipsis
    return text.substring(0, maxLength - 3) + "...";
  }
}
