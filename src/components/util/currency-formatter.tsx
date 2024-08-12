import {
  TbCurrencyNaira,
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
} from "react-icons/tb";

export const currencyIcon = {
  ngn: <TbCurrencyNaira />,
  usd: <TbCurrencyDollar />,
  eur: <TbCurrencyEuro />,
  gbp: <TbCurrencyPound />,
};
export function CurrencyFormatter(currency: string|undefined) {
  if (currency === "NGN") return <TbCurrencyNaira />;
  else if (currency === "USD") return <TbCurrencyDollar />;
  else if (currency === "EUR") return <TbCurrencyEuro />;
  else return <TbCurrencyPound />;

}


export function AmountCurrencyFormatter(amount: string, currency: string) {
  if (currency == "NGN") return <TbCurrencyNaira /> + " " + amount;
  else if (currency == "USD") return <TbCurrencyDollar /> + " " + amount;
  else if (currency == "EUR") return <TbCurrencyEuro /> + " " + amount;
  else return <TbCurrencyPound /> + " " + amount;
}

export const currencyOptions = [
  { value: "NGN", label: "Nigerian Naira" },
  { value: "USD", label: "United States Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "Pound Sterling" },
];


export default function Data() {
  return (<></>);
}