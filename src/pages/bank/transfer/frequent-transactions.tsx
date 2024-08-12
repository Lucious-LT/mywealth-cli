import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";
import React from "react";
import { DateToStringFormatter } from "~/components/util/date-formatter";

export default function FrequentTransactions({ getData }: { getData: any }) {
  // Load the accounts
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id ?? "";

  const { isLoading: isBeneficiaryLoading, data: beneficiaries } =
    api.banking.getTransferBeneficiariesByUserId.useQuery(userId, {
      staleTime: 1000 * 60 * 5,
    });

  const { isLoading: isTransferLoading, data: transfers } =
    api.banking.getRecentTransfersByUserId.useQuery(userId, {
      staleTime: 1000 * 60 * 5,
    });

  return (
    <Tabs value="saved_beneficiaries" className="rounded-md ">
      <TabsHeader className="" placeholder={""}>
        <Tab value="saved_beneficiaries" className="text-xs font-medium" placeholder={""}>
          Saved Beneficiaries
        </Tab>
        <Tab value="recent_transfers" className="text-xs font-medium" placeholder={""}>
          Recent Transfers
        </Tab>
      </TabsHeader>
      <TabsBody placeholder={""}>
        <TabPanel value="saved_beneficiaries">
          <div className="grid grid-flow-row grid-cols-3 gap-4">
            {beneficiaries &&
              beneficiaries
                .filter(
                  (beneficiary) => beneficiary.destinationType === "EXTERNAL"
                )
                .map((beneficiary) => (
                  <div
                    className="transform cursor-pointer space-y-3 rounded-lg bg-gray-50 p-2 transition duration-700 ease-out hover:scale-110 hover:shadow-md"
                    key={beneficiary.id}
                    onClick={() => {
                      getData(beneficiary);
                    }}
                  >
                    <div className="text-xs font-medium capitalize text-gray-800">
                      {beneficiary.destAccountLabel}
                    </div>
                    <div className="flex flex-col space-y-1 text-[10px]">
                      <span>{beneficiary.destAccountNo}</span>
                      <span>{beneficiary.institutionLabel}</span>
                    </div>
                  </div>
                ))}
          </div>
        </TabPanel>
        <TabPanel value="recent_transfers">
          <div className="grid grid-flow-row grid-cols-4 gap-4">
            {transfers &&
              transfers.map((transfer) => (
                <div
                  className="transform space-y-1 rounded-lg bg-gray-50 p-2"
                  key={transfer.id}
                >
                  <div className="text-xs font-medium capitalize text-gray-800">
                    {transfer.destAccountLabel}
                  </div>
                  <div className="flex flex-col space-y-1 text-[10px]">
                    <span>{`${transfer.destAccountNo} (${transfer.institutionLabel}) - ${transfer.status}`}</span>
                    <div className="flex items-center text-[10px] font-semibold">
                      <span>{CurrencyFormatter(transfer.currency)}</span>
                      <span>{NumberFormatter(+transfer.amount)}</span>
                    </div>
                    <span>
                      {`${DateToStringFormatter(
                        transfer.transactionDate.toString()
                      )} ${transfer.transactionDate.toString().split(" ")[4]}`}
                    </span>
                    <span>{transfer.reference}</span>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
