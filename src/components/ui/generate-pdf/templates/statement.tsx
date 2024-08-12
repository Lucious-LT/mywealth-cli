import Image from "next/image";
import amazon from "public/images/amazon.png";
import { StatementView } from "~/server/api/models/reports";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { NumberFormatter } from "~/components/util/number-formatter";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const StatementTemplate = ({
  statement,
  clientData,
  companyData,
}: {
  statement: StatementView;
  clientData: any;
  companyData: any;
}) => {

  const { data: sessionData } = useSession();
  const clientId = sessionData?.user?.clientId ?? ""

  const { data: client } = api.profile.findByClientId.useQuery({ clientId }, {
    enabled: clientId !== "" && clientId !== undefined,
    staleTime: 1000 * 60 * 5,
  })
  return (
    <div className="space-y-24 p-10">
      {/* Header */}
      <div className="relative flex items-center justify-between gap-10">
        <div className="space-y-10">
          <div className="flex items-center divide-x-1 divide-gray-200">
            <div className="grid place-content-center pr-4">
              <Image
                src={amazon}
                alt="image"
                className="h-36 w-36 rounded-full object-cover"
              />
            </div>
            <ul className="flex flex-col space-y-1 pl-4 text-xs">
              <li>MyWealth</li>
              <li>5B, Omorinre Johnson Street</li>
              <li>Lekki Phase 1, Lagos 101245</li>
              <li>09087667800</li>
              <li>support@mywealthcare.io</li>
              <li>mywealthcare.io</li>
            </ul>
          </div>
          <div className="flex items-center divide-x-1 divide-gray-200">
            <div className="grid place-content-center pr-4">
              <Image
                src={amazon}
                alt="image"
                className="h-36 w-36 rounded-full object-cover"
              />
            </div>
            <ul className="flex flex-col space-y-1 pl-4 text-xs">
              <li>{client?.label ?? ""}</li>
              {/* @ts-ignore */}
              <li>{client?.address[0]?.addressLine1 ?? ""}</li>
              {/* @ts-ignore */}
              <li>{`${client?.address[0]?.city} ${client?.address[0]?.state}, ${client?.address[0]?.city}` ?? ""}</li>
              <li>{client?.mobileNo ?? ""}</li>
              <li>{client?.email ?? ""}</li>
            </ul>
          </div>
        </div>
        <div className="absolute top-0 right-0  flex items-center gap-4">
          <div className="flex flex-col space-y-1">
            <div className="text-left text-gray-600">Account</div>
            <div className="text-left text-gray-600">Start date</div>
            <div className="text-left text-gray-600">End date</div>
            <div className="text-left text-gray-600">Product</div>
            <div className="text-left text-gray-600">Type</div>
            <div className="text-left text-gray-600">Balance</div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-gray-900">{`#${statement?.accountNo ?? ""
              }`}</span>
            <span className="font-semibold text-gray-900">
              {DateToStringFormatter(statement?.startDate) ?? ""}
            </span>
            <span className="font-semibold text-gray-900">
              {DateToStringFormatter(statement?.endDate) ?? ""}
            </span>
            <span className="font-semibold text-gray-900">
              {statement?.glAccountType ?? ""}
            </span>
            <span className="font-semibold text-gray-900">
              {statement?.subAccountType ?? ""}
            </span>
            <span className="font-semibold text-gray-900">
              {statement?.closingBalance ?? ""}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="mx-10  rounded text-gray-600 antialiased shadow md:block">
        <div className="flex h-full flex-col justify-center">
          <div className="shadow-xs mx-auto w-full rounded-sm bg-white">
            <div className="overflow-x-auto">
              <div className="w-auto">
                <div className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-500">
                  <div className="grid grid-cols-7 gap-2">
                    <div className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Date</div>
                    </div>
                    <div className="col-span-2 whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Description</div>
                    </div>
                    <div className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Channel</div>
                    </div>
                    <div className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Type</div>
                    </div>
                    <div className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Amount</div>
                    </div>
                    <div className="w-10 whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Balance</div>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 text-xs">
                  {statement?.statementLines.map((line) => (
                    <div key={line.refNo} className="grid grid-cols-7 gap-2">
                      <div className="whitespace-nowrap p-2">
                        <div className="text-left font-medium sm:truncate sm:text-clip">
                          {line.tranDate}
                        </div>
                      </div>
                      <div className="col-span-2 whitespace-nowrap p-2">
                        <div className="flex items-center">
                          <div className="truncate font-medium text-gray-800 md:text-clip">
                            {line.label}
                          </div>
                        </div>
                      </div>
                      <div className="whitespace-nowrap p-2">
                        <div className="text-left">{line.entryType}</div>
                      </div>
                      <div className="whitespace-nowrap p-2">
                        <div className="text-left">
                          {line.credit - line.debit === 0 ? (
                            "-"
                          ) : line.credit - line.debit > 0 ? (
                            <span className="flex items-center justify-start space-x-2">
                              <HiArrowDown className="text-success" />
                              <span>Cr</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-start space-x-2">
                              <HiArrowUp className="text-error" />
                              <span>Dr</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="whitespace-nowrap p-2">
                        <div className="text-left">
                          {NumberFormatter(Math.abs(line.credit - line.debit))}
                        </div>
                      </div>
                      <div className="whitespace-nowrap p-2">
                        <div className="text-left">
                          {NumberFormatter(line.balance)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatementTemplate;
