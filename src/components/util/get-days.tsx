import { today } from "./today";

export default function getDays(st_date: string, ed_date: string) {
  const end_date = new Date(ed_date);
  const start_date = new Date(st_date);
  const diff = end_date.valueOf() - start_date.valueOf();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

export function daysToday(st_date: string) {
  const start_date = new Date(st_date);
  const diff = today.valueOf() - start_date.valueOf();
  return Math.ceil(diff / (1000 * 3600 * 24));
}


export function getEndDate(tenor: number) {
  const date = new Date(today.getTime() + 1000 * 60 * 60 * 24);
  const end_date_ = date.setDate(date.getDate() + tenor);
  return new Date(end_date_).toString();
}
