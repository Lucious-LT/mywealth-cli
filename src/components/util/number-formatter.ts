export function NumberFormatter(num: number) : string {
  return Number(num)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function QuantityFormatter(num: number) : string {
  return Number(num)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}