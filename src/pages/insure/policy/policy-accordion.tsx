import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Collapse } from "react-collapse";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";

export const PolicyAccordion = ({
  open,
  toggle,
  label,
  premium,
  currency,
  code,
  date,
  status,
  children,
}: {
  open: boolean;
  toggle: any;
  label: string;
  premium: number;
  currency: string;
  code: string;
  date: string;
  status: string;
  children: any;
}) => {
  return (
    <>
      <section>
        <div
          className={`${open
            ? ` bg-gray-700 text-white shadow`
            : `bg-transparent hover:bg-gray-100 `
            } grid cursor-pointer grid-cols-6 gap-4 rounded-md p-4 transition-all duration-700 ease-in-out`}
          onClick={toggle}
        >
          <div className="col-span-2">
            <div className="flex items-center space-x-4 text-sm leading-4 tracking-tight">
              <span className="text-lg">
                {open ? <HiChevronUp /> : <HiChevronDown />}
              </span>
              <div className="flex flex-col space-y-2">
                <span className="font-semibold capitalize">{label}</span>
                <div>
                  <span className="badges">{code}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="sub-header">Premium</span>
            <div className=" flex items-center text-sm font-semibold">
              <span>{CurrencyFormatter(currency)} </span>
              <span>{NumberFormatter(premium)}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="sub-header">Effective Date</span>
            <span className="text-sm font-semibold">{date}</span>
          </div>

          <div>
            <span
              className={`${open ? `bg-white text-gray-700` : `bg-blue-200 text-primary`
                } rounded-full  px-3 py-1 text-center text-xs font-semibold`}
            >
              {status}
            </span>
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
