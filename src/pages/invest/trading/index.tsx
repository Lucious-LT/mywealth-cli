import { Combobox, Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FormikValues, useFormik } from "formik";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiDotsVertical, HiPlus } from "react-icons/hi";
import * as yup from "yup";
import CardHeader from "~/components/layout/card-header";
import InvestLayout from "~/components/layout/page/invest-layout";
import EditFundModal from "~/components/ui/edit-fund-modal";
import EditOrderModal from "~/components/ui/edit-order-modal";
import {
  ErrorDisplay,
  SuccessDisplay
} from "~/components/ui/error-display";
import { LoadingSpinner } from "~/components/ui/spinner";
import { ThemeContext, themeContextType } from "~/context/theme-context";
import NewTradeOrder from "~/pages/invest/trading/new-trade-order";
import { NextPageWithLayout } from "~/pages/_app";
import {
  FundTransaction,
  FundTransactionRequest,
  InvestmentAccount,
  Order,
  OrderRequest
} from "~/server/api/models/investing";
import { FundTransactionView } from "~/server/api/routers/invest";
import { OrdersView } from "~/server/api/routers/order";
import { api } from "~/utils/api";
import { capitalize, formatErrorMssg, formatStatus } from "~/utils/format";

const Trading: NextPageWithLayout = () => {
  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  const { theme } = useContext(ThemeContext) as themeContextType;
  const { data: accounts, isLoading: loadingAccounts } = api.invest.getAccountsForClient.useQuery(
    clientId,
    {
      staleTime: 1000 * 60 * 5, // 5mins
    }
  );

  let [orderModal, setOrderModal] = useState<{
    isOpen: boolean;
    order: OrdersView | null;
  }>({ isOpen: false, order: null });

  let [fundModal, setFundModal] = useState<{
    isOpen: boolean;
    fund: FundTransactionView | null;
  }>({ isOpen: false, fund: null });

  const [responseMessage, setResponseMessage] = useState<{
    success?: string;
    error?: string;
  }>({
    error: "",
    success: "",
  });

  const [ordersAndFundTransactions, setOrdersAndFundTransactions] =
    useState<(OrdersView | FundTransactionView)[]>();

  let responseMessageTimeout: NodeJS.Timeout;

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

  function closeModal() {
    setOrderModal({ isOpen: false, order: null });
  }

  function closeFundModal() {
    setFundModal({ isOpen: false, fund: null });
  }

  function openModal(order: OrdersView | FundTransactionView) {
    if (Object.hasOwn(order, "orderType")) {
      setFundModal({ isOpen: true, fund: order as FundTransactionView });
    } else {
      setOrderModal({ isOpen: true, order: order as OrdersView });
    }
  }

  let [selectedAccount, setSelectedAccount] =
    useState<InvestmentAccount | null>(null);

  const [accountQuery, setAccountQuery] = useState("");

  const {
    data: ordersAndFundTransaction,
    isLoading: loadingOrdersAndFundTransactions,
  } = api.invest.listAccountOrdersAndFundTransactions.useQuery(
    { accountId: selectedAccount?.id! },
    { enabled: selectedAccount != null, staleTime: 1000 * 60 * 5 }
  );

  const { mutate: cancelOrder, isLoading: cancelingOrder } =
    api.order.cancelOrderById.useMutation({
      onSuccess: () => {
        setResponseMessage({
          success: "Order cancel request sent successfully",
        });
        utils.invest.listAccountOrdersAndFundTransactions.invalidate({
          accountId: selectedAccount?.id!,
        });
      },
      onError: (error) => {
        setResponseMessage({ error: formatErrorMssg(error.message) });
      },
    });

  const { mutate: cancelFundTransaction, isLoading: cancelingFundTransaction } =
    api.invest.cancelFundTransactionById.useMutation({
      onSuccess: () => {
        setResponseMessage({
          success: "Fund cancel request sent successfully",
        });
        utils.invest.listAccountOrdersAndFundTransactions.invalidate({
          accountId: selectedAccount?.id!,
        });
      },
      onError: (error) => {
        setResponseMessage({ error: formatErrorMssg(error.message) });
      },
    });

  const { mutate: deleteOrder, isLoading: deletingOrder } =
    api.order.deleteOrderById.useMutation({
      onSuccess: () => {
        setResponseMessage({ success: "Order deleted successfully" });
        utils.invest.listAccountOrdersAndFundTransactions.invalidate({
          accountId: selectedAccount?.id!,
        });
      },
      onError: (error) => {
        setResponseMessage({ error: error.message.replaceAll(/[\{\}]/g, "") });
      },
    });

  const { mutate: deleteFundTransaction, isLoading: deletingFundTransaction } =
    api.invest.deleteFundTransactionById.useMutation({
      onSuccess: () => {
        setResponseMessage({ success: "Fund deleted successfully" });
        utils.invest.listAccountOrdersAndFundTransactions.invalidate({
          accountId: selectedAccount?.id!,
        });
      },
      onError: (error) => {
        setResponseMessage({ error: error.message.replaceAll(/[\{\}]/g, "") });
      },
    });

  // clear any error or success messages to display loading spinner
  useEffect(() => {
    if (
      cancelingFundTransaction ||
      cancelingOrder ||
      deletingFundTransaction ||
      deletingOrder
    ) {
      setResponseMessage({ success: "" });
    }
  }, [
    cancelingFundTransaction,
    cancelingOrder,
    deletingFundTransaction,
    deletingOrder,
  ]);

  // Set the first account as the initial/default client account
  useEffect(() => {
    if (accounts && accounts[0]) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  const handleAccountChange = (account: InvestmentAccount) => {
    setSelectedAccount(account);
  };

  useEffect(() => {
    setOrdersAndFundTransactions(ordersAndFundTransaction);
  }, [ordersAndFundTransaction]);

  const initialValues = {
    from: "",
    to: "",
    symbol: "",
    order: "",
    orderType: "",
    orderStatus: "",
    secType: "",
    page: 1
  };

  const validateSchema = yup.object().shape({
    from: yup.string(),
    to: yup.string(),
    symbol: yup.string(),
    order: yup.string(),
    orderType: yup.string(),
    orderStatus: yup.string(),
    secType: yup.string(),
    page: yup.number()
  });

  const handleOrderQuery = async ({ page: result }: FormikValues) => {
    if (result != "" && Number(result) < 1) toast.error("Results/Page starts from 1");

    refetchFilteredList();
  };

  const {
    resetForm,
    values: { from, to, symbol, order, orderType, orderStatus, secType, page },
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: handleOrderQuery,
    validationSchema: validateSchema,
  });

  const filter = {
    date:
      from && to ? { startDate: from as string, endDate: to as string } : null,
    orderStatus: orderStatus
      ? (orderStatus as unknown as
        | Order.orderStatus
        | FundTransaction.orderStatus)
      : undefined,
    orderType: orderType
      ? (orderType as unknown as
        | FundTransactionRequest.orderType
        | OrderRequest.side)
      : undefined,
    orderNo: order ? (order as string) : undefined,
    secId: symbol ? (symbol as string) : undefined,
    assetType: secType
      ? (secType as unknown as
        | OrderRequest.assetType
        | FundTransaction.fundType)
      : undefined,
    page: page ?? 0
  };

  const { refetch: refetchFilteredList, isFetching: filteringOrder } =
    api.invest.filterOrdersAndFundTransactions.useQuery(
      //@ts-ignore
      {
        accountId: selectedAccount?.id!,
        ...filter,
      },
      {
        enabled: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: (data) => setOrdersAndFundTransactions(data),
      }
    );

  const handleCancelOrder = (order: OrdersView | FundTransactionView) => {
    if (Object.hasOwn(order, "orderType")) {
      cancelFundTransaction(order.id);
    } else {
      cancelOrder(order.id);
    }
  };

  const handleDeleteOrder = (order: OrdersView | FundTransactionView) => {
    if (Object.hasOwn(order, "orderType")) {
      deleteFundTransaction(order.id);
    } else {
      deleteOrder(order.id);
    }
  };

  const filteredAccounts =
    accountQuery === ""
      ? accounts
      : accounts?.filter((account: InvestmentAccount) =>
        account.accountLabel
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(accountQuery.toLowerCase().replace(/\s+/g, ""))
      );

  const [tradeModal, setTradeModal] = useState(false);

  return loadingAccounts ? (
    <div className="flex h-[70vh] items-center justify-center">Loading...</div>
  ) : (accounts?.length == 0 && !selectedAccount) ? <div className="flex h-[70vh] items-center justify-center">User has no investment accounts!!</div> : (
    <>
      <NewTradeOrder
        open={tradeModal}
        account={selectedAccount!}
        setOpen={setTradeModal}
      />
      <EditFundModal fundModal={fundModal} closeModal={closeFundModal} />
      <EditOrderModal orderModal={orderModal} closeModal={closeModal} />

      <div className="relative mb-8">
        <CardHeader title="all orders" />
        <button
          onClick={() => setTradeModal(!tradeModal)}
          className="primary-btn absolute right-0 top-0"
        >
          <HiPlus /> <span className="ml-2">New order</span>
        </button>
      </div>
      <div className="flex w-full items-end justify-between">
        <div className="w-3/12">
          <label className="text-xs">Choose account</label>
          <Combobox value={selectedAccount} onChange={handleAccountChange}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-md border-1 border-gray-300 bg-white text-left sm:text-xs">
                <Combobox.Input
                  className="w-full border-0 py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 focus:border-l-4 focus:border-primary"
                  displayValue={(account: any) =>
                    account?.accountLabel + " - " + account?.accountNo
                  }
                  onChange={(e) => setAccountQuery(e.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setAccountQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                  {filteredAccounts?.length === 0 && accountQuery !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredAccounts?.map((account) => (
                      <Combobox.Option
                        key={account.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-900"
                          }`
                        }
                        value={account}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
                                }`}
                            >
                              {account?.accountLabel +
                                " - " +
                                account?.accountNo}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-gray-900"
                                  }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        {/* Error and Success Message Display and Loading Spinners */}

        <div className="mx-auto flex w-1/2 items-center justify-center text-center">
          {responseMessage.error ? (
            <ErrorDisplay>{responseMessage.error}</ErrorDisplay>
          ) : responseMessage.success ? (
            <SuccessDisplay>{responseMessage.success}</SuccessDisplay>
          ) : cancelingOrder ? (
            <LoadingSpinner size="lg" label="Canceling Orders" lookup />
          ) : cancelingFundTransaction ? (
            <LoadingSpinner
              size="lg"
              label="Canceling Fund Transaction"
              lookup
            />
          ) : deletingOrder ? (
            <LoadingSpinner size="lg" label="Deleting Orders" lookup />
          ) : deletingFundTransaction ? (
            <LoadingSpinner
              size="lg"
              label="Deleting Fund Transaction"
              lookup
            />
          ) : null}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex mt-8 ">
        <div className="grid grid-cols-8 gap-2">
          <div className="flex flex-col text-xs">
            <label htmlFor="from">From</label>
            <input
              name="from"
              onChange={handleChange}
              value={from}
              type="date"
              className="w-full rounded-md text-xs"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="to">To</label>
            <input
              name="to"
              onChange={handleChange}
              value={to}
              type="date"
              className="w-full rounded-md text-xs"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="symbol">Symbol</label>
            <input
              name="symbol"
              onChange={handleChange}
              value={symbol}
              type="text"
              className="w-full appearance-none rounded-md text-xs"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="order">Order No.</label>
            <input
              name="order"
              onChange={handleChange}
              value={order}
              type="text"
              className="w-full appearance-none rounded-md text-xs"
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="orderType">Order Type</label>
            <select
              name="orderType"
              onChange={handleChange}
              value={orderType}
              className=" appearance-none rounded-md text-xs"
            >
              <option value={""}>----------</option>
              {[
                ...(Object.keys(Order.side) as Array<
                  keyof typeof FundTransaction.orderType
                >),
                ...(Object.keys(FundTransaction.orderType) as Array<
                  keyof typeof Order.side
                >),
              ].map((option, index) => (
                <option key={index} value={option}>
                  {capitalize(option)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="orderStatus">Order Status</label>
            <select
              name="orderStatus"
              onChange={handleChange}
              value={orderStatus}
              className=" appearance-none rounded-md text-xs"
            >
              <option value={""}>--------------</option>
              {(
                Object.keys(Order.orderStatus) as Array<
                  keyof typeof Order.orderStatus
                >
              ).map((option, index) => (
                <option key={index} value={option}>
                  {capitalize(option)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="securityType">Security Type </label>
            <select
              name="secType"
              onChange={handleChange}
              value={secType}
              className=" appearance-none rounded-md text-xs"
            >
              <option value={""}>--------------</option>
              {(
                Object.keys(FundTransaction.fundType) as Array<
                  keyof typeof FundTransaction.fundType
                >
              ).map((option, index) => (
                <option key={index} value={option}>
                  {capitalize(option)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="result">Page</label>
            <input
              name="page"
              value={page}
              onChange={handleChange}
              type="number"
              className="w-full appearance-none rounded-md text-xs"
            />
          </div>

        </div>
        <div className="col-span-2 ml-5 mt-2 flex justify-center items-center">
          <button
            type="submit"
            className="rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
          >
            apply
          </button>
          <button
            type="reset"
            className="rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
            onClick={() => {
              resetForm();
              setOrdersAndFundTransactions(ordersAndFundTransaction);
            }}
          >
            Reset
          </button>
        </div>
      </form>
      <div className="min-w-screen min-h-screenflex mt-8 items-center justify-center overflow-hidden rounded-xl">
        <div className="w-full">
          <div className="flex flex-col items-center bg-gray-50 shadow-md">
            <table className={theme == "light" ? "w-full min-w-max table-auto" : "w-full bg-[#2a303c] min-w-max table-auto"}>
              <thead>
                <tr className="bg-gray-200 text-xs capitalize leading-normal text-gray-500">
                  <th className="px-6 py-3 text-left">Order #</th>
                  <th className="px-6 py-3 text-center">Trans Date</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={theme == "light" ? "text-xs font-light text-gray-600" : "text-xs font-light text-gray-100"}>
                {!loadingOrdersAndFundTransactions && !filteringOrder ? (
                  ordersAndFundTransactions?.map((order) => (
                    <tr
                      key={order.createdAt}
                      className={theme == "light" ? "border-b border-gray-200 hover:bg-gray-50" : "border-b border-gray-200 hover:bg-[#1a202b]"}
                    >
                      <td className="whitespace-nowrap px-6 py-3 text-left">
                        <div className="items-left flex">
                          <span className="font-medium">{order.orderNo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span>{order.createdAt.split("T")[0]}</span>
                      </td>
                      <td className="px-6 py-3 text-left">
                        <span>{order.orderDesc}</span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="pills pills-primary">
                          {formatStatus(order.orderStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="item-center relative flex justify-center">
                          <Menu>
                            {({ open }) => (
                              <>
                                <Menu.Button className="-mr-3 -mt-2 ml-2 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:text-primary">
                                  <HiDotsVertical />
                                </Menu.Button>
                                {open && (
                                  <Menu.Items
                                    as={motion.div}
                                    initial={{ height: "0", opacity: "0" }}
                                    animate={{
                                      height: "auto",
                                      opacity: "1",
                                    }}
                                    transition={{ duration: "0.15" }}
                                    className="absolute -top-3 right-12 z-10 flex justify-center divide-y divide-gray-200 rounded-sm bg-gray-50 text-sm shadow transition duration-500 ease-in-out focus:outline-none"
                                  >
                                    <Menu.Item disabled={order.orderStatus !== Order.orderStatus.PENDING && order.orderStatus !== "REVERSED"}>
                                      {({ active, disabled }) => (
                                        <a
                                          className={`${active ? "text-error" : disabled ? "cursor-auto" : ""
                                            } block whitespace-nowrap p-2`}
                                          href="#"
                                          onClick={() =>
                                            handleCancelOrder(order)
                                          }
                                        >
                                          <RiIndeterminateCircleLine className={`${disabled && ` text-gray-400 `} h-4 w-4`} />
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item disabled={order.orderStatus !== Order.orderStatus.PENDING}>
                                      {({ active, disabled }) => (
                                        <a
                                          className={`${active ? "text-primary" : disabled ? "cursor-auto" : ""
                                            } block whitespace-nowrap p-2`}
                                          href="#"
                                          onClick={() => openModal(order)}
                                        >
                                          <FiEdit2 className={`${disabled && ` text-gray-400 `} h-4 w-4`} />
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item disabled={order.orderStatus !== Order.orderStatus.PENDING}>
                                      {({ active, disabled }) => (
                                        <a
                                          className={`${active ? "text-error" : disabled ? "cursor-auto" : ""
                                            } block whitespace-nowrap p-2`}
                                          href="#"
                                          onClick={() =>
                                            handleDeleteOrder(order)
                                          }
                                        >
                                          <FiTrash2 className={`${disabled && ` text-gray-400 `} h-4 w-4`} />
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                )}
                              </>
                            )}
                          </Menu>
                          {/* ))} */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            {(loadingOrdersAndFundTransactions || filteringOrder) && (
              <div className="my-5">
                <LoadingSpinner size="lg" label="Loading Orders" lookup />
              </div>
            )}
            {ordersAndFundTransactions?.length == 0 && !loadingOrdersAndFundTransactions && !filteringOrder && (
              <div className="p-2 text-xl">No Orders Found!!!</div>
            )}
            {/* ordersAndFundTransactions &&
              ordersAndFundTransactions?.length >= 10 && <Pagination /> */}
          </div>
        </div>
      </div>
    </>
  );
};
Trading.getLayout = function(page: any) {
  return <InvestLayout>{page}</InvestLayout>;
};
export default Trading;
