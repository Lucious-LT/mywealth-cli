import { getDays } from "./date-formatter";
import { todayAsString } from "./today";

export default function progressBar(
  st_date: string | number,
  ed_date: string | number
) {
  const accrued_days = getDays(st_date, todayAsString);
  const tenor_days = getDays(st_date, ed_date);
  const progress = (accrued_days / tenor_days) * 100;
  return progress >= 100 ? 100 : progress;
}
