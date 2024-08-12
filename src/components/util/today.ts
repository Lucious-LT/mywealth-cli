export const today = new Date();
export const todayAsString = today.toString();

export function todayFormatted() {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getIntDays(days: string | number) {
  return Number(days) * 86400000
}
