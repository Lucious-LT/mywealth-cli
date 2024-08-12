import { Fragment, useEffect, useState } from "react";
import { Menu, Tab, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { HiChevronDown } from "react-icons/hi";
import CardHeader from "~/components/layout/card-header";
import { type ApexOptions } from "apexcharts";
import { type Props } from "react-apexcharts";
import { GoTriangleUp } from "react-icons/go";
import classNames from "classnames";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import {
  FixedDepositTransaction,
  FundTransaction,
  InvestmentAccount,
  Order,
  OrderRequest,
} from "~/server/api/models/investing";
import { LoadingSpinner } from "~/components/util/spinner";
import { formatMoney, formatMoneyWithSymbol } from "~/utils/format";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PortfolioAnalysis: React.FC<Props> = ({ }) => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  const { data: report } = api.reports.getClientCenterValuationReport.useQuery({ clientId: clientId })
  const options: ApexOptions = {
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: "65%",
        },
      },
    },
    fill: {
      type: "gradient",
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: true,
      position: "bottom",
      containerMargin: {
        left: 0,
      },
      fontSize: "11px",
      fontFamily: "'Nunito Sans', sans-serif",
      fontWeight: "500",
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5", "#132E32"],
    labels: report?.assetAllocationByCategory["this-week"]?.labels ?? [],
    tooltip: {
      x: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },
    },
  };

  const series = report?.assetAllocationByCategory["this-week"]?.value ?? [];

  return (
    // @ts-ignore
    <ReactApexChart
      type="donut"
      options={options}
      series={series}
      height={300}
    />
  );
};

const Accounts = () => {
  dynamic(() => import("./accounts"), {
    ssr: false,
  });
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  const router = useRouter()

  const [selectedAccount, setSelectedAccount] = useState<InvestmentAccount | null>(null);

  const { data: accounts, isLoading: loadingAccounts } = api.invest.getAccountsForClient.useQuery(
    clientId,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: treasuryBills, isLoading: loadingTreasuryBills } =
    api.invest.listAccountMoneyMarketTransactions.useQuery(selectedAccount?.id!, {
      enabled: selectedAccount != null
    })

  const { data: fixedDeposit, isLoading: loadingFixedDeposit } =
    api.invest.listAccountFixedDepositTransactions.useQuery(selectedAccount?.id!, {
      enabled: selectedAccount != null
    })

  const { data: equities, isLoading: loadingEquities } =
    api.order.listAccountEquityOrders.useQuery(
      { accountId: selectedAccount?.id! },
      {
        enabled: selectedAccount != null,
      }
    );
  const { data: bonds, isLoading: loadingBonds } =
    api.order.listAccountBondOrders.useQuery(
      { accountId: selectedAccount?.id! },
      {
        enabled: selectedAccount != null,
      });

  const { data: funds, isLoading: loadingFunds } =
    api.invest.listAccountFundTransaction.useQuery(
      { accountId: selectedAccount?.id! },
      {
        enabled: selectedAccount != null,
      }
    );

  const { data: clientReports } = api.reports.getClientCenterValuationReport.useQuery({ clientId: clientId })
  const totalValue = clientReports?.assetAllocationByCategory["this-week"]?.value.reduce((prev, current) => {
    return prev += current;
  }, 0) ?? 0;
  const totalCash = clientReports?.assetAllocationByCategory["this-week"]?.totalCash ?? 0;
  const ROI = (totalValue - totalCash) / (totalCash * 100)
  const returns = totalValue - totalCash;

  useEffect(() => {
    if (accounts && accounts[0]) setSelectedAccount(accounts[0]);
  }, [accounts]);

  return loadingAccounts ? (
    <div className="flex h-[70vh] items-center justify-center">Loading...</div>
  ) : (accounts?.length == 0 && !selectedAccount) ? <div className="flex h-[70vh] items-center justify-center">User has no investment accounts!!</div> : (
    <>
      {/* My portfolio  */}
      <div className="relative mb-8">
        <CardHeader
          title={
            selectedAccount
              ? selectedAccount.accountLabel + " - " + selectedAccount.accountNo
              : "My Portfolio"
          }
          status={selectedAccount?.status}
          usage={selectedAccount?.accountUsage}
          cashBalance={selectedAccount?.cashBalance}
          refCode={selectedAccount?.refCode}
          currency={selectedAccount?.currency}
          mgmtType={selectedAccount?.mgmtType}
        />
        <div className="absolute right-0 top-0">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="primary-btn px-6">
              <span className="px-6">
                {selectedAccount
                  ? selectedAccount.accountNo
                  : "SelectOption Portfolio"}
              </span>
              <HiChevronDown aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-linear duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y-1 divide-gray-200 rounded-md bg-gray-50 shadow-md">
                {accounts?.map((account, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <a
                        onClick={() => setSelectedAccount(account)}
                        className={`${active && `bg-gray-100`
                          } block cursor-pointer  py-2 pl-2 text-xs text-gray-900`}
                      >
                        {account.accountLabel + "-" + account.accountNo}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 rounded-xl bg-gray-50 p-4 shadow ">
        <div className="flex flex-auto flex-col border-r-1 border-gray-200">
          <div className="header">Return</div>
          <div className="mt-3 flex items-end justify-start space-x-3">
            <div className={`text-2xl font-bold leading-tight tracking-tight ${returns < 0 ? `text-error` : `text-primary`}`}>
              {clientReports && formatMoney(returns)}
            </div>
            {/* <GoTriangleUp className="text-lg text-success" /> */}
            {/* <span className="text-sm">{portfolioHighlight?.percentProfit}%</span> */}
          </div>
        </div>
        <div className="flex flex-auto flex-col ">
          <div className="header">Total Investments</div>
          <div className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
            {clientReports && `${clientReports?.reportCurrency === `USD` ? `$` : `₦`}${formatMoney(totalCash)}`}
          </div>
        </div>
        <div className="flex flex-auto flex-col ">
          <div className="header">Current Value</div>
          <div className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-primary">
            {clientReports && `${clientReports?.reportCurrency === `USD` ? `$` : `₦`}${formatMoney(totalValue)}`}
          </div>
        </div>
        <div className="flex flex-auto flex-col border-r-1 border-gray-200">
          <div className="truncate text-sm font-semibold leading-6  tracking-tight">
            ROI
          </div>
          <div className={`mt-3 text-2xl font-semibold leading-tight tracking-tight ${ROI < 0 ? `text-error` : `text-primary`}`}>
            {clientReports && formatMoney(ROI)}%
          </div>
        </div>
        <div className="flex flex-auto flex-col px-10 py-3">
          <button onClick={() => router.push("/invest/trading")} className="secondary-btn">Invest</button>
        </div>
      </div>
      {/* My investments  */}
      <div className="mt-8">
        <div className="mb-8">
          <CardHeader title="My Investments" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="rounded-xl bg-gray-50 p-4 shadow">
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
                    Equities
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
                    Mutual Funds
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
                    Bonds
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
                    Fixed Deposits
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "pb-2 text-sm leading-5 transition ease-linear focus:outline-none",
                        selected
                          ? "duration-750 border-b-2 border-primary transition-all ease-linear"
                          : " hover:bg-white/[0.12] hover:text-primary"
                      )
                    }
                  >
                    Treasury Bills
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
                    {/* equities */}
                    <Tab.Panel className={`${(loadingEquities || (equities && equities.length == 0)) && `justify-center items-center`} flex min-h-60 h-60 w-full overflow-y-auto`}>
                      {loadingEquities ? <LoadingSpinner label="Loading Equities" size="md" lookup /> : <div className="divide-y-1 divide-gray-200">
                        {equities &&
                          equities.map((order, index) => (
                            <div key={index} className="flex items-center space-x-8 justify-between py-4">
                              <div className="flex items-center">
                                <div className="mx-4 flex flex-auto flex-col space-y-1">
                                  <span className="text-sm font-bold">
                                    {order.secId}
                                  </span>
                                  <span className="badges">
                                    {order.orderDesc}
                                  </span>
                                </div>
                              </div>
                              <div className="mx-2 flex flex-col space-y-1">
                                <div className="sub-header">Status</div>
                                <div
                                  className={
                                    order.orderStatus ==
                                      Order.orderStatus.FILLED ||
                                      order.orderStatus ==
                                      Order.orderStatus.APPROVED
                                      ? "rounded text-xs font-bold tracking-wider text-success"
                                      : order.orderStatus ==
                                        Order.orderStatus.NEW ||
                                        order.orderStatus ==
                                        Order.orderStatus.PENDING
                                        ? "rounded text-xs font-bold tracking-wider text-primary"
                                        : "rounded text-xs font-bold tracking-wider text-error"
                                  }
                                >
                                  {order.orderStatus}
                                </div>
                              </div>

                              <div className=" mx-2 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Order No.</span>
                                <span className="text-xs font-bold">
                                  {order.orderNo}
                                </span>
                              </div>
                              <div className=" mx-2 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Side</span>
                                <span className="text-xs font-bold">
                                  {order.side}
                                </span>
                              </div>
                              <div className=" mx-2 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Order Date</span>
                                <span className="text-xs font-bold">
                                  {DateToStringFormatter(order.createdAt)}
                                </span>
                              </div>
                              {order.side == OrderRequest.side.BUY ? (
                                <div className="secondary-btn">SELL</div>
                              ) : (
                                <div className="px-10"></div>
                              )}
                            </div>
                          ))}
                      </div>}
                      {
                        equities?.length == 0 &&
                        <div className="p-2 text-lg">No Orders Found!!!</div>
                      }
                    </Tab.Panel>
                    {/* mutual_funds */}
                    <Tab.Panel className={`${(loadingFunds || (funds && funds.length == 0)) && `flex justify-center items-center`} min-h-60 h-60 overflow-y-auto px-4`}>
                      {loadingFunds ? <LoadingSpinner label="Loading funds" size="md" lookup /> : <div className="divide-y-1 divide-gray-200">
                        {funds &&
                          funds.map((fund, index) => (
                            <div key={index} className="grid grid-cols-10 py-4">
                              <div className="col-span-4">
                                <div className="flex items-center">
                                  <div className="mx-1 flex flex-auto flex-col space-y-1">
                                    <span className="text-sm font-bold">
                                      {fund.secId}
                                    </span>
                                    <span className="badges">
                                      {fund.orderDesc}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <div className=" mx-1 flex flex-col place-items-center space-y-1">
                                  <span className="sub-header">Status</span>
                                  <span
                                    className={`${fund.orderStatus ==
                                      FundTransaction.orderStatus.APPROVED ||
                                      fund.orderStatus ==
                                      FundTransaction.orderStatus.FILLED
                                      ? `text-success`
                                      : fund.orderStatus ==
                                        FundTransaction.orderStatus.PENDING
                                        ? `text-primary`
                                        : `text-error`
                                      } text-xs font-bold`}
                                  >
                                    {fund.orderStatus}
                                  </span>
                                </div>
                              </div>
                              <div className=" mx-1 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">order no</span>
                                <span className="text-xs font-bold">
                                  {fund.orderNo}
                                </span>
                              </div>
                              <div className=" mx-1 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Units</span>
                                <span className="text-xs font-bold">
                                  {fund.requestedQty}
                                </span>
                              </div>
                              <div className="col-span-2">
                                <div className=" mx-1 flex flex-col place-items-center space-y-1 ">
                                  <span className="sub-header">
                                    Trans. Date
                                  </span>
                                  <span className="text-xs font-bold">
                                    {DateToStringFormatter(fund.createdAt)}
                                  </span>
                                </div>
                              </div>
                              {/* <div className="col-span-2">
                                <button className="secondary-btn text-left">
                                  redeem
                                </button>
                              </div> */}
                            </div>
                          ))}
                      </div>}
                      {
                        funds?.length == 0 &&
                        <div className="p-2 text-lg">No Orders Found!!!</div>
                      }
                    </Tab.Panel>
                    {/* bonds */}
                    <Tab.Panel className={`${(loadingBonds || (bonds && bonds.length == 0)) && `flex justify-center items-center`} min-h-60 h-60 overflow-y-auto px-4`}>
                      {loadingBonds ? <LoadingSpinner label="Loading Bonds" size="md" lookup /> : <div className="divide-y-1 divide-gray-200">
                        {bonds &&
                          bonds.map((order, index) => (
                            <div key={index} className="flex items-center justify-between py-4">
                              <div className="flex items-center">
                                {/* <Image
                                  src={amazon}
                                  alt="amzn"
                                  className="h-12 w-12 rounded-full object-cover"
                                /> */}
                                <div className="mx-4 flex flex-auto flex-col space-y-1">
                                  <span className="text-sm font-bold">
                                    {order.secId}
                                  </span>
                                  <span className="badges">
                                    {order.orderDesc}
                                  </span>
                                </div>
                              </div>
                              <div className="mx-2 flex flex-col space-y-1">
                                <div className="sub-header">Status</div>
                                <div
                                  className={
                                    order.orderStatus ==
                                      Order.orderStatus.FILLED ||
                                      order.orderStatus ==
                                      Order.orderStatus.APPROVED
                                      ? "rounded text-xs font-bold tracking-wider text-success"
                                      : order.orderStatus ==
                                        Order.orderStatus.NEW ||
                                        order.orderStatus ==
                                        Order.orderStatus.PENDING
                                        ? "rounded text-xs font-bold tracking-wider text-primary"
                                        : "rounded text-xs font-bold tracking-wider text-error"
                                  }
                                >
                                  {order.orderStatus}
                                </div>
                              </div>

                              <div className=" mx-2 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Order No.</span>
                                <span className="text-xs font-bold">
                                  {order.orderNo}
                                </span>
                              </div>
                              <div className=" mx-2 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Side</span>
                                <span className="text-xs font-bold">
                                  {order.side}
                                </span>
                              </div>
                              <div className=" mx-2 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Order Date</span>
                                <span className="text-xs font-bold">
                                  {DateToStringFormatter(order.createdAt)}
                                </span>
                              </div>
                              {order.side == OrderRequest.side.BUY ? (
                                <div className="secondary-btn">SELL</div>
                              ) : (
                                <div className="px-10"></div>
                              )}
                            </div>
                          ))}
                      </div>}
                      {
                        bonds?.length == 0 &&
                        <div className="p-2 text-lg">No Orders Found!!!</div>
                      }
                    </Tab.Panel>
                    {/* fixed deposits */}
                    <Tab.Panel className={`${(loadingFixedDeposit || (fixedDeposit && fixedDeposit.length == 0)) && `flex justify-center items-center`} min-h-60 h-60 overflow-y-auto px-4`}>
                      {loadingFixedDeposit ? <LoadingSpinner label="Loading fixed income" size="md" lookup /> :
                        <div className="divide-y-1 divide-gray-200">
                          {fixedDeposit && fixedDeposit.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-4">
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Order No.</span>
                                <span className="text-sm font-bold">
                                  {item.orderNo}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Tenor</span>
                                <span className="text-sm font-bold">
                                  {item.tenor}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Status</span>
                                <span className={
                                  item.status ==
                                    FixedDepositTransaction.status.RUNNING ||
                                    item.status ==
                                    FixedDepositTransaction.status.APPROVED
                                    ? "rounded text-xs font-bold tracking-wider text-success"
                                    : item.status ==
                                      FixedDepositTransaction.status.REVERSED ||
                                      item.status ==
                                      FixedDepositTransaction.status.PENDING
                                      ? "rounded text-xs font-bold tracking-wider text-primary"
                                      : "rounded text-xs font-bold tracking-wider text-error"
                                }>
                                  {item.status}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Current value</span>
                                <span className="text-sm font-bold">{formatMoneyWithSymbol(item.currency, item.totalAmount)}</span>
                              </div>

                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Start Date</span>
                                <span className="text-sm font-bold">
                                  {DateToStringFormatter(item.startDate)}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">End Date</span>
                                <span className="text-sm font-bold">
                                  {DateToStringFormatter(item.maturityDate)}
                                </span>
                              </div>
                              {/* {item.status == FixedDepositTransaction.status.RUNNING ? <div className="secondary-btn">LIQUIDATE</div> : <div className="w-[120px]"></div>} */}
                            </div>

                          ))}
                        </div>}
                      {
                        fixedDeposit?.length == 0 &&
                        <div className="p-2 text-lg">No Orders Found!!!</div>
                      }
                    </Tab.Panel>
                    {/* treasury bills  */}
                    <Tab.Panel className={`${(loadingTreasuryBills || (treasuryBills && treasuryBills.length == 0)) && `flex justify-center items-center`} min-h-60 h-60 overflow-y-auto px-4`}>
                      {loadingTreasuryBills ? <LoadingSpinner label="Loading treasury bills" size="md" lookup /> :
                        <div className="divide-y-1 divide-gray-200">
                          {treasuryBills && treasuryBills.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-4">
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Order No.</span>
                                <span className="text-sm font-bold">
                                  {item.orderNo}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Tenor</span>
                                <span className="text-sm font-bold">
                                  {item.tenor}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Status</span>
                                <span className={
                                  item.status ==
                                    FixedDepositTransaction.status.RUNNING ||
                                    item.status ==
                                    FixedDepositTransaction.status.APPROVED
                                    ? "rounded text-xs font-bold tracking-wider text-success"
                                    : item.status ==
                                      FixedDepositTransaction.status.REVERSED ||
                                      item.status ==
                                      FixedDepositTransaction.status.PENDING
                                      ? "rounded text-xs font-bold tracking-wider text-primary"
                                      : "rounded text-xs font-bold tracking-wider text-error"
                                }>
                                  {item.status}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1">
                                <span className="sub-header">Current value</span>
                                <span className="text-sm font-bold">{formatMoneyWithSymbol(item.currency, item.totalAmount)}</span>
                              </div>

                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">Start Date</span>
                                <span className="text-sm font-bold">
                                  {DateToStringFormatter(item.startDate)}
                                </span>
                              </div>
                              <div className=" mx-4 flex flex-col place-items-center space-y-1 ">
                                <span className="sub-header">End Date</span>
                                <span className="text-sm font-bold">
                                  {DateToStringFormatter(item.maturityDate)}
                                </span>
                              </div>                            </div>))}
                        </div>}
                      {
                        treasuryBills?.length == 0 &&
                        <div className="p-2 text-lg">No Orders Found!!!</div>
                      }
                    </Tab.Panel>
                  </Tab.Panels>
                </Transition>
              </Tab.Group>
            </div >
          </div >
          {/* <div className="col-span-2"> */}
          < div className="rounded-xl bg-gray-50 p-4 shadow" >
            <PortfolioAnalysis />
          </div >
          {/* </div> */}
        </div >
      </div >
    </>
  );
};

export default Accounts;
