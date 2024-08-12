import React, { Fragment, useMemo, useState } from "react";
import { type NextPage } from "next";
import Link from "next/link";
import { type Props } from "react-apexcharts";
import {
  HiArchive,
  HiArrowDown,
  HiArrowUp,
  HiCalendar,
  HiCash,
  HiClock,
  HiCurrencyDollar,
  HiDotsVertical,
  HiEye,
  HiEyeOff,
  HiOutlineHashtag,
  HiPlus,
  HiShoppingBag,
  HiStatusOnline,
  HiSwitchHorizontal,
  HiUser,
} from "react-icons/hi";
import classNames from "classnames";
import CardHeader from "~/components/layout/card-header";
import { NumberFormatter } from "~/components/util/number-formatter";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { type Ledger } from "~/server/api/models/accounting";
import { LoanAccount, type DepositAccount } from "~/server/api/models/banking";
import { type ApexOptions } from "apexcharts";
import { maskAccountNumber } from "~/utils/format";
import dynamic from "next/dynamic";
import NewTransferTransaction from "~/pages/bank/transfer/new-transfer-transaction";
import PayBills from "~/pages/bank/bills/pay-bills";
import NewAccount from "~/pages/bank/deposit-account/new-account";
import { Menu, Tab, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { TbPower, TbTrash } from "react-icons/tb";
import { Tooltip } from "@material-tailwind/react";
import NewLoanApplication from "./loan-account/new-loan-application";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import Table from "~/components/ui/table";
import THead from "~/components/ui/table/thead/thead";
import TheadItem from "~/components/ui/table/thead/thead-item";
import TBody from "~/components/ui/table/tbody/tbody";
import TBodyRow from "~/components/ui/table/tbody/tbody-row";
import TBodyItem from "~/components/ui/table/tbody/tbody-item";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Bank: NextPage = () => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  const utils = api.useUtils()

  const { data: depositAccts, isLoading: loadingDepositAccounts } =
    api.banking.getDepositAccountsForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
      enabled: clientId != undefined
    });
  const depositAccounts: DepositAccount[] = depositAccts ?? [];

  const { data: loanAccts, isLoading: loadingLoanAccounts } =
    api.banking.getLoanAccountsForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
      enabled: clientId != undefined
    });
  const loanAccounts: LoanAccount[] = loanAccts ?? [];

  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [transactions] = useState(new Map<string, Ledger[]>()); // accountId -> transactions

  const { isLoading } = api.banking.getTransactionsForAccount.useQuery(
    selectedAccountId,
    {
      enabled: selectedAccountId !== "" && !transactions.get(selectedAccountId),
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        transactions.set(selectedAccountId, data ?? []);
      },
    }
  );
  const { mutate: deleteAccount } = api.banking.deleteLoanAccountById.useMutation({ onSuccess: () => utils.banking.getLoanAccountsForClient.invalidate() })
  const { mutate: blockAccount } = api.banking.blockLoanAccountById.useMutation({ onSuccess: () => utils.banking.getLoanAccountsForClient.invalidate() })

  const [showTransactions, setShowTransactions] = useState({});
  const viewTransactions = (index: string) => () => {
    //Toggle the view
    setShowTransactions((prevTransactions: any) => ({
      ...prevTransactions, // <-- copy previous state
      [index]: !prevTransactions[index], // <-- update value by index key
    }));

    //Load the transactions for the account if the view is toggled on
    // @ts-ignore
    if (!showTransactions[index]) {
      setSelectedAccountId(index);
    }
  };

  const SpendGraph: React.FC<Props> = ({ }) => {
    const options: ApexOptions = {
      chart: {
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
    };
    const series = [
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ];

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ReactApexChart
        type="area"
        options={options}
        series={series}
        height={400}
      />
    );
  };

  const BudgetGraph: React.FC<Props> = ({ }) => {
    const options = {
      chart: {
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
    };

    const series = [
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ];

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={400}
      />
    );
  };

  const SpendAnalysis: React.FC<Props> = ({ }) => {
    return (
      <div className="mixed-chart">
        <div className="mt-8 grid w-full grid-flow-row grid-cols-1 gap-6 sm:mt-4 lg:grid-cols-2">
          <SpendGraph />
          <BudgetGraph />
        </div>
      </div>
    );
  };

  const analysis = useMemo(() => <SpendAnalysis />, []);

  const [maskNo, setMaskNo] = useState({});

  const mask = (index: string) => () => {
    setMaskNo((prevMaskNo: any) => ({
      ...prevMaskNo,
      [index]: !prevMaskNo[index],
    }));
  };

  const icon = {
    mask: <HiEye />,
    noMask: <HiEyeOff />,
  };
  const [createTransfer, setCreateTransfer] = useState(false);
  const [confirmTransfer, setConfirmTransfer] = useState(false);

  const [createBill, setCreateBill] = useState(false);
  const [confirmBill, setConfirmBill] = useState(false);

  const [createAccount, setCreateAccount] = useState(false);
  const [confirmAccount, setConfirmAccount] = useState(false);

  const [createLoanApplication, setCreateLoanApplication] = useState(false);
  const [confirmLoanApplication, setConfirmLoanApplication] = useState(false);

  return (
    <>
      <NewTransferTransaction
        open={createTransfer}
        setOpen={setCreateTransfer}
        confirm={confirmTransfer}
        setConfirm={setConfirmTransfer}
      />
      <PayBills
        open={createBill}
        setOpen={setCreateBill}
        confirm={confirmBill}
        setConfirm={setConfirmBill}
      />
      <NewAccount
        open={createAccount}
        setOpen={setCreateAccount}
        confirm={confirmAccount}
        setConfirm={setConfirmAccount}
      />
      <NewLoanApplication
        open={createLoanApplication}
        setOpen={setCreateLoanApplication}
        confirm={confirmLoanApplication}
        setConfirm={setConfirmLoanApplication}
      />

      <div className="mb-20">
        <CardHeader title="spend analysis" />
        {analysis}
      </div>

      <Tab.Group>
        <Tab.List className=" space-x-8">
          <Tab
            className={({ selected }) =>
              classNames(
                "pb-2 text-sm leading-5 focus:outline-none",
                selected
                  ? "duration-750 border-b-2 border-primary transition-all ease-linear"
                  : " hover:bg-white/[0.12] hover:text-primary"
              )
            }
          >
            <span className="font-semibold text-lg capitalize">Deposit Accounts</span>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "pb-2 text-sm leading-5 focus:outline-none",
                selected
                  ? "duration-750 border-b-2 border-primary transition-all ease-linear"
                  : " hover:bg-white/[0.12] hover:text-primary"
              )
            }
          >
            <span className="font-semibold text-lg capitalize">Loan Accounts</span>
          </Tab>
        </Tab.List>
        <Transition
          as={Fragment}
          show={true}
          enter="transition ease duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-linear duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Tab.Panels className="py-4">
            {/* Deposit accounts  */}
            <Tab.Panel className="h-full overflow-y-auto px-4">
              <div className=" mb-4">
                <div className="mx-4 flex items-center justify-end">
                  <button
                    className="primary-btn"
                    onClick={() => setCreateAccount(!createAccount)}
                  >
                    <HiPlus /> <span className="ml-2">New Account</span>
                  </button>
                  <button
                    className="secondary-btn mx-2 flex items-center"
                    onClick={() => setCreateTransfer(!createTransfer)}
                  >
                    <HiSwitchHorizontal />
                    <span className="ml-2 ">Transfer</span>
                  </button>
                  <button
                    className="secondary-btn mx-2 flex items-center"
                    onClick={() => setCreateBill(!createBill)}
                  >
                    <HiCash />
                    <span className="ml-2">Pay Bills</span>
                  </button>
                </div>
              </div>

              <div
                className={classNames(
                  depositAccounts.length > 1
                    ? "lg:grid-cols-2"
                    : "lg:grid-cols-1",
                  "grid  grid-flow-row gap-10 p-1"
                )}
              >
                {/* Show all deposit accounts  */}
                {depositAccounts.map((record, index) => (
                  <div
                    className="card bg-base-100 shadow-md shadow-gray-200 "
                    key={index}
                  >
                    <div className="card-body ">
                      <div className="relative grid place-items-end">
                        <Menu>
                          {({ open }) => (
                            <>
                              <Menu.Button className="ml-2 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:bg-gray-200 hover:shadow">
                                <HiDotsVertical />
                              </Menu.Button>
                              {open && (
                                <Menu.Items
                                  as={motion.div}
                                  initial={{ height: "0", opacity: "0" }}
                                  animate={{ height: "auto", opacity: "1" }}
                                  transition={{ duration: "0.15" }}
                                  className="absolute right-0 top-8 z-10 divide-y-2 divide-gray-200 rounded-sm bg-gray-50 text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                                >
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        className={`${active ? "bg-gray-200" : ""
                                          } block whitespace-nowrap px-3 py-4`}
                                      >
                                        <div className="flex items-center">
                                          <TbPower className="mr-2" />
                                          <span>Deactivate Account</span>
                                        </div>
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        className={`${active ? "bg-gray-200" : ""
                                          } block whitespace-nowrap px-3 py-4`}
                                      >
                                        <div className="flex items-center">
                                          <TbTrash className="mr-2" />
                                          <span>Delete Account</span>
                                        </div>
                                      </a>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              )}
                            </>
                          )}
                        </Menu>
                      </div>
                      <section>
                        <table className="w-full min-w-max table-auto ">
                          <tbody className="text-xs font-light text-gray-600">
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiUser className="mr-5" />
                                  <span className="font-medium">
                                    Account Label
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{record.accountLabel}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiOutlineHashtag className="mr-5" />
                                  <span className="font-medium">
                                    Account No
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <div className="flex items-center space-x-2">
                                    <Link
                                      href={
                                        "/bank/deposit-account/" + record.id
                                      }
                                      className="hover:text-primary "
                                    >
                                      {/* @ts-ignore */}
                                      {!maskNo[record.id]
                                        ? maskAccountNumber(record.accountNo)
                                        : record.accountNo}
                                    </Link>
                                    <Tooltip
                                      content={
                                        //  @ts-ignore
                                        !maskNo[record.id]
                                          ? "Show account number"
                                          : "Hide account number"
                                      }
                                      placement="right"
                                      animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                      }}
                                      className="bg-gray-600 text-xs"
                                    >
                                      <span onClick={mask(record.id)}>
                                        {/* @ts-ignore */}
                                        {!maskNo[record.id]
                                          ? icon.mask
                                          : icon.noMask}
                                      </span>
                                    </Tooltip>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiShoppingBag className="mr-5" />
                                  <span className="font-medium">Product</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left md:truncate md:text-clip">
                                <div className="flex items-center">
                                  <span>{record.productLabel}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiCurrencyDollar className="mr-5" />
                                  <span className="font-medium">Currency</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{record.currency}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiCash className="mr-5" />
                                  <span className="font-medium">
                                    Total Balance
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{NumberFormatter(record.balance)}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiCash className="mr-5" />
                                  <span className="font-medium">
                                    {" "}
                                    Available Balance
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>
                                    {NumberFormatter(record.availableBalance)}
                                  </span>
                                </div>
                              </td>
                            </tr>
                            {record.overdraftLimit ? (
                              <tr className="">
                                <td className="whitespace-nowrap py-3 px-6 text-left">
                                  <div className="flex items-center">
                                    <HiCash className="mr-5" />
                                    <span className="font-medium">
                                      Overdraft Limit
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                  <div className="flex items-center">
                                    <span>
                                      {NumberFormatter(record.overdraftLimit)}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ) : null}
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiStatusOnline className="mr-5" />
                                  <span className="font-medium">Status</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{record.status}</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </section>
                      {/* view transactions link  */}
                      <div className="card-actions justify-end">
                        <a
                          className="mt-4 cursor-pointer py-1 px-3 text-[10px] tracking-wide text-gray-600 transition-all duration-500 ease-in-out hover:font-bold hover:tracking-wider hover:text-primary"
                          onClick={viewTransactions(record.id)}
                        >
                          See latest transactions
                        </a>
                      </div>

                      {
                        /* @ts-ignore */
                        showTransactions[record.id] && (
                          <>
                            {/* <!-- section Table large screen--> */}
                            <section className=" hidden  text-gray-600 antialiased transition-all duration-500 ease-in-out md:block">
                              <div className="flex h-full flex-col justify-center">
                                {/* <!-- Table --> */}
                                <div className="shadow-xs mx-auto w-full rounded-sm bg-white">
                                  <div className="overflow-x-auto">
                                    <div className="w-auto">
                                      <div className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-400 hover:tracking-wider">
                                        <div className="grid grid-cols-5 gap-2">
                                          <div className="w-10 whitespace-nowrap p-2">
                                            <div className="text-left font-semibold">
                                              Date
                                            </div>
                                          </div>
                                          <div className="whitespace-nowrap p-2">
                                            <div className="text-left font-semibold">
                                              Amount
                                            </div>
                                          </div>
                                          <div className="w-10 whitespace-nowrap p-2">
                                            <div className="text-left font-semibold">
                                              Type
                                            </div>
                                          </div>
                                          <div className="col-span-2 whitespace-nowrap p-2">
                                            <div className="text-left font-semibold">
                                              Desc
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {transactions.get(record.id)?.map((t, index) => (
                                        <div
                                          key={index}
                                          className="divide-y divide-gray-100 text-xs"
                                        >
                                          <div className="grid grid-cols-5 gap-2">
                                            <div className="whitespace-nowrap p-2">
                                              <div className="truncate text-left font-medium sm:text-clip">
                                                {t.tranDate}
                                              </div>
                                            </div>
                                            <div className="whitespace-nowrap p-2">
                                              <div className="text-left">
                                                {NumberFormatter(
                                                  t.transCredit > 0
                                                    ? t.transCredit
                                                    : t.transDebit
                                                )}
                                              </div>
                                            </div>
                                            <div className="whitespace-nowrap p-2">
                                              <div className="text-left">
                                                {t.transCredit > 0 ? (
                                                  <span className="flex items-center justify-start space-x-2">
                                                    <HiArrowDown className="text-success" />
                                                    <span>CR</span>
                                                  </span>
                                                ) : (
                                                  <span className="flex items-center justify-start space-x-2">
                                                    <HiArrowUp className="text-error" />
                                                    <span>DR</span>
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-span-2 whitespace-nowrap p-2">
                                              <div className="flex items-center">
                                                <div className="font-medium text-gray-800 sm:truncate sm:text-clip">
                                                  {t.label}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      {selectedAccountId === record.id &&
                                        transactions.get(record.id)?.length ===
                                        0 && (
                                          <div className="divide-y divide-gray-100 text-xs">
                                            <div className="col-span-2 whitespace-nowrap p-2">
                                              <div className="flex items-center">
                                                <div className="font-medium text-gray-800 sm:truncate sm:text-clip">
                                                  NO TRANSACTIONS...
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            {/* mobile view transactions */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                              {transactions.get(record.id)?.map((t, index) => (
                                <div
                                  className="space-y-3 rounded-lg bg-gray-50 p-2"
                                  key={index}
                                >
                                  <div className="text-sm font-medium text-gray-800">
                                    {t.label}
                                  </div>
                                  <div className="flex items-center space-x-3 text-sm ">
                                    <div className="font-semibold">
                                      {t.transCredit > 0 ? "Credit" : "Debit"}
                                    </div>
                                    <div>
                                      {NumberFormatter(
                                        t.transCredit > 0
                                          ? t.transCredit
                                          : t.transDebit
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <HiCalendar />
                                    <span> {t.tranDate}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )
                      }
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            {/* Loan accounts  */}
            <Tab.Panel className="h-full overflow-y-auto px-4">
              <div className=" mb-4">
                <div className="mx-4 flex items-center justify-end">
                  <button
                    className="primary-btn mx-2 flex items-center"
                    onClick={() =>
                      setCreateLoanApplication(!createLoanApplication)
                    }
                  >
                    <HiCash />
                    <span className="ml-2">New Application</span>
                  </button>
                  <button
                    className="secondary-btn mx-2 flex items-center"
                  // onClick={() =>
                  //   setCreateLoanApplication(!createLoanApplication)
                  // }
                  >
                    <HiArchive />
                    <span className="ml-2">See Applications</span>
                  </button>
                </div>
              </div>

              <div
                className={classNames(
                  loanAccounts.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1",
                  "grid  grid-flow-row gap-10"
                )}
              >
                {/* Show all loan accounts  */}
                {loanAccounts.map((record, key) => (
                  <div
                    className="card  bg-base-100 shadow-md shadow-gray-200 "
                    key={key}
                  >
                    <div className="card-body ">
                      <div className="relative grid place-items-end">
                        <Menu>
                          {({ open }) => (
                            <>
                              <Menu.Button className="ml-2 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:bg-gray-200 hover:shadow">
                                <HiDotsVertical />
                              </Menu.Button>
                              {open && (
                                <Menu.Items
                                  as={motion.div}
                                  initial={{ height: "0", opacity: "0" }}
                                  animate={{ height: "auto", opacity: "1" }}
                                  transition={{ duration: "0.15" }}
                                  className="absolute right-0 top-8 z-10 divide-y-2 divide-gray-200 rounded-sm bg-gray-50 text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                                >
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        className={`${active ? "bg-gray-200" : ""
                                          } block whitespace-nowrap px-3 py-4 cursor-pointer`}
                                        onClick={() => blockAccount(record.id)}
                                      >
                                        <div className="flex items-center">
                                          <TbPower className="mr-2" />
                                          <span>Deactivate Account</span>
                                        </div>
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        onClick={() => deleteAccount(record.id)}
                                        className={`${active ? "bg-gray-200" : ""
                                          } block whitespace-nowrap px-3 py-4 cursor-pointer`}
                                      >
                                        <div className="flex items-center">
                                          <TbTrash className="mr-2" />
                                          <span>Delete Account</span>
                                        </div>
                                      </a>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              )}
                            </>
                          )}
                        </Menu>
                      </div>
                      <section>
                        <table className="w-full min-w-max table-auto ">
                          <tbody className="text-xs font-light text-gray-600">
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiUser className="mr-5" />
                                  <span className="font-medium">
                                    Account Label
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{record.accountLabel}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiOutlineHashtag className="mr-5" />
                                  <span className="font-medium">
                                    Account No
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <div className="flex items-center space-x-2">
                                    <Link
                                      href={"/bank/loan-account/" + record.id}
                                      className="hover:text-primary "
                                    >
                                      {/* @ts-ignore */}
                                      {!maskNo[record.id]
                                        ? maskAccountNumber(record.accountNo)
                                        : record.accountNo}
                                    </Link>
                                    <Tooltip
                                      content={
                                        //  @ts-ignore
                                        !maskNo[record.id]
                                          ? "Show account number"
                                          : "Hide account number"
                                      }
                                      placement="right"
                                      animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                      }}
                                      className="bg-gray-600 text-xs"
                                    >
                                      <span onClick={mask(record.id)}>
                                        {/* @ts-ignore */}
                                        {!maskNo[record.id]
                                          ? icon.mask
                                          : icon.noMask}
                                      </span>
                                    </Tooltip>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiShoppingBag className="mr-5" />
                                  <span className="font-medium">Product</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left md:truncate md:text-clip">
                                <div className="flex items-center">
                                  <span>{record.productLabel}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiCurrencyDollar className="mr-5" />
                                  <span className="font-medium">Currency</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{record.currency}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiCash className="mr-5" />
                                  <span className="font-medium">
                                    Total Balance
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{NumberFormatter(record.balance)}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiClock className="mr-5" />
                                  <span className="font-medium">
                                    Last Updated
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>
                                    {record.balanceTime != null &&
                                      record.balanceTime != undefined
                                      ? DateToStringFormatter(
                                        record.balanceTime as string
                                      )
                                      : "-"}
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-nowrap py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <HiStatusOnline className="mr-5" />
                                  <span className="font-medium">Status</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span>{record.status}</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </section>
                      {/* view transactions link  */}
                      <div className="card-actions justify-end">
                        <a
                          className="mt-4 cursor-pointer py-1 px-3 text-[10px] tracking-wide text-gray-600 transition-all duration-500 ease-in-out hover:font-bold hover:tracking-wider hover:text-primary"
                          onClick={viewTransactions(record.id)}
                        >
                          See latest transactions
                        </a>
                      </div>

                      {
                        /* @ts-ignore */
                        showTransactions[record.id] && (
                          <>
                            {/* <!-- section Table large screen--> */}
                            <Table>
                              <THead>
                                <TheadItem label="Date" />
                                <TheadItem label="Amount" />
                                <TheadItem label="Type" />
                                <TheadItem label="Desc" />
                              </THead>
                              <TBody>
                                {transactions.get(record.id)?.map((t, index) => (
                                  <TBodyRow key={index}>
                                    <TBodyItem label={t.tranDate} />
                                    <TBodyItem
                                      label={NumberFormatter(
                                        t.transCredit > 0
                                          ? t.transCredit
                                          : t.transDebit
                                      )}
                                    />
                                    <TBodyItem
                                      label={
                                        t.transCredit > 0 ? (
                                          <span className="flex items-center justify-start space-x-2">
                                            <HiArrowDown className="text-success" />
                                            <span>CR</span>
                                          </span>
                                        ) : (
                                          <span className="flex items-center justify-start space-x-2">
                                            <HiArrowUp className="text-error" />
                                            <span>DR</span>
                                          </span>
                                        )
                                      }
                                    />
                                    <TBodyItem label={t.label} />
                                  </TBodyRow>
                                ))}
                              </TBody>
                            </Table>
                            {/* mobile view transactions */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                              {transactions.get(record.id)?.map((t, index) => (
                                <div
                                  className="space-y-3 rounded-lg bg-gray-50 p-2"
                                  key={index}
                                >
                                  <div className="text-sm font-medium text-gray-800">
                                    {t.label}
                                  </div>
                                  <div className="flex items-center space-x-3 text-sm ">
                                    <div className="font-semibold">
                                      {t.transCredit > 0 ? "Credit" : "Debit"}
                                    </div>
                                    <div>
                                      {NumberFormatter(
                                        t.transCredit > 0
                                          ? t.transCredit
                                          : t.transDebit
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <HiCalendar />
                                    <span> {t.tranDate}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )
                      }
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Transition>
      </Tab.Group>

      {/* <!-- component --> */}
    </>
  );
};
export default Bank;
