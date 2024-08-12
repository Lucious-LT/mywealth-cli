import React from "react";
import { type NextPage } from "next";
import CardHeader from "~/components/layout/card-header";
import classNames from "classnames";
import { NumberFormatter } from "~/components/util/number-formatter";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { maskAccountNumber } from "~/utils/format";
import Table from "~/components/ui/table";
import THead from "~/components/ui/table/thead/thead";
import TheadItem from "~/components/ui/table/thead/thead-item";
import TBody from "~/components/ui/table/tbody/tbody";
import TBodyRow from "~/components/ui/table/tbody/tbody-row";
import TBodyItem from "~/components/ui/table/tbody/tbody-item";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { RemoveUnderScore } from "~/components/util/string-formatter";

const Account_id: NextPage = () => {
  const router = useRouter();

  // ---Client account id
  const selectedAccountId = router.query.account_id as string;

  const { data: account, isLoading: loadingAccount } =
    api.banking.getLoanAccountById.useQuery(selectedAccountId, {
      enabled: selectedAccountId !== "" && selectedAccountId !== undefined,
      staleTime: 1000 * 60 * 5,
    });

  return (
    <>
      {/* <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 p-4"> */}
      <div className="mb-8 flex items-end justify-between">
        <CardHeader title="payment schedule" />
        <div className="flex items-center justify-end gap-12">
          <div
            className={classNames(
              loadingAccount ? "space-y-1" : "",
              "flex flex-col"
            )}
          >
            {loadingAccount ? (
              <>
                <span className="skeleton-label "></span>
                <span className="skeleton-label "></span>
              </>
            ) : (
              <>
                <span className="text-base font-semibold">
                  {account?.accountLabel}
                </span>
                <div>
                  <span className="badges">
                    {maskAccountNumber(account?.accountNo)}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-2 ">
            {loadingAccount ? (
              <div className="flex items-center justify-end">
                <span className="skeleton-label"></span>
              </div>
            ) : (
              <div className="flex items-center justify-end text-base font-semibold">
                <span>{CurrencyFormatter(account?.currency)}</span>
                <span>{NumberFormatter(account?.balance as number)}</span>
              </div>
            )}

            <span className="sub-header text-right">Total paid</span>
          </div>
        </div>
        {/* )} */}
      </div>

      {/* Payment Schedule  */}
      <div className=" my-10 overflow-hidden ">
        {/* table */}
        <Table>
          <THead>
            <TheadItem label="Date" />
            <TheadItem label="Fees" />
            <TheadItem label="Tax" />
            <TheadItem label="Interest" />
            <TheadItem label="Principal" />
            <TheadItem label="Amount Due" />
            <TheadItem label="Balance" />
            <TheadItem label="Status" />
          </THead>
          <TBody>
            {account?.loanPaymentSchedule.map((schedule) => (
              <TBodyRow key={schedule.id}>
                <TBodyItem label={schedule.dueDate} />
                <TBodyItem label={schedule.fees} />
                <TBodyItem label={schedule.taxes} />
                <TBodyItem label={schedule.interest} />
                <TBodyItem label={schedule.minimumDue} />
                <TBodyItem label={schedule.principal} />
                <TBodyItem label={schedule.balance} />
                <TBodyItem label={RemoveUnderScore(schedule.status)} />
              </TBodyRow>
            ))}
          </TBody>
        </Table>
      </div>
      {/* </div> */}
      {/* <div className="custom-card mb-20">
          <div className="mb-8 flex items-center justify-between">
            <CardHeader title="Application Details" />
           
          </div>
          <div className="text-xs font-medium">
            <>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-500">Loan Type</span>
                  <span className="capitalize">
                    {TitleCase(RemoveUnderScore(account?.loanType))}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500"></span>
                  <span>{`${account?.currency} ${NumberFormatter(
                    account?.disbursementPrincipal ?? 0
                  )}`}</span>
                </li>
              </ul>
              <div className="my-4 flex items-center justify-between font-semibold">
                <hr className="w-full " />
                <span className="w-full text-sm ">
                  Disbursement
                </span>
                <hr className="w-full" />
              </div>

              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="capitalize">
                    {account?.disbursementDate}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span>{`${account?.currency} ${NumberFormatter(
                    account?.disbursementPrincipal ?? 0
                  )}`}</span>
                </li>
                
              </ul>
            </>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Account_id;
