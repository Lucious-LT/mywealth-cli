/* eslint-disable */
// noinspection JSUnusedLocalSymbols

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Tab as HTab, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Input, Option, Select as MSelect, TabPanel } from "@material-tailwind/react";
import classNames from "classnames";
import * as yup from "yup";
import { NumberFormatter, QuantityFormatter } from "~/components/util/number-formatter";
import { type Equity, type Market } from "~/server/api/models/position";
import { type InvestmentAccount, OrderRequest } from "~/server/api/models/investing";
import { type FormikValues, useFormik } from "formik";
import { api } from "~/utils/api";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";
import { capitalize, formatMoney } from "~/utils/format";
import { LoadingSpinner } from "~/components/ui/spinner";
import { getTenantId, getWsUrl } from "~/components/util/tenant";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

type Props = {
  selectedMarket: Market | null;
  account: InvestmentAccount;
};

const MessageTypes = {
  SessionStatus: "SessionStatus",
  SecurityList: "SecurityList",
  SecurityStats: "SecurityStats",
  TradeEvent: "TradeEvent",
  MarketNews: "MarketNews",
  LogonRequest: "LogonRequest",
  LogonResponse: "LogonResponse",
  LogoffResponse: "LogoffResponse",
  SubscriptionRequest: "SubscriptionRequest",
  SubscriptionResponse: "SubscriptionResponse",
  MarketDefinitionRequestMsg: "MarketDefinitionRequest",
  MarketDefinitionResponseMsg: "MarketDefinitionResponse"
};

type TradeDistributionData = {
  trades: [] | null
  secId: string
};

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TradeDistribution: React.FC<TradeDistributionData> = ({trades, secId}) => {


  //Generate an array of trade data by mapping the tradePrice & size  &
  // const ts = trades?.map(trade => [trade.tradePrice, trade.size]) ?? [];
  const groupedTrades = (trades || []).reduce((acc, trade) => {
    // @ts-ignore
    if (!acc[trade.tradePrice]) {
      // @ts-ignore
      acc[trade.tradePrice] = 0;
    }
    // @ts-ignore
    acc[trade.tradePrice] += trade.size;
    return acc;
  }, {});

  const tradePrices = Object.keys(groupedTrades).map(Number);
  const sizes = Object.values(groupedTrades);

  const maxTradePrice = Math.max(...tradePrices);
  const minTradePrice = Math.min(...tradePrices);
  // @ts-ignore
  const maxSize = Math.max(...sizes);
  // @ts-ignore
  const minSize = Math.min(...sizes);

  const tradePriceRange = maxTradePrice - minTradePrice;
  const sizeRange = maxSize - minSize;

  const xaxisTickAmount = Math.round(tradePriceRange / 10);
  const yaxisTickAmount = Math.round(sizeRange / 20);

  const ts = Object.entries(groupedTrades).map(([key, value]) => [value, Number(key)]);
  const series = [{
    name: secId,
    data: ts
  }];

  const options = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: false,
        type: 'xy'
      },
      toolbar: {
        show: false,
      }
    },
    xaxis: {
      tickAmount: xaxisTickAmount as number,
      labels: {
        formatter: function(val: string) {
          return parseFloat(val).toFixed(0)
        }
      }
    },
    yaxis: {
      // tickAmount: yaxisTickAmount as number,
      labels: {
        formatter: function(val: string) {
          return parseFloat(val).toFixed(2)
        }
      }
    }
  };

  // noinspection HtmlUnknownAttribute

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    <ReactApexChart
      type="scatter"
      // @ts-ignore
      options={options}
      // @ts-ignore
      series={series}
      height={350}
    />
  )
}

const EquityOrderTab = ({ account, selectedMarket }: Props) => {
  const { data: sessionData } = useSession();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [securityStats, setSelectedSecStats] = useState(null);
  const [bidOfferHistogram, setBidOfferHistogram] = useState(null);
  const [secQuery, setSecQuery] = useState("");
  const [selectedEquity, setSelectedEquity] = useState<Equity | null>(null);
  const [selectedEquityError, setSelectedEquityError] = useState({
    message: ""
  });
  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: ""
  });

  //todo add a feature to validate and calculate the estimated order total via the APIs

  //Get the tenantId & API key
  const tenantId = getTenantId();
  const { data: apiKey } = api.invest.getMdsApiKeyForTenant.useQuery(tenantId);

  const wsUrl = getWsUrl();
  const ws = useRef<WebSocket>(new WebSocket(wsUrl));
  const isLoggedOn = useRef<boolean>(false);
  const sessionStatus = useRef<string>("NA");
  const retries = useRef<number>(0);
  const maxRetries = 5;

  // Clean up function to close the WebSocket connection when the component unmounts
  useEffect(() => {
    return () => {
      if (ws) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    function getBarColor(qty: number, percentile25: number, percentile50: number, percentile75: number, percentile90: number) {
      // Set the color based on the percentile of the quantity
      if (qty < percentile25) {
        return 'red';
      } else if (percentile25 > qty && qty <= percentile50) {
        return 'yellow';
      } else if (percentile50 > qty && qty <= percentile75) {
        return 'orange';
      } else if (percentile75 > qty && qty <= percentile90) {
        return 'skyblue';
      } else {
        return 'limegreen';
      }
    }

    function updatePriceHistogram(securityStats: { bids: { price: number; qty: number; }[]; offers: { price: number; qty: number; }[]; }) {
      // Generate the histogram based on the data in the bids and offers tables of the selected security or just return
      if (!securityStats ||  !securityStats.bids || !securityStats.offers) {
        return;
      }

      // Get the bids and offers data
      const bidsData = securityStats.bids.map((bid: { price: number; qty: number; }) => ({price: bid.price, qty: bid.qty}));
      const offersData = securityStats.offers.map((offer: { price: number; qty: number; }) => ({price: offer.price, qty: offer.qty}));

      // Combine bids and offers data
      const data = bidsData.concat(offersData);

      // Calculate histogram data
      const histogramData = {};
      let maxQty = 0;
      // @ts-ignore
      data.forEach(item => {
        // @ts-ignore
        histogramData[item.price] = (histogramData[item.price] || 0) + item.qty;
        // @ts-ignore
        maxQty = Math.max(maxQty, histogramData[item.price]);
      });

      let quantities = [];
      for (const value in histogramData) {
        // @ts-ignore
        quantities.push(histogramData[value]);
      }
      quantities.sort((a, b) => a - b);
      const percentile25 = quantities[Math.floor(quantities.length * 0.25)];
      const percentile50 = quantities[Math.floor(quantities.length * 0.5)];
      const percentile75 = quantities[Math.floor(quantities.length * 0.75)];
      const percentile90 = quantities[Math.floor(quantities.length * 0.9)];

      // Create a new HTML fragment
      const fragment = document.createDocumentFragment();

      for (const value in histogramData) {
        // @ts-ignore
        const qty = histogramData[value];
        const width = (qty / maxQty) * 50; // Scale the width based on the maximum quantity
        const color = getBarColor(qty, percentile25, percentile50, percentile75, percentile90);
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'left';
        div.style.marginTop = '10px';
        div.style.marginLeft = '10px';
        // @ts-ignore
        div.innerHTML = `<span style="margin-right: 5px; font-size: 12px">${NumberFormatter(value)}</span>
    <span style="display: inline-block; width: ${width}%; height: 20px; background: ${color};" title="Quantity: ${QuantityFormatter(qty)}"></span>
    `;
        fragment.appendChild(div);
      }

      // Use a temporary div to convert the fragment to a string
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(fragment);
      // @ts-ignore
      setBidOfferHistogram(tempDiv.innerHTML);
    }

    // @ts-ignore
    updatePriceHistogram(securityStats);
  }, [securityStats]);


  useEffect(() => {
    function handleSessionStatus(data: any) {
      sessionStatus.current = data.sessionId;
    }

    function handleSecurityStats(data: any) {
      setSelectedSecStats(data);
    }

    function handleMarketStructure(data: any) {
      //todo
    }

    function handleTradeEvent(data: any) {
    }

    function getBackoffTime(retryCount: number) {
      const base = 1000;
      const cap = 30000;
      const factor = 2;
      const jitter = Math.random();

      let backoffTime = Math.min(base * Math.pow(factor, retryCount), cap);
      backoffTime = backoffTime * (1 + jitter); // Apply jitter
      return backoffTime;
    }

    function startNewSession() {
      console.log("WebSocket is connected..");
      retries.current = 0;

      // Attach the handlers
      ws.current.onmessage = (event) => {
        // Handle incoming messages
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case MessageTypes.SessionStatus:
            handleSessionStatus(msg.data);
            break;
          case MessageTypes.SecurityList:
            // Process security list message
            break;
          case MessageTypes.SecurityStats:
            handleSecurityStats(msg.data);
            break;
          case MessageTypes.MarketDefinitionResponseMsg:
            handleMarketStructure(msg.data);
            break;
          case MessageTypes.TradeEvent:
            handleTradeEvent(msg.data);
            break;
          case MessageTypes.MarketNews:
            // Process market news message
            break;
          case MessageTypes.LogonResponse:
            // Process logon response message
            if (msg.success) {
              //Create and send a subscription request
              isLoggedOn.current = true;
              startSubscription();
            } else {
              console.log("Could not complete logon :" + JSON.stringify(msg));
              ws.current.close();
            }
            break;
          case MessageTypes.SubscriptionResponse:
            break;
          default:
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(`Unknown message type: ${msg.type}`);
            break;
        }
      };

      //Close the socket when an error occurs
      ws.current.onerror = function(error) {
        console.warn(`WebSocket error: ${error}`);
        ws.current.close();
      };

      // Reconnect the socket when it closes due to an error
      ws.current.onclose = function(event) {
        if (event.wasClean) {
          console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
          return;
        } else {
          console.log("Connection died. Will try to reconnect.");
        }

        connectWithRetry().then(r => {});

      };

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // Logon to the MDS
      const logonMessage = {
        type: MessageTypes.LogonRequest,
        text: "Logon request",
        data: {
          tenant: tenantId,
          apiKey: apiKey,
          username: sessionData?.user?.email ?? "anonymous"
        }
      };
      ws.current.send(JSON.stringify(logonMessage));
    }

    async function connectWithRetry() {
      while (retries.current < maxRetries) {
        try {
          const wsUrl = getWsUrl();
          ws.current = new WebSocket(wsUrl);
          await new Promise((resolve, reject) => {
            ws.current.onopen = () => {
              startNewSession();
              resolve(null);
            };
            ws.current.onerror = (error) => {
              reject(error);
            };
          });
          break; // If connection is successful, break the loop
        } catch (e) {
          console.error("Error while reconnecting: ", e);
          const backoffTime = getBackoffTime(retries.current);
          console.log(`Reconnecting in ${backoffTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffTime));
          retries.current++;
        }
      }

      if (retries.current >= maxRetries) {
        console.log("Max retries reached. Giving up.");
      }
    }

    function startSubscription() {
      //Get the selected Market and security
      const secId = selectedEquity?.secId;
      const marketCode = selectedMarket?.marketCode;

      const msg = {
        type: MessageTypes.SubscriptionRequest,
        tenant: tenantId,
        text: "Subscription start request",
        data: {
          tenant: tenantId,
          username: sessionData?.user?.email ?? "anonymous",
          marketCode: marketCode,
          board: "*",
          secId: secId
        }
      };
      ws.current.send(JSON.stringify(msg));
    }

    if (selectedEquity) {
      // Check if the socket has been initialized and is open and logged on before sending messages
      if (ws.current && ws.current.readyState === WebSocket.OPEN && isLoggedOn.current) {
        startSubscription();
      } else {
        if (ws.current) {
          ws.current.close();
        }

        // Initialize a new WebSocket connection
        const wsUrl = getWsUrl();
        ws.current = new WebSocket(wsUrl);

        //Attach the handlers
        ws.current.onopen = () => {
          startNewSession();
        };

      }
    }
  }, [selectedEquity]);


  const utils = api.useUtils();

  let responseMessageTimeout: NodeJS.Timeout;

  const { data: equity, isLoading: isLoadingEquity } =
    api.position.listEquityByMarketCode.useQuery(selectedMarket?.marketCode!, {
      enabled: selectedMarket != null
    });
  let equityList: Equity[] | null = null;

  if (equity) {
    equityList = equity.content!;
  }

  // Set timeout for error or success messages
  useEffect(() => {
    if (responseMessage.error || responseMessage.success) {
      responseMessageTimeout = setTimeout(() => setResponseMessage({ error: "", success: "" }), 8000);
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout);
    };
  }, [responseMessage]);


  // Update selected equity when its loaded
  useEffect(() => {
    if (equityList && equityList[0]) {
      setSelectedEquity(equityList[0]);
      setSelectedEquityError({ message: "" });
    } else {
      setSelectedEquity(null);
    }
  }, [equityList]);

  const handleOrderSubmit = ({
                               orderType,
                               limitPrice,
                               quantity,
                               duration,
                               orderStrategy,
                               expirationDate,
                               notes,
                               noOfLegs
                             }: FormikValues) => {
    if (selectedEquity == null) return;
    const orderContent: OrderRequest = {
      accountId: account.id,
      side: orderType as OrderRequest.side,
      tif: duration as OrderRequest.tif,
      marketCode: selectedMarket?.marketCode ?? "",
      secId: selectedEquity?.secId ?? "",
      requestedQty: Number(quantity),
      limitPrice: limitPrice != "" ? Number(limitPrice) : undefined,
      currency: account.currency,
      numberOfLegs: noOfLegs ? Number(noOfLegs) : 1,
      assetType: OrderRequest.assetType.EQUITY,
      orderStrategy: orderStrategy ? orderStrategy as OrderRequest.orderStrategy : undefined,
      expires: expirationDate?.startDate ? expirationDate?.startDate as string : undefined,
      notes: notes ? notes as string : "",
      autoApprove: true,
      allOrNone: false
    };
    addOrder(orderContent);
  };

  const initialOrderValues = {
    orderType: "",
    priceType: "",
    limitPrice: "",
    noOfLegs: "",
    orderStrategy: "",
    expirationDate: null as unknown as DateValueType,
    quantity: "",
    duration: "",
    // autoApprove: true,
    notes: ""
  };

  const validateOrderSchema = yup.object().shape({
    orderType: yup.string().required("Required"),
    priceType: yup.string().required("Required"),
    limitPrice: yup
      .number()
      .when("priceType", ([priceType], schema) =>
        priceType == "LIMIT"
          ? schema.required("Required")
          : schema.notRequired()
      )
      .moreThan(0, "must be greater than 0"),
    quantity: yup
      .number()
      .required("Required")
      .moreThan(0, "must be greater than 0"),
    duration: yup.string().required("Required"),
    noOfLegs: yup.number().integer().positive(),
    orderStrategy: yup.string(),
    notes: yup.string(),
    expirationDate: yup
      .object()
      .when("duration", ([duration], schema) =>
        duration == OrderRequest.tif.GOOD_TILL_DATE
          ? schema.required("Required")
          : schema.notRequired()
      )
    // autoApprove: yup.boolean(),
  });

  const {
    resetForm,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue
  } = useFormik({
    initialValues: initialOrderValues,
    onSubmit: handleOrderSubmit,
    validationSchema: validateOrderSchema
  });

  const { mutate: addOrder, isLoading: addingOrder } = api.order.addOrder.useMutation({
    onSuccess: () => {
      resetForm();
      setResponseMessage({ success: "Your order has been submitted", error: "" });
      utils.invest.listAccountOrdersAndFundTransactions.invalidate();
    },
    onError: (error) =>
      setResponseMessage({ success: "", error: error.message.replaceAll(/[\{\}]/g, "") })
  });

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <TabPanel value="equity" className="h-full p-0">
        {!isLoadingEquity && equityList != null ? (
          <div className="space-y-4 overflow-hidden">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-4 rounded-md bg-white p-5 shadow-md">
                <span className="text-xl font-bold uppercase">
                  {selectedEquity
                    ? `${selectedEquity?.secId ?? ""} - ${selectedEquity?.secDesc ?? ""
                    }`
                    : "No symbol under market"}
                </span>
                <span className="text-xl font-bold float-right">
                {`${account.currency} ${formatMoney(account.cashBalance)}`}
                </span>
                <hr className="my-4" />
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <div>
                      <label className="text-xs text-gray-700">Symbol</label>
                      <div className="w-full">
                        <Combobox
                          value={selectedEquity}
                          onChange={setSelectedEquity}
                        >
                          <div className="relative">
                            <div
                              className={
                                selectedEquityError.message == ""
                                  ? "relative w-full cursor-default overflow-hidden rounded-md border-1 border-blue-gray-300 bg-white text-left sm:text-xs"
                                  : "relative w-full cursor-default overflow-hidden rounded-md border-1 border-red-400 bg-white text-left sm:text-xs"
                              }
                            >
                              <Combobox.Input
                                className="w-full border-0 py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 focus:border-l-4 focus:border-primary"
                                displayValue={(security: Equity) =>
                                  selectedEquity ? security?.secId! : ""
                                }
                                onChange={(e) => setSecQuery(e.target.value)}
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
                              afterLeave={() => setSecQuery("")}
                            >
                              <Combobox.Options
                                className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                                {equityList.length === 0 && secQuery !== "" ? (
                                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                  </div>
                                ) : (
                                  equityList.map((security) => (
                                    <Combobox.Option
                                      key={security.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-2 pr-4 ${active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-900"
                                        }`
                                      }
                                      value={security}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`flex justify-between truncate uppercase ${selected
                                              ? "font-medium"
                                              : "font-normal"
                                            }`}
                                          >
                                            <span className="font-extrabold text-gray-900">
                                              {security.secId}
                                            </span>
                                            <span className=" text-gray-500">
                                              {security.secDesc}
                                            </span>
                                          </span>
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))
                                )}
                              </Combobox.Options>
                            </Transition>
                          </div>
                        </Combobox>
                        <span className="text-xs text-red-400">
                          {selectedEquityError.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="mt-4 grid grid-cols-9 gap-4">
                      <div className="col-span-3">
                        <div className="rounded-md bg-gray-50 py-2">
                          <div className="flex flex-col place-items-center space-y-1">
                            <span className="sub-header">
                              <h2>Last Price</h2>
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-extrabold">
                                {NumberFormatter(
                                  // @ts-ignore
                                  securityStats?.lastPx ?? 0 as number
                                )}
                              </span>
                              <span className="text-xs font-bold">{`x ${QuantityFormatter(
                                // @ts-ignore
                                securityStats?.lastQty ?? 0
                              )
                              }`}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="rounded-md bg-gray-50 py-2">
                          <div className="flex flex-col place-items-center space-y-1">
                            <span className="sub-header">
                              <h2>Best Bid</h2>
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-extrabold">
                                {NumberFormatter(
                                  // @ts-ignore
                                  securityStats?.bestBidPx ?? 0.00 as number
                                )}
                              </span>
                              <span
                                className="text-xs font-bold">{`x 
                                ${QuantityFormatter(
                                // @ts-ignore
                                  securityStats?.bestBidQty ?? 0)
                              }`}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="rounded-md bg-gray-50 py-2">
                          <div className="flex flex-col place-items-center space-y-1">
                            <span className="sub-header">
                              <h2>Best Offer</h2>
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-extrabold">
                                {NumberFormatter(
                                  // @ts-ignore
                                  securityStats?.bestOfferPx ?? 0 as number
                                )}
                              </span>
                              <span
                                className="text-xs font-bold">{`x ${QuantityFormatter(
                                // @ts-ignore
                                securityStats?.bestOfferQty ?? 0)
                              }`}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="rounded-md bg-gray-50 py-2">
                          <div className="flex flex-col place-items-center space-y-1">
                            <span className="sub-header">
                              <h2>Volume Traded</h2>
                            </span>
                            <span className="text-sm font-extrabold">
                              {QuantityFormatter(
                                // @ts-ignore
                                securityStats?.volTraded ?? 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-8 grid flex-auto grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <MSelect
                        label="Order Type"
                        placeholder="SelectOption order type"
                        onChange={(value) =>
                          setFieldValue("orderType", value!, true)
                        }
                        value={values.orderType}
                        name="orderType"
                        onBlur={handleBlur}
                        error={!!touched.orderType && !!errors.orderType}
                      >
                        {(
                          Object.keys(OrderRequest.side) as Array<
                            keyof typeof OrderRequest.side
                          >
                        ).map((option, index) => (
                          <Option key={index} value={option}>
                            {capitalize(option)}
                          </Option>
                        ))}
                      </MSelect>
                      <span className="text-xs text-red-400">
                        {touched.orderType && errors.orderType}
                      </span>
                    </div>
                    <div>
                      <MSelect
                        name="priceType"
                        placeholder="SelectOption price type"
                        value={values.priceType}
                        label="Price Type"
                        onBlur={handleBlur}
                        onChange={(value) => {
                          setFieldValue("priceType", value!, true);
                        }}
                        error={!!touched.priceType && !!errors.priceType}
                      >
                        <Option value="MARKET">Market</Option>
                        <Option value="LIMIT">Limit</Option>
                      </MSelect>
                      <span className="text-xs text-red-400">
                        {touched.priceType && errors.priceType}
                      </span>
                    </div>

                    {values.priceType == "LIMIT" && (
                      <div>
                        <Input
                          label="Limit Price"
                          crossOrigin={true}
                          name="limitPrice"
                          className="outline-none focus:ring-0 focus:ring-offset-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.limitPrice && !!errors.limitPrice}
                          value={values.limitPrice}
                        />
                        <span className="text-xs text-red-400">
                          {touched.limitPrice && errors.limitPrice}
                        </span>
                      </div>
                    )}
                    <div>
                      <Input
                        label="Quantity"
                        crossOrigin={true}
                        type="number"
                        className="outline-none focus:ring-0 focus:ring-offset-0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="quantity"
                        error={!!touched.quantity && !!errors.quantity}
                        value={values.quantity}
                      />
                      <span className="text-xs text-red-400">
                        {touched.quantity && errors.quantity}
                      </span>
                    </div>
                    {/* <div>
                      <Input
                        label="No of Legs"
                        crossOrigin={true}
                        type="number"
                        className="outline-none focus:ring-0 focus:ring-offset-0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="noOfLegs"
                        error={!!touched.noOfLegs && !!errors.noOfLegs}
                        value={values.noOfLegs}
                      />
                      <span className="text-xs text-red-400">
                        {touched.noOfLegs && errors.noOfLegs}
                      </span>
                    </div> */}

                    <div>
                      <MSelect
                        label="Order Strategy"
                        placeholder="SelectOption order strategy"
                        name="orderStrategy"
                        onChange={(choice) => {
                          setFieldValue("orderStrategy", choice!, true);
                        }}
                        onBlur={handleBlur}
                        value={values.orderStrategy}
                        error={
                          !!touched.orderStrategy && !!errors.orderStrategy
                        }
                      >
                        {(
                          Object.keys(OrderRequest.orderStrategy) as Array<
                            keyof typeof OrderRequest.orderStrategy
                          >
                        ).map((option, index) => (
                          <Option key={index} value={option}>
                            {capitalize(option.replaceAll("_", " "))}
                          </Option>
                        ))}
                      </MSelect>
                      <span className="text-xs text-red-400">
                        {touched.orderStrategy && errors.orderStrategy}
                      </span>
                    </div>
                    <div>
                      <MSelect
                        label="Duration"
                        placeholder="SelectOption duration"
                        name="duration"
                        onChange={(choice) => {
                          setFieldValue("duration", choice!, true);
                        }}
                        onBlur={handleBlur}
                        value={values.duration}
                        error={!!touched.duration && !!errors.duration}
                      >
                        {(
                          Object.keys(OrderRequest.tif) as Array<
                            keyof typeof OrderRequest.tif
                          >
                        ).map((option, index) => (
                          <Option key={index} value={option}>
                            {capitalize(option.replaceAll("_", " "))}
                          </Option>
                        ))}
                      </MSelect>
                      <span className="text-xs text-red-400">
                        {touched.duration && errors.duration}
                      </span>
                    </div>
                    {values.duration == OrderRequest.tif.GOOD_TILL_DATE && (
                      <div>
                        <Datepicker
                          asSingle
                          useRange={false}
                          value={values.expirationDate}
                          placeholder="Expiration Date"
                          onChange={(e) => {
                            setFieldValue("expirationDate", e, true);
                          }}
                          inputClassName={
                            !!touched.expirationDate && !!errors.expirationDate
                              ? "w-full rounded-md border-red-400"
                              : "w-full rounded-md border-grey-200"
                          }
                        />
                        <span className="text-xs text-red-400">
                          {touched.expirationDate && errors.expirationDate}
                        </span>
                      </div>
                    )}
                    <div>
                      <Input
                        label="Notes"
                        crossOrigin={true}
                        type="text"
                        className="outline-none focus:ring-0 focus:ring-offset-0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="notes"
                        error={!!touched.notes && !!errors.notes}
                        value={values.notes}
                      />
                      <span className="text-xs text-red-400">
                        {touched.notes && errors.notes}
                      </span>
                    </div>
                  </div>
                  <hr className="my-8" />
                  <div className="flex flex-col place-items-center rounded-md bg-gray-50 py-2">
                    {addingOrder ? <LoadingSpinner size="md" label="Placing bond order" lookup /> : <span
                      className={responseMessage.error ? "mb-2 text-center text-sm text-error bg-red-50 border-1 border-error p-2 rounded-md" : responseMessage.success ? "mb-2 text-center text-sm text-success bg-green-50 border-1 border-success p-2 rounded-md" : ""}>
                      {responseMessage.success ? responseMessage.success : responseMessage.error.replaceAll(/[\{\}]/g, "")}
                    </span>}

                    <div className="flex flex-col place-items-center space-y-1">
                      <span className="sub-header">
                        <h2>Estimated Total Cost</h2>
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-extrabold">
                          {NumberFormatter(
                            ((values.limitPrice
                              ? Number(values.limitPrice)
                              // @ts-ignore
                              : securityStats?.lastPx ?? selectedEquity?.price!) ?? 0) *
                            (Number(values.quantity) ?? 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="float-right mt-8">
                    <button
                      type="submit"
                      disabled={addingOrder}
                      onClick={() => {
                        setFieldTouched("expirationDate");
                        setResponseMessage({ error: "", success: "" });
                        if (selectedEquity == null) {
                          setSelectedEquityError({
                            message: "Pls select a symbol"
                          });
                        }
                      }}
                      className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* BIDS & OFFERS & TRADES SECTION */}

              <div className="col-span-3 rounded-md bg-white p-5 shadow-md">
                <HTab.Group defaultIndex={0}>
                  <HTab.List className="mb-5 flex space-x-1 border-b-1 border-gray-100">
                    <HTab
                      key="sec-overview-0"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Bids & Offers
                    </HTab>
                    <HTab
                      key="sec-overview-1"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Trades
                    </HTab>
                  </HTab.List>
                  <HTab.Panels>
                    <HTab.Panel key="sec-overview-0">
                      <div className="h-96 max-h-screen overflow-y-auto flex space-x-2">
                        <div className="w-1/2">
                          <div className="text-center font-bold">Bids</div>
                          <table className="table-auto w-full">
                            <thead>
                            <tr
                              className=" bg-gray-200 text-xs font-semibold capitalize leading-normal tracking-wide text-gray-500">
                              <th className="px-6 py-3 text-left">Price</th>
                              <th className="px-6 py-3 text-center">
                                Quantity
                              </th>
                              <th className="px-6 py-3 text-center">
                                Orders
                              </th>
                            </tr>
                            </thead>
                            <tbody className="text-xs font-light text-gray-600">
                            {
                              // @ts-ignore
                              (securityStats?.bids || []).map((bid, index) => (
                              <tr
                                className="border-b border-gray-200 hover:bg-gray-100"
                                key={index}
                              >
                                <td className="px-6 py-3 text-left text-green-500 cursor-pointer" onClick={() => {
                                  setFieldValue("quantity", bid.qty);
                                  setFieldValue("limitPrice", bid.price);
                                  setFieldValue("priceType", "LIMIT");
                                  setFieldValue("orderType", "SELL");
                                }}>
                                  <a href="#">{NumberFormatter(bid.price)}</a>
                                </td>
                                <td className="px-6 py-3 text-center">
                                  {QuantityFormatter(bid.qty)}
                                </td>
                                <td className="px-6 py-3 text-center">
                                  <span className="">{QuantityFormatter(bid.orderCount)}</span>
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="w-1/2">
                          <div className="text-center font-bold">Offers</div>
                          <table className="table-auto w-full">
                            <thead>
                            <tr
                              className=" bg-gray-200 text-xs font-semibold capitalize leading-normal tracking-wide text-gray-500">
                              <th className="px-6 py-3 text-left">Price</th>
                              <th className="px-6 py-3 text-center">
                                Quantity
                              </th>
                              <th className="px-6 py-3 text-center">
                                Orders
                              </th>
                            </tr>
                            </thead>
                            <tbody className="text-xs font-light text-gray-600">
                            {
                              // @ts-ignore
                              (securityStats?.offers || []).map((offer, index) => (
                              <tr
                                className="border-b border-gray-200 hover:bg-gray-100"
                                key={index}
                              >
                                <td className="px-6 py-3 text-left text-red-500 cursor-pointer" onClick={() => {
                                  setFieldValue("quantity", offer.qty);
                                  setFieldValue("limitPrice", offer.price);
                                  setFieldValue("priceType", "LIMIT");
                                  setFieldValue("orderType", "BUY");
                                }}>
                                  <a href="#">{NumberFormatter(offer.price)}</a>
                                </td>
                                <td className="px-6 py-3 text-center">
                                  {QuantityFormatter(offer.qty)}
                                </td>
                                <td className="px-6 py-3 text-center">
                                  {QuantityFormatter(offer.orderCount)}
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div>
                        <div id="histogram" className="h-96"
                             dangerouslySetInnerHTML={{ __html: bidOfferHistogram || "" }}>
                        </div>
                      </div>
                    </HTab.Panel>
                    <HTab.Panel key="sec-overview-1">
                      <div className="h-96 max-h-screen overflow-y-auto">
                        <table className="w-full min-w-max table-auto">
                          <thead>
                          <tr
                            className=" bg-gray-200 text-xs font-semibold capitalize leading-normal tracking-wide text-gray-500">
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-center">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-center">Time</th>
                          </tr>
                          </thead>
                          <tbody className="text-xs font-light text-gray-600">
                          {
                            // @ts-ignore
                            securityStats?.trades.map((trade, index) => (
                            <tr
                              className="border-b border-gray-200 hover:bg-gray-100"
                              key={index}
                            >
                              <td className="px-6 py-3 text-left">
                                {NumberFormatter(trade.tradePrice)}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {QuantityFormatter(trade.size)}
                              </td>
                              <td className="px-6 py-3 text-center">
                                {trade.time.split("T")[1]?.split(".")[0]}
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <TradeDistribution
                          // @ts-ignore
                          trades={securityStats?.trades} secId={selectedEquity?.secId ?? "NA"}/>
                      </div>
                    </HTab.Panel>
                  </HTab.Panels>
                </HTab.Group>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[70vh] items-center justify-center">
            Loading...
          </div>
        )}
      </TabPanel>
    </>
  );
};
export default EquityOrderTab;
