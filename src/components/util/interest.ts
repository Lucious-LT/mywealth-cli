export default function investmentInterest(amount: number, intRate: number, tenor: number) {
  const total_int = amount * (intRate / 100);
  const daily_int = total_int / tenor;

  return { total_int: total_int, daily_int: daily_int };
}

export function expectedInterest(amount: number, intRate: number, tenor: number) {
  return ((tenor * intRate * amount) / (365 * 100))
}
