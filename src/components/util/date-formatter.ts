import { today } from "./today";

export function DateToStringFormatter(date: string | Date | number) {
  //If the date argument is as String append 'T00:00:00Z' before converting to Date
  const newDate = typeof date === "string" ? new Date(date + "T00:00:00Z") : new Date(date);
  const newDateVal = newDate.toUTCString().split(" ");
  return `${newDateVal[1] ?? ""} ${newDateVal[2] ?? ""}, ${newDateVal[3] ?? ""}`;
}

export function epochToDateStr(epoch: number) {
  const date = new Date(epoch);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function getDays(st_date: string | number, ed_date: string | number) {
  const end_date = new Date(ed_date);
  const start_date = new Date(st_date);
  const diff = end_date.valueOf() - start_date.valueOf();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

export function getEndDate(tenor: number) {
  const date = new Date(today.getTime() + 1000 * 60 * 60 * 24);
  const end_date_ = date.setDate(date.getDate() + tenor);
  return new Date(end_date_).toString();
}

export function daysToday(st_date: string) {
  const start_date = new Date(st_date);
  const diff = today.valueOf() - start_date.valueOf();
  return Math.ceil(diff / (1000 * 3600 * 24));
}



