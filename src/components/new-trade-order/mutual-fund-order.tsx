import { Combobox, Tab as HTab, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  Input,
  Select as MSelect,
  Option,
  TabPanel,
} from "@material-tailwind/react";
import classNames from "classnames";
import * as yup from "yup";
import { useState, Fragment, useEffect } from "react";
import { NumberFormatter } from "~/components/util/number-formatter";
import { Fund, Market } from "~/server/api/models/position";
import {
  FundTransactionRequest,
  InvestmentAccount,
} from "~/server/api/models/investing";
import { api } from "~/utils/api";
import { FormikValues, useFormik } from "formik";
import FundAccountModal from "~/components/ui/fund-account-modal";
import { capitalize, formatMoney } from "~/utils/format";
import { LoadingSpinner } from "~/components/ui/spinner";

type Props = {
  selectedMarket: Market | null;
  account: InvestmentAccount;
};

const MutualFundOrder = ({ selectedMarket, account }: Props) => {
  const [fundQuery, setFundQuery] = useState("");
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [selectedFundError, setSelectedFundError] = useState({
    message: "",
  });
  const [FundModal, setFundModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: ""
  });

  const { data: fund, isLoading: isLoadingFund } =
    api.position.listFundByMarketCode.useQuery(selectedMarket?.marketCode!, {
      enabled: selectedMarket != null,
    });

  const { data: securityPosition, isLoading: isLoadingSecPosition } =
    api.position.getPortfolioPositionForSecurity.useQuery({ marketCode: selectedMarket?.marketCode!, accountId: account.id, currency: account.currency, securityId: selectedFund?.secId! }, {
      enabled: selectedFund != null,
    });
  const utils = api.useUtils();

  let responseMessageTimeout: NodeJS.Timeout;

  let fundList: Fund[] | null = null;

  if (fund) {
    fundList = fund.content!;
  }

  // Set timeout for error or success messages
  useEffect(() => {
    if (responseMessage.error || responseMessage.success) {
      responseMessageTimeout = setTimeout(() => setResponseMessage({ error: "", success: "" }), 8000);
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout)
    }
  }, [responseMessage]);

  // Update selected fund when its loaded
  useEffect(() => {
    if (fundList && fundList[0]) {
      setSelectedFund(fundList[0]);
      setSelectedFundError({ message: "" });
    } else {
      setSelectedFund(null);
    }
  }, [fundList]);

  const filteredFund =
    fundQuery === ""
      ? fundList
      : fundList?.filter((fund) =>
        fund
          ?.secId!.toLowerCase()
          .replace(/\s+/g, "")
          .includes(fundQuery.toLowerCase().replace(/\s+/g, ""))
      );


  const handleFundSubmit = ({
    orderType,
    requestedQty,
    requestedVal,
    price,
    // requestDate: { startDate },
    notes,
  }: FormikValues) => {
    if (selectedFund == null) return;
    const orderContent: FundTransactionRequest = {
      accountId: account.id,
      orderType,
      marketCode: selectedMarket?.marketCode!,
      secId: selectedFund?.secId!,
      requestedQty: orderType == FundTransactionRequest.orderType.REDEMPTION ? requestedQty : 0,
      requestedVal: orderType == FundTransactionRequest.orderType.SUBSCRIPTION ? requestedVal : 0,
      price,
      requestDate: new Date().toISOString().split("T")[0]!,
      currency: account.currency,
      notes: notes ? notes : `${orderType} of ${orderType == FundTransactionRequest.orderType.REDEMPTION ? requestedQty : requestedVal} ${requestedVal ? account.currency : "UNIT(S)"} of ${selectedFund?.secId}`,
      autoApprove: false,
    };
    addFundTransaction({ requestBody: orderContent });
  };

  const initialFundValues = {
    orderType: "",
    requestedQty: "",
    requestedVal: "",
    notes: "",
  };

  const validateFundSchema = yup.object().shape({
    orderType: yup.string().required("Required"),
    requestedQty: yup
      .number()
      .when("orderType", ([orderType], schema) =>
        orderType == FundTransactionRequest.orderType.REDEMPTION
          ? schema.required("Required")
          : schema.notRequired()
      ),
    requestedVal: yup
      .number()
      .when("orderType", ([orderType], schema) =>
        orderType == FundTransactionRequest.orderType.SUBSCRIPTION
          ? schema.required("Required")
          : schema.notRequired()
      ),
    notes: yup.string(),
  });

  const {
    resetForm,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialFundValues,
    onSubmit: handleFundSubmit,
    validationSchema: validateFundSchema,
  });

  const { mutate: addFundTransaction, isLoading: addingFundTransaction } =
    api.invest.addFundTransaction.useMutation({
      onSuccess: () => {
        resetForm();
        utils.invest.listAccountOrdersAndFundTransactions.invalidate();
        setResponseMessage({ error: "", success: "Fund transaction successful" })
      },
      onError: (error) =>
        setResponseMessage({ success: "", error: error.message.replaceAll(/[\{\}]/g, "") }),
    });

  return (
    <>
      <FundAccountModal
        account={account}
        openModal={FundModal}
        closeModal={() => setFundModal(false)}
        setFundResponseMessage={setResponseMessage}
      />
      <TabPanel value="mutual-funds" className="h-full  p-0">
        {!isLoadingFund && fundList != null ? (
          <div className="space-y-4 overflow-hidden">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-4 rounded-md bg-white p-5 shadow-md">
                <span className="text-xl font-bold uppercase">
                  {selectedFund
                    ? `${selectedFund?.secId ?? ""} - ${
                        selectedFund?.secDesc ?? ""
                      }`
                    : "No symbol under market"}
                </span>
                <span className="float-right text-xl font-bold">
                  {`${account.currency} ${formatMoney(account.cashBalance)}`}
                </span>
                <hr className="my-4" />
                <div className="mb-4 flex w-full items-center justify-between px-1 text-xs">
                  <div>
                    <span>Security: </span>
                    <span>
                      {securityPosition ? securityPosition?.secId : "-"}
                    </span>
                  </div>
                  <div>
                    <span>Quantity: </span>
                    <span>
                      {securityPosition ? securityPosition?.quantity : "-"}
                    </span>
                  </div>
                  <div>
                    <span>Amount: </span>
                    <span>
                      {securityPosition
                        ? formatMoney(securityPosition?.totalCost!)
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span>Avg Cost: </span>
                    <span>
                      {securityPosition ? securityPosition?.avgCost : "-"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <div>
                      <label className="text-xs text-gray-700">Symbol</label>
                      <div className="w-full">
                        <Combobox
                          value={selectedFund}
                          onChange={setSelectedFund}
                        >
                          <div className="relative">
                            <div
                              className={
                                selectedFundError.message == ""
                                  ? "relative w-full cursor-default overflow-hidden rounded-md border-1 border-blue-gray-300 bg-white text-left sm:text-xs"
                                  : "relative w-full cursor-default overflow-hidden rounded-md border-1 border-red-400 bg-white text-left sm:text-xs"
                              }
                            >
                              <Combobox.Input
                                className="w-full border-0 py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 focus:border-l-4 focus:border-primary"
                                displayValue={(fund: Fund) => fund?.secId ?? ""}
                                onChange={(e) => setFundQuery(e.target.value)}
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
                              afterLeave={() => setFundQuery("")}
                            >
                              <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                                {filteredFund?.length === 0 &&
                                fundQuery !== "" ? (
                                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                  </div>
                                ) : (
                                  filteredFund?.map((fund) => (
                                    <Combobox.Option
                                      key={fund.id}
                                      className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-2 pr-4 ${
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={fund}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`flex justify-between truncate uppercase ${
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
                                            }`}
                                          >
                                            <span className="font-extrabold text-gray-900">
                                              {fund.secId}
                                            </span>
                                            <span className=" text-gray-500">
                                              {fund.secDesc}
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
                          {selectedFundError.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="rounded-md bg-gray-50 py-2">
                        <div className="flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>bid price</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {selectedFund
                                ? NumberFormatter(
                                    selectedFund?.bidPrice as number
                                  )
                                : "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md bg-gray-50 py-2">
                        <div className="flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>offer price</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {selectedFund
                                ? NumberFormatter(
                                    selectedFund?.offerPrice as number
                                  )
                                : "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-gray-50 py-2">
                        <div className="flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>yield</h2>
                          </span>
                          <span className="text-sm font-extrabold">
                            {selectedFund
                              ? `${selectedFund?.yield ?? 0.0} %`
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-8 grid flex-auto grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <MSelect
                        placeholder="Order Type"
                        label="Order Type"
                        onChange={(choice) =>
                          setFieldValue("orderType", choice, true)
                        }
                        value={values.orderType}
                        name="orderType"
                        onBlur={handleBlur}
                        error={!!touched.orderType && !!errors.orderType}
                      >
                        {(
                          Object.keys(
                            FundTransactionRequest.orderType
                          ) as Array<
                            keyof typeof FundTransactionRequest.orderType
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
                      <Input
                        label="Request Quantity"
                        crossOrigin={true}
                        type="number"
                        disabled={
                          values.orderType ==
                          FundTransactionRequest.orderType.SUBSCRIPTION
                        }
                        className="outline-none focus:ring-0 focus:ring-offset-0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="requestedQty"
                        error={!!touched.requestedQty && !!errors.requestedQty}
                        value={values.requestedQty}
                      />
                      <span className="text-xs text-red-400">
                        {touched.requestedQty && errors.requestedQty}
                      </span>
                    </div>

                    <div>
                      <Input
                        label="Request Value"
                        crossOrigin={true}
                        type="number"
                        disabled={
                          values.orderType ==
                          FundTransactionRequest.orderType.REDEMPTION
                        }
                        className="outline-none focus:ring-0 focus:ring-offset-0"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="requestedVal"
                        error={!!touched.requestedVal && !!errors.requestedVal}
                        value={values.requestedVal}
                      />
                      <span className="text-xs text-red-400">
                        {touched.requestedVal && errors.requestedVal}
                      </span>
                    </div>
                    <div>
                      <Input
                        label="Note"
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
                    {addingFundTransaction ? (
                      <LoadingSpinner
                        size="md"
                        label="Placing fund order"
                        lookup
                      />
                    ) : (
                      <span
                        className={
                          responseMessage.error
                            ? "mb-2 rounded-md border-1 border-error bg-red-50 p-2 text-center text-sm text-error"
                            : responseMessage.success
                            ? "mb-2 rounded-md border-1 border-success bg-green-50 p-2 text-center text-sm text-success"
                            : ""
                        }
                      >
                        {responseMessage.success
                          ? responseMessage.success
                          : responseMessage.error.replaceAll(/[\{\}]/g, "")}
                      </span>
                    )}
                    <div className="flex flex-col place-items-center space-y-1">
                      <span className="sub-header">
                        <h2>Estimated Total Cost</h2>
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-extrabold">
                          {NumberFormatter(
                            values.orderType ==
                              FundTransactionRequest.orderType.SUBSCRIPTION
                              ? Number(values.requestedVal) ?? 0
                              : (selectedFund?.price ?? 0) *
                                  Number(values.requestedQty)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      responseMessage.error.match(
                        /^Insufficient funds for order/
                      )
                        ? "float-right mt-8 flex w-full justify-between"
                        : "float-right mt-8"
                    }
                  >
                    {responseMessage.error.match(
                      /^Insufficient funds for order/
                    ) && (
                      <button
                        onClick={() => setFundModal(true)}
                        className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                      >
                        Fund Account
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={addingFundTransaction}
                      onClick={() => {
                        setResponseMessage({ error: "", success: "" });
                        if (selectedFund == null) {
                          setSelectedFundError({
                            message: "Pls select a symbol",
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
              <div className="col-span-3 rounded-md bg-white p-5 shadow-md">
                <HTab.Group>
                  <HTab.List className="mb-5 flex space-x-1 border-b-1 border-gray-200 ">
                    <HTab
                      key="sec-overview"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-4 pt-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Overview
                    </HTab>
                    <HTab
                      key="sec-bid"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-4 pt-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Bids
                    </HTab>
                    <HTab
                      key="sec-offer"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-4 pt-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Offers
                    </HTab>
                    <HTab
                      key="sec-volume"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-4 pt-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Volume
                    </HTab>
                  </HTab.List>
                  <HTab.Panels>
                    <HTab.Panel key="1"></HTab.Panel>
                    <HTab.Panel key="2"></HTab.Panel>
                    <HTab.Panel key="3"></HTab.Panel>
                    <HTab.Panel key="4"></HTab.Panel>
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
export default MutualFundOrder;
