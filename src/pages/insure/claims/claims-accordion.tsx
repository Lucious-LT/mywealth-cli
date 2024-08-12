import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Collapse } from "react-collapse";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";
import { DateToStringFormatter } from "~/components/util/date-formatter";


export const ClaimAccordion = ({
  open,
  toggle,
  label,
  claimNo,
  // carrier,
  refNo,
  policyNo,
  amount,
  currency,
  claimDate,
  status,
  updatedDate,
  updatedTime,
  children,
}: {
  open: boolean;
  toggle: any;
  label: string;
  claimNo: string;
  // carrier: string;
  refNo: string;
  policyNo: string | null;
  amount: number | null;
  currency: string;
  claimDate: string;
  status: string;
  updatedDate: any;
  updatedTime: any;
  children: any;
}) => {
  return (
    <>
      <section>
        <div
          className={`${open
            ? ` bg-gray-700 text-white shadow`
            : `bg-transparent hover:bg-gray-100 `
            } flex cursor-pointer items-center justify-between rounded-md p-4 transition-all duration-700 ease-in-out`}
          onClick={toggle}
        >
          <div className="flex items-center space-x-4">
            <span className="text-lg">
              {open ? <HiChevronUp /> : <HiChevronDown />}
            </span>
            <div className="flex flex-col space-y-6">
              {/* <div className="flex items-center space-x-4 text-xs ">
                <span className="badges">Claim #</span>
                <span className="font-semibold">{claimNo}</span>
              </div> */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{label}</span>
                <div>
                  <span className="badges">{claimNo}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="sub-header">Reference #</span>
              <span className="text-sm font-semibold">{refNo}</span>
            </div>
            <div className="flex flex-col ">
              <span className="sub-header">Claim date</span>
              <span className="text-sm font-semibold">
                {`${DateToStringFormatter(claimDate)}`}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="sub-header">Policy #</span>
              <span className="text-sm font-semibold">{policyNo}</span>
            </div>
            <div className="flex flex-col ">
              <span className="sub-header">Estimated Amount</span>
              <div className="flex items-center space-x-2 font-semibold">
                <span className="text-lg">{CurrencyFormatter(currency)}</span>
                <span className="text-sm">{NumberFormatter(amount as number)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <span className="pills pills-secondary bg-gray-200">{status}</span>
            <div className="flex flex-col ">
              <span className="sub-header">Last updated</span>
              <span className="text-sm font-semibold">
                {`${DateToStringFormatter(updatedDate as Date )} ${updatedTime as string}`}
              </span>
            </div>
          </div>
        </div>
        <Collapse isOpened={open}>
          {children}
        </Collapse>
      </section>
    </>
  );
};

export default function Data() {
  return <></>;
}
