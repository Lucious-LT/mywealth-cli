import { InvestmentAccount } from "~/server/api/models/investing";

const CardHeader = ({
  title,
  status,
  usage,
  cashBalance,
  refCode,
  currency, mgmtType,
}: {
  title: string;
  status?: string;
  usage?: InvestmentAccount.accountUsage;
  cashBalance?: number;
  refCode?: string;
  currency?: string;
  mgmtType?: InvestmentAccount.mgmtType;
}) => {
  return (
    <>
      <div className="w-fit divide-y-1 divide-blue-gray-100 text-lg font-semibold capitalize leading-6 tracking-tight md:text-xl">
        <span className="">{title}</span>
        <div className="flex justify-between">
          <div className="mt-2 flex w-full flex-col">
            {status && (
              <div className="flex">
                <span className="sub-header mr-2">status:</span>
                <span
                  className={
                    status == InvestmentAccount.status.ACTIVE
                      ? "mr-4 flex items-center text-xs font-bold text-success"
                      : status == InvestmentAccount.status.CLOSED ||
                        status == InvestmentAccount.status.SUSPENDED
                        ? "mr-4 flex items-center text-xs font-bold text-error"
                        : "mr-4 flex items-center text-xs font-bold text-primary"
                  }
                >
                  {status}
                </span>
              </div>
            )}
            {usage && (
              <div className="flex">
                <span className="sub-header mr-2">usage:</span>
                <span
                  className={
                    usage == InvestmentAccount.accountUsage.PRACTICE
                      ? "flex items-center text-xs font-bold text-primary"
                      : "flex items-center text-xs font-bold text-error"
                  }
                >
                  {usage}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 ml-4 flex w-full flex-col">
            {cashBalance && (
              <div className="mr-4 flex">
                <span className="sub-header mr-2">balance:</span>
                <span className="flex items-center text-xs font-bold">
                  {cashBalance}
                </span>
              </div>
            )}
            {refCode && (
              <div className="flex">
                <span className="sub-header mr-2">ref:</span>
                <span className="flex items-center text-xs font-bold">
                  {refCode}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 ml-4 flex w-full flex-col">
            {currency && (
              <div className="mr-4 flex">
                <span className="sub-header mr-2">currency:</span>
                <span className="flex items-center text-xs font-bold">
                  {currency}
                </span>
              </div>
            )}
            {mgmtType && (
              <div className="flex">
                <span className="sub-header mr-2">mgmttype:</span>
                <span className="flex items-center text-xs font-bold">
                  {mgmtType}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CardHeader;
