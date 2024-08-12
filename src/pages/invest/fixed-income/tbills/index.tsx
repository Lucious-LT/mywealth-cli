import { Menu } from "@headlessui/react";
import {
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsSliders2 } from "react-icons/bs";
import {
  HiArrowNarrowRight,
  HiPlus,
} from "react-icons/hi";
import CardHeader from "~/components/layout/card-header";
import PaginationButtons from "~/components/navigation/pagination-buttons";

import {
  DateToStringFormatter,
  getDays,
} from "~/components/util/date-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";
import { moneyMarketStatusFilter } from "~/components/models/fixed-income-status";
import { todayAsString } from "~/components/util/today";
import progressBar from "~/components/util/progress-bar";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/util/spinner";
import { useSession } from "next-auth/react";
import { type MoneyMarketProduct, MoneyMarketTransaction } from "~/server/api/models/investing";
import { TBillsCardSlideOver } from "~/components/navigation/tbill-card-slide-over";
import NewMoneyMarketModal from "~/components/modals/new-money-market-modal";
import ContMoneyMarketModal from "~/components/modals/cont-money-market-modal";
import { capitalize } from "~/utils/format";

const DiscountedInstrumentInvestments = () => {
  const { data: sessionData } = useSession();
  // ---- filter fixed deposits by status
  const [filteredInvestments, setFilteredInvestments] = useState<MoneyMarketTransaction[] | undefined>();

  const { data: userAccounts } = api.invest.getAccountsForClient.useQuery(sessionData?.user.clientId ?? "")

  const { data: transactions, isLoading: loadingTransactions } = api.invest.listClientMoneyMarketTransactions.useQuery(sessionData?.user.clientId ?? "")

  const [moneyMarketProduct, setMoneyMarketProduct] = useState<MoneyMarketProduct | undefined>()

  const filterInvestments = (status: any) => transactions?.filter(
    (transactions) => transactions.status === status
  );

  useEffect(() => {
    setFilteredInvestments(transactions)
  }, [transactions])

  // Handle filter money market transaction list
  const handleFilterStatusFilter = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const status = e.target.value;
    status != "ALL"
      ? setFilteredInvestments(filterInvestments(status))
      : setFilteredInvestments(transactions);
  };

  // open fixed deposit details card slider
  const [tbillsDetailscardOpen, settbillsDetailsCardOpen] = useState(false);

  // --- open new fixed deposit modal
  const [newtbills, setNewtbills] = useState(false);

  // --- open new money market modal
  const [moneyMarketContModal, setMoneyMarketContModal] = useState(false);

  // Handle open next modal for MM investment
  const handleMoneyMarketContModal = () => {
    setNewtbills(!newtbills);
    setMoneyMarketContModal(!moneyMarketContModal);
  }

  // Handle new Investment modal
  const handleNewtbills = () => setNewtbills(!newtbills);

  const [tbillDetails, setTbillDetails] = useState<MoneyMarketTransaction | undefined>()

  return (
    <>
      <NewMoneyMarketModal
        open={newtbills}
        handleModal={handleNewtbills}
        moneyMarketProduct={moneyMarketProduct!}
        setMoneyMarketProduct={setMoneyMarketProduct}
        handleMoneyMarketContModal={handleMoneyMarketContModal}
      />

      <ContMoneyMarketModal
        setSelectedMoneyMarketProduct={setMoneyMarketProduct}
        selectedMoneyMarketProduct={moneyMarketProduct!}
        userAccounts={userAccounts!}
        setContMoneyMarket={setMoneyMarketContModal}
        open={moneyMarketContModal}
        handleModal={handleMoneyMarketContModal}
      />

      <div className="relative mb-8">
        <div className="flex items-center ">
          <CardHeader title="Treasury Bills" />
          <button onClick={handleNewtbills} className="primary-btn">
            <HiPlus /> <span className="ml-2">New investment</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 flex justify-between">
          <div className="relative">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="secondary-btn flex items-center">
                    <BsSliders2 />
                    <span className="ml-2">Filter</span>
                  </Menu.Button>
                  {open && (
                    <Menu.Items
                      as={motion.div}
                      initial={{ height: "0", opacity: "0" }}
                      animate={{ height: "auto", opacity: "1" }}
                      transition={{ duration: "0.15" }}
                      className="absolute right-0 z-10 mt-2 divide-y-1 divide-gray-200 rounded-sm bg-gray-50 text-center text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                    >
                      {moneyMarketStatusFilter &&
                        moneyMarketStatusFilter.map((status, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                className={`${active ? "text-primary" : ""
                                  } block whitespace-nowrap px-2 py-2`}
                                value={status.value}
                                onClick={handleFilterStatusFilter}
                              >
                                {capitalize(status.name.replaceAll("-", " "))}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                    </Menu.Items>
                  )}
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
      <div className={`${loadingTransactions && `items-center`} flex flex-col space-y-4 overflow-hidden`}>
        {loadingTransactions ? <LoadingSpinner size="lg" label="Loading Treasury Bills" lookup /> : transactions && transactions.length < 1 ? <span>NO RECORDS</span> :
          filteredInvestments?.length == 0 ? <div className="flex justify-center items-center text-xl">No Record Found</div> : filteredInvestments &&
            filteredInvestments.map((item, index) => (
              <div
                className="relative cursor-default rounded-md  bg-gray-50 px-6 py-8 hover:shadow"
                key={index}
              >
                <div className="grid grid-cols-7 gap-4">
                  <div className="col-span-2">
                    <div className="flex flex-auto flex-col space-y-1 text-sm font-bold">
                      <span
                        className="cursor-pointer w-fit text-primary hover:text-opacity-70"
                        onClick={() => {
                          setTbillDetails(item)
                          settbillsDetailsCardOpen(!tbillsDetailscardOpen)
                        }}
                      >{`${item.productCode} - ${item.discountRate}% for ${item.tenor} days`}</span>
                      <span className="text-xs">
                        <span className="sub-header">Face Value -</span>
                        {` ${item.currency} ${NumberFormatter(item.faceValue)}`}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-start space-x-4">
                      <div className="flex flex-col space-y-1 text-sm font-semibold">
                        <span>
                          {DateToStringFormatter(item.startDate)}
                        </span>
                        <span className="sub-header">Start Date</span>
                      </div>
                      <div className="flex items-center font-normal text-gray-600">
                        <HiArrowNarrowRight />
                      </div>
                      <div className="flex flex-col space-y-1 text-sm font-semibold">
                        <span>
                          {DateToStringFormatter(item.maturityDate)}
                        </span>
                        <span className="sub-header">Maturity Date</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-start space-x-16">
                      <div className="flex flex-col space-y-1 text-sm font-semibold">
                        <span>{` ${NumberFormatter(item.discountedValue)}`}</span>
                        <span className="sub-header">Discounted Value</span>
                      </div>
                      <div className="flex flex-col space-y-1 text-sm font-semibold">
                        <span className="font-semibold">
                          {` ${NumberFormatter(
                            item.interestAmount
                          )}`}
                          <span className="text-xs text-error">
                            {` ~ ${NumberFormatter(item.totalFees)}`}
                          </span>
                        </span>
                        <span className="sub-header">Expected Interest</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center capitalize">
                    <span
                      className={classNames(
                        item.status === MoneyMarketTransaction.status.RUNNING
                          ? "pills-success"
                          : item.status === MoneyMarketTransaction.status.PENDING
                            ? "pills-secondary"
                            : item.status === MoneyMarketTransaction.status.APPROVED
                              ? "pills-primary"
                              : "pills-error",
                        "pills"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <Tooltip
                  content={`${getDays(item.startDate, todayAsString) > item.tenor
                    ? item.tenor
                    : getDays(item.startDate, todayAsString)
                    } days`}
                  placement="bottom-start"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-gray-600 text-xs"
                >
                  <Progress
                    placeholder={""}
                    value={progressBar(
                      item.startDate,
                      item.maturityDate
                    )}
                    className="absolute bottom-0 left-0"
                  />
                </Tooltip>
              </div>
            ))}
      </div>
      <PaginationButtons />
      <TBillsCardSlideOver tbillsDetailscardOpen={tbillsDetailscardOpen} settbillsDetailsCardOpen={settbillsDetailsCardOpen} tbillDetails={tbillDetails!} setTbillDetails={setTbillDetails} />
    </>
  );
};
export default DiscountedInstrumentInvestments;
