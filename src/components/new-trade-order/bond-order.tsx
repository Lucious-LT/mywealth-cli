import { Combobox, Tab as HTab, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import {
  Input,
  Select as MSelect,
  Option,
  TabPanel,
} from "@material-tailwind/react";
import { useState, Fragment, useEffect } from "react";
import { NumberFormatter } from "~/components/util/number-formatter";
import { Bond, Market } from "~/server/api/models/position";
import * as yup from "yup";
import { InvestmentAccount, OrderRequest } from "~/server/api/models/investing";
import { api } from "~/utils/api";
import { FormikValues, useFormik } from "formik";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { capitalize, formatMoney } from "~/utils/format";
import { LoadingSpinner } from "~/components/ui/spinner";

type Props = {
  selectedMarket: Market | null;
  account: InvestmentAccount;
};

const BondOrder = ({ selectedMarket, account }: Props) => {
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [bondQuery, setBondQuery] = useState("");

  const [selectedBondError, setSelectedBondError] = useState({
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: ""
  });

  let responseMessageTimeout: NodeJS.Timeout;

  // Set timeout for error or success messages
  useEffect(() => {
    if (responseMessage.error || responseMessage.success) {
      responseMessageTimeout = setTimeout(() => setResponseMessage({ error: "", success: "" }), 8000);
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout)
    }
  }, [responseMessage]);

  const utils = api.useUtils();

  const { data: bonds, isLoading: isLoadingBonds } =
    api.position.listBondByMarketCode.useQuery(selectedMarket?.marketCode!, {
      enabled: selectedMarket != null,
    });

  let bondList: Bond[] | null = null;

  if (bonds) {
    const content = bonds.content!;
    bondList = content;
  }

  const handleBondSubmit = ({
    orderType,
    limitPrice,
    quantity,
    duration,
    orderStrategy,
    expirationDate,
    notes,
    noOfLegs,
  }: FormikValues) => {
    if (selectedBond == null) return;
    const orderContent: OrderRequest = {
      accountId: account.id,
      side: orderType as OrderRequest.side,
      tif: duration as OrderRequest.tif,
      marketCode: selectedMarket?.marketCode ?? "",
      secId: selectedBond?.secId ?? "",
      requestedQty: Number(quantity),
      limitPrice: limitPrice != "" ? Number(limitPrice) : undefined,
      currency: account.currency,
      numberOfLegs: noOfLegs ? Number(noOfLegs) : 1,
      assetType: OrderRequest.assetType.BOND,
      orderStrategy:  orderStrategy ? orderStrategy as OrderRequest.orderStrategy : undefined,
      expires:  expirationDate?.startDate ? expirationDate?.startDate as string : undefined,
      notes:  notes ? notes as string : "",
      autoApprove: false,
      allOrNone: false,
    };
    addOrder(orderContent);
  };

  const initialBondValues = {
    orderType: "",
    priceType: "",
    limitPrice: "",
    noOfLegs: "",
    orderStrategy: "",
    expirationDate: null as unknown as DateValueType,
    quantity: "",
    duration: "",
    // autoApprove: true,
    notes: "",
  };

  const validateBondSchema = yup.object().shape({
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
      ),
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
    setFieldValue,
  } = useFormik({
    initialValues: initialBondValues,
    onSubmit: handleBondSubmit,
    validationSchema: validateBondSchema,
  });

  const { mutate: addOrder, isLoading: addingBondOrder } = api.order.addOrder.useMutation({
    onSuccess: () => {
      resetForm();
      setResponseMessage({ error: "", success: "Bond order sent successfully" })
      utils.invest.listAccountOrdersAndFundTransactions.invalidate();
    },
    onError: (error) => setResponseMessage({ error: error.message.replaceAll(/[\{\}]/g, ""), success: "" }),
  });

  // Update selected bond when its loaded
  useEffect(() => {
    if (bondList && bondList[0]) {
      setSelectedBond(bondList[0]);
      setSelectedBondError({ message: "" });
    } else {
      setSelectedBond(null);
    }
  }, [bondList]);

  return (
    <>
      <TabPanel value="bonds" className="h-full p-0">
        {!isLoadingBonds ? (
          <div className="space-y-4 overflow-hidden">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-4 rounded-md bg-white p-5 shadow-md">
                <span className="text-xl font-bold uppercase">
                  {selectedBond
                    ? `${selectedBond?.secId ?? ""} - ${
                        selectedBond?.secDesc ?? ""
                      }`
                    : "No symbol under market"}
                </span>
                <span className="float-right text-xl font-bold">
                  {`${account.currency} ${formatMoney(account.cashBalance)}`}
                </span>
                <hr className="my-4" />
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <div>
                      <label className="text-xs text-gray-700">Symbol</label>
                      <div className="w-full">
                        <Combobox
                          value={selectedBond}
                          onChange={setSelectedBond}
                        >
                          <div className="relative">
                            <div
                              className={
                                selectedBondError.message == ""
                                  ? "relative w-full cursor-default overflow-hidden rounded-md border-1 border-blue-gray-300 bg-white text-left sm:text-xs"
                                  : "relative w-full cursor-default overflow-hidden rounded-md border-1 border-red-400 bg-white text-left sm:text-xs"
                              }
                            >
                              <Combobox.Input
                                className="w-full border-0 py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 focus:border-l-4 focus:border-primary"
                                displayValue={(bond: Bond) =>
                                  selectedBond ? bond?.secId! : ""
                                }
                                onChange={(e) => setBondQuery(e.target.value)}
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
                              afterLeave={() => setBondQuery("")}
                            >
                              <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                                {bondList != null &&
                                bondList.length === 0 &&
                                bondQuery !== "" ? (
                                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                  </div>
                                ) : (
                                  bondList != null &&
                                  bondList.map((bond) => (
                                    <Combobox.Option
                                      key={bond.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={bond}
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
                                              {bond.secId}
                                            </span>
                                            <span className=" text-gray-500">
                                              {bond.secDesc}
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
                          {selectedBondError.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="rounded-md bg-gray-50 py-2">
                        <div className="flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>Price</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {selectedBond
                                ? NumberFormatter(selectedBond?.price as number)
                                : "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md bg-gray-50 py-2">
                        <div className="flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>coupon rate</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {selectedBond
                                ? NumberFormatter(
                                    selectedBond?.couponRate as number
                                  )
                                : "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-gray-50 py-2">
                        <div className="flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>Frequency</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {selectedBond
                                ? selectedBond.couponFrequency
                                : "-"}
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
                        onChange={(value) => {
                          setFieldValue("orderType", value!, true);
                        }}
                        value={values.orderType}
                        name="orderType"
                        onBlur={handleBlur}
                        error={!!touched.orderType && !!errors.orderType}
                        placeholder="SelectOption Order Type"
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
                        placeholder="SelectOption Price Type"
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
                      <span className="text-sm text-red-400">
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
                        crossOrigin={"true"}
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
                        placeholder="SelectOption Order Strategy"
                        label="Order Strategy"
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
                    {/* <div>
                      <Switch
                        label="Auto approve"
                        checked={values.autoApprove}
                        onChange={handleChange}
                        name="autoApprove"
                      />
                    </div> */}
                  </div>
                  <hr className="my-8" />
                  <div className="flex flex-col place-items-center rounded-md bg-gray-50 py-2">
                    {addingBondOrder ? (
                      <LoadingSpinner
                        size="md"
                        label="Placing bond order"
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
                            (selectedBond?.price ?? 0) * Number(values.quantity)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="float-right mt-8">
                    <button
                      type="submit"
                      disabled={addingBondOrder}
                      onClick={() => {
                        setResponseMessage({ error: "", success: "" });
                        if (selectedBond == null) {
                          setSelectedBondError({
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
                  <HTab.List className="mb-5 flex space-x-1 border-b-1 border-gray-100">
                    <HTab
                      key="sec-overview"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Bids
                    </HTab>
                    <HTab
                      key="sec-overview"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Offers
                    </HTab>
                    <HTab
                      key="sec-overview"
                      className={({ selected }) =>
                        classNames(
                          "w-full pb-2 text-xs",
                          "focus:border-b-2 focus:border-primary",
                          selected ? "bg-white" : "text-gray-900"
                        )
                      }
                    >
                      Volume
                    </HTab>
                  </HTab.List>
                  <HTab.Panels>
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
export default BondOrder;
