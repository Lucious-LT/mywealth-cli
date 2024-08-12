import { Input, Button } from "@material-tailwind/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState } from "react";
import { HiDownload, HiArrowDown, HiArrowUp } from "react-icons/hi";
import Datepicker from "react-tailwindcss-datepicker";
import PaginationButtons from "~/components/navigation/pagination-buttons";
import { NumberFormatter } from "~/components/util/number-formatter";
import { today } from "~/components/util/today";
import { GlSubAccountType } from "~/server/api/models/accounting";
import { api } from "~/utils/api";
import { shortenText } from "~/utils/format";

const AccountStatement = ({ id, startDate }: { id: string; startDate: string; }) => {
  // Set account statement date states for Datepicker
  const [accountStmtDate, setAccountStmtDate] = useState({
    startDate: startDate,
    endDate: today.toISOString().split("T")[0] as string,
  });

  // Pagination parameters
  const [currentPage, setCurrentPage] = useState(0); //current page
  const [recordsPerPage, setRecordsPerPage] = useState(10); //no of records on each page

  // Load the account statement
  const { data: statement, isLoading: loadingStatement } =
    api.banking.getDepositAccountStatement.useQuery(
      {
        accountId: id,
        startDate: accountStmtDate.startDate,
        endDate: accountStmtDate.endDate,
        subAccountType: GlSubAccountType.DEPOSIT,
        page: currentPage, //todo add paging support
        size: recordsPerPage,
      },
      {
        enabled: id !== "" && id !== undefined,
        staleTime: 1000 * 60 * 5,
      }
    );


  const createPDF = async () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const data = statement?.statementLines

    const docDef = {
      content: [
        { text: statement?.accountLabel + " - " + statement?.accountNo, style: "header" },
        {
          style: "tableExample",
          table: {
            body: [
              [{ text: "Date", style: "tableHeader" }, { text: "Description", style: "tableHeader" }, { text: "Channel", style: "tableHeader" }, { text: "Type", style: "tableHeader" }, { text: "Amount", style: "tableHeader" }, { text: "Balance", style: "tableHeader" }],
              // @ts-ignore
              ...data?.map(row => {
                const type = row.credit - row.debit;
                return [row.tranDate, row.label, row.entryType, type == 0 ? "-" : type > 0 ? "Cr" : "Dr", Math.abs(type), row.balance]
              })
            ]
          },
          layout: {
            fillColor: function(rowIndex: number) {
              return (rowIndex === 0) ? '#CCCCCC' : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          align: "center",
          justify: "center",
          "text-align": "center",
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          fill: "gray",
          color: 'black'
        }
      },
      // defaultStyle: {
      // }
    }
    // @ts-ignore
    pdfMake.createPdf(docDef).download(`${statement?.accountLabel} - ${statement?.accountNo} (${statement?.startDate} to ${statement?.endDate})`)
  }

  // Set account statement date from datepicker
  const handleAccountStmtDate = (newDate: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setAccountStmtDate(newDate);
  };
  return (
    <>
      {/* date form */}
      <div className=" mt-16 hidden md:block">
        <div className="flex justify-center">
          <div className="flex space-x-5 ">
            <form className="flex items-center space-x-4">
              <Datepicker
                value={accountStmtDate}
                onChange={handleAccountStmtDate}
                showShortcuts={true}
                separator="to"
                inputClassName="w-64 border-gray-300 rounded text-xs text-gray-600"
                placeholder="Transaction Date Range"
              // startFrom={new Date(today.valueOf() - 7)}
              />
              {/* <button className="secondary-btn flex items-center">
                    <HiEye className="mr-2" />
                    View
                  </button> */}
            </form>
            <button onClick={createPDF} className="secondary-btn flex items-center">
              <HiDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <form className="">
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" label="From" crossOrigin={true} />
            <Input type="date" label="To" crossOrigin={true} />
          </div>
          <div className="mt-5 flex justify-center space-x-4">
            {/* <Button className="btn w-4/12 border-0 hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200">
                  <HiEye className="mr-2" />
                  View
                </Button> */}

            <Button placeholder={""} className="btn w-4/12 border-0 hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200">
              <HiDownload className="mr-2" />
              Download
            </Button>
          </div>
        </form>
      </div>

      {/* Account Statement table  */}
      <div className=" my-10 overflow-hidden ">
        {/* table */}
        <section id="pdf" className="rounded  text-gray-600 antialiased shadow md:block">
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
                        <div className="text-left font-semibold">
                          Description
                        </div>
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
                          <div className="text-left font-medium ">
                            {line.tranDate}
                          </div>
                        </div>
                        <div className="col-span-2 whitespace-nowrap p-2">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800 md:text-clip">
                              {shortenText(line.label, 35)}
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
                            {NumberFormatter(
                              Math.abs(line.credit - line.debit)
                            )}
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

        <PaginationButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={statement?.pageCount as number}
          setPageSize={setRecordsPerPage}
          pageSize={recordsPerPage}
        />
      </div>
    </>
  );
};
export default AccountStatement;
