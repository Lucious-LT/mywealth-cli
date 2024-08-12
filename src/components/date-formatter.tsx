import { today } from "./util/today";

export function DateToStringFormatter(date: any) {
  let newDate = new Date(date);
  let newDateVal = newDate.toDateString().split(" ");
  let newDateFormat = `${newDateVal[1]} ${newDateVal[2]}, ${newDateVal[3]}`;

  return newDateFormat;
}

export function epochToDateStr(epoch: number) {
  var date = new Date(epoch);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  return year + "-" + month + "-" + day;
  // return new Date(date * 1000);
}

export function getDays(st_date: string | number, ed_date: string | number) {
  var end_date = new Date(ed_date);
  var start_date = new Date(st_date);
  var diff = end_date.valueOf() - start_date.valueOf();
  var days = Math.ceil(diff / (1000 * 3600 * 24));

  return days;
}

export function getEndDate(tenor: number) {
  var date = new Date(today.getTime() + 1000 * 60 * 60 * 24);
  var end_date_ = date.setDate(date.getDate() + tenor);
  var end_date = new Date(end_date_).toString();

  return end_date;
}

export default function Data() {
  return <></>;
}
