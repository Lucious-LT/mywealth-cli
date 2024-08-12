import { Menu } from "@headlessui/react";
import {
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsSliders2 } from "react-icons/bs";
import {
  HiArrowNarrowRight,
  HiPlus,
} from "react-icons/hi";
import CardHeader from "~/components/layout/card-header";

import {
  DateToStringFormatter,
  getDays,
} from "~/components/util/date-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";
import { statusFilter } from "~/components/models/fixed-income-status";
import { todayAsString } from "~/components/util/today";
import progressBar from "~/components/util/progress-bar";
import { CardSlideOver } from "~/components/navigation/card-slide-over";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/util/spinner";
import { useSession } from "next-auth/react";
import { type FixedDepositProduct, FixedDepositTransaction } from "~/server/api/models/investing";
import { capitalize } from "~/utils/format";
import ContFixedDepositModal from "~/components/modals/cont-fixed-deposit-modal";
import NewFixedDepositModal from "~/components/modals/new-fixed-deposit-modal";

const FixedDepositInvestments = () => {
  const { data: sessionData } = useSession();
  // ---- filter fixed deposits by status

  const [filteredFixedDeposit, setFilteredFixedDeposit] =
    useState<FixedDepositTransaction[] | undefined>();

  const { data: fixedDepositProducts } = api.invest.listFixedDepositProducts.useQuery()
  const { data: userAccounts } = api.invest.getAccountsForClient.useQuery(sessionData?.user.clientId!)

  const { data: fixedDeposit, isLoading: loadingFixedIncome } = api.invest.listClientFixedDepositTransactions.useQuery(sessionData?.user.clientId!)

  useEffect(() => {
    setFilteredFixedDeposit(fixedDeposit);
  }, [fixedDeposit]);

  const filterFixedDeposits = (status: any) => fixedDeposit?.filter(
    (fixedDeposit) => fixedDeposit.status === status
  );

  // Handle Fixed deposit filter by status
  const handleFixedDepositStatusFilter = (e: any) => {
    const status = e.target.value;
    status != "ALL"
      ? setFilteredFixedDeposit(filterFixedDeposits(status))
      : setFilteredFixedDeposit(fixedDeposit);
  };

  // open fixed deposit details card slider
  const [fixedDepositDetailscardOpen, setFixedDepositDetailsCardOpen] =
    useState(false);

  // --- open new fixed deposit modal
  const [newFixedDeposit, setNewFixedDeposit] = useState(false);

  // Handle New Fixed Deposit Investment modal
  const handleNewFixedDeposit = () => {
    setNewFixedDeposit(!newFixedDeposit);
    setSelectedFixedDepositProduct(undefined)
    setFixedDepositProduct(undefined)
  }

  // list fixed deposit products as radio buttons
  const [fixedDepositProduct, setFixedDepositProduct] = useState<FixedDepositProduct | undefined>()

  // --- select a fixed deposit product and pass to the next modal as 'products'
  const [selectedFixedDepositProduct, setSelectedFixedDepositProduct] =
    useState<FixedDepositProduct>();

  const handleFixedDepositProduct = (product: FixedDepositProduct) => {
    setSelectedFixedDepositProduct(product);
  };

  const [fixedDetailsItem, setFixedDetailsItem] = useState<FixedDepositTransaction>()

  // open the next modal to enter investment details
  const [contFixedDeposit, setContFixedDeposit] = useState(false);

  // Handle inline display error or success message
  let responseMessageTimeout: NodeJS.Timeout;
  const [responseMessage, setResponseMessage] = useState<{
    success?: string;
    error?: string;
  }>({
    error: "",
    success: "",
  });

  // Set timeout for error or success messages
  useEffect(() => {
    if (responseMessage.error || responseMessage.success) {
      responseMessageTimeout = setTimeout(
        () => setResponseMessage({ error: "", success: "" }),
        8000
      );
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout);
    };
  }, [responseMessage]);

  // Handle Next Modal change
  const handleContModal = () => {
    setNewFixedDeposit(!newFixedDeposit);
    setContFixedDeposit(!contFixedDeposit);
  };

  // open the next modal to enter investment details
  const [confirmFixedDeposit, setConfirmFixedDeposit] = useState(false);

  const handleConfirmModal = () => {
    setConfirmFixedDeposit(!confirmFixedDeposit);
  };

  return (
    <>
      <CardSlideOver setFixedDepositItem={setFixedDetailsItem} tbillsDetailscardOpen={fixedDepositDetailscardOpen} settbillsDetailsCardOpen={setFixedDepositDetailsCardOpen} fixedDeposit={fixedDetailsItem!} />
      <div className="relative mb-8">
        <div className="flex items-center ">
          <CardHeader title="Fixed Deposits" />
          <button onClick={handleNewFixedDeposit} className="primary-btn">
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
                      {statusFilter &&
                        statusFilter.map((status, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                className={`${active ? "text-primary" : ""
                                  } block whitespace-nowrap px-2 py-2`}
                                value={status.value}
                                onClick={handleFixedDepositStatusFilter}
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
      <div className={`${loadingFixedIncome && `items-center`} flex flex-col space-y-4 overflow-hidden`}>
        {loadingFixedIncome ? <LoadingSpinner size="lg" label="Loading Fixed Income" lookup /> : fixedDeposit && fixedDeposit.length < 1 ? <span>NO RECORDS</span> :
          filteredFixedDeposit?.length == 0 ? <div className="flex justify-center items-center text-xl">No Record Found</div> :
            filteredFixedDeposit?.map((item) => (
              <div
                className="relative cursor-default rounded-md  bg-gray-50 px-6 py-8 hover:shadow"
                key={item.id}
              >
                <div className="grid grid-cols-7 gap-4">
                  <div className="col-span-2">
                    <div className="flex flex-auto flex-col space-y-1 text-sm font-bold">
                      <span
                        className="cursor-pointer text-primary hover:text-opacity-70 w-fit"
                        onClick={() => {
                          setFixedDetailsItem(item)
                          setFixedDepositDetailsCardOpen(!fixedDepositDetailscardOpen)
                        }}
                      >{`${item.productCode} - ${item.interestRate
                        }% for ${item.tenor} days`}</span>
                      <span className="text-xs">
                        <span className="sub-header">Invested Amount -</span>
                        {`${item.currency
                          } ${NumberFormatter(item.principal)} `}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-start space-x-4">
                      <div className="flex flex-col space-y-1 text-sm ">
                        <span className="font-semibold">
                          {DateToStringFormatter(item.startDate)}
                        </span>
                        <span className="sub-header">Start Date</span>
                      </div>
                      <div className="flex items-center font-normal text-gray-600">
                        <HiArrowNarrowRight />
                      </div>
                      <div className="flex flex-col space-y-1 text-sm ">
                        <span className="font-semibold">
                          {DateToStringFormatter(item.maturityDate)}
                        </span>
                        <span className="sub-header">End Date</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-start space-x-16">
                      <div className="flex flex-col space-y-1 text-sm ">
                        <span className="font-semibold">{` ${NumberFormatter(item.principal)}`}</span>
                        <span className="sub-header">Principal</span>
                      </div>
                      <div className="flex flex-col space-y-1 text-sm ">
                        <span className="font-semibold">
                          {` ${NumberFormatter(
                            item.expectedInterest
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
                        item.status === FixedDepositTransaction.status.RUNNING ? "pills-success"
                          : item.status === FixedDepositTransaction.status.PENDING
                            ? "pills-secondary"
                            : item.status === FixedDepositTransaction.status.APPROVED
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
                  content={`${getDays(item.startDate, todayAsString) >
                    item.tenor
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
                  <Progress placeholder="true"
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
      <>
        <NewFixedDepositModal
          newFixedDeposit={newFixedDeposit}
          handleNewFixedDeposit={handleNewFixedDeposit}
          handleFixedDepositProduct={handleFixedDepositProduct}
          fixedDepositProduct={fixedDepositProduct!}
          fixedDepositProducts={fixedDepositProducts}
          setFixedDepositProduct={setFixedDepositProduct}
          selectedFixedDepositProduct={selectedFixedDepositProduct}
          handleContModal={handleContModal}
        />

        <ContFixedDepositModal
          confirmFixedDeposit={confirmFixedDeposit}
          setConfirmFixedDeposit={setConfirmFixedDeposit}
          open={contFixedDeposit}
          handleModal={handleContModal}
          handleConfirmModal={handleConfirmModal}
          setResponseMessage={setResponseMessage}
          setContFixedDeposit={setContFixedDeposit}
          setSelectedFixedDepositProduct={setSelectedFixedDepositProduct}
          setFixedDepositProduct={setFixedDepositProduct}
          selectedFixedDepositProduct={selectedFixedDepositProduct!}
          userAccounts={userAccounts!}
          responseMessage={responseMessage}
        />
      </>
    </>
  );
};
export default FixedDepositInvestments;
