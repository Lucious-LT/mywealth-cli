import { Dialog, Transition } from "@headlessui/react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { Input, Select as MSelect, Option } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import {
  FundTransaction,
  FundTransactionRequest,
} from "~/server/api/models/investing";
import { api } from "~/utils/api";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { NumberFormatter } from "../util/number-formatter";
import { capitalize } from "~/utils/format";
import { LoadingSpinner } from "./spinner";
import { FundTransactionView } from "~/server/api/routers/invest";

type Props = {
  fundModal: { isOpen: boolean; fund: FundTransactionView | null };
  closeModal: () => void;
};

const EditFundModal = ({ fundModal, closeModal }: Props) => {
  const utils = api.useContext();
  let responseMessageTimeout: NodeJS.Timeout;

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
  });

  let {
    orderType,
    accountId,
    marketCode,
    secId,
    currency,
    requestedQty,
    requestedVal,
    orderStatus,
    price,
    requestDate,
    id,
    notes,
  } = fundModal.fund! || {};

  const [status, setStatus] = useState(orderStatus);

  const handleFundSubmit = ({
    orderType,
    requestedQty,
    requestedVal,
    price,
    requestDate: { startDate },
    notes,
  }: FormikValues) => {
    const orderContent: FundTransactionRequest = {
      accountId,
      orderType,
      marketCode,
      secId,
      requestedQty,
      requestedVal,
      price,
      requestDate: startDate,
      currency,
      notes: notes ? notes : "",
      autoApprove: false,
    };
    updateFundTransaction({
      orderId: fundModal.fund?.id!,
      requestBody: orderContent,
    });
  };

  // const today = new Date().toISOString().split("T")[0];

  const initialFundValues = {
    orderType,
    requestedQty,
    requestedVal,
    price,
    requestDate: requestDate
      ? { startDate: requestDate, endDate: requestDate }
      : (null as unknown as DateValueType),
    autoApprove: false,
    notes,
  };

  const validateFundSchema = yup.object().shape({
    orderType: yup.string().required("Required"),
    requestedQty: yup.number().required("Required"),
    requestedVal: yup.number().required("Required"),
    price: yup
      .number()
      .moreThan(0, "must be greater than 0")
      .required("Required"),
    notes: yup.string(),
    requestDate: yup.object().required(""),
    // autoApprove: yup.boolean(),
  });

  const { mutate: updateFundTransaction, isLoading: updatingFundTransaction } =
    api.invest.updateFundTransactionById.useMutation({
      onSuccess: () => {
        setResponseMessage({
          success: "Order update sent successful",
          error: "",
        });
        utils.invest.listAccountFundTransaction.invalidate();
        refetchFundTransaction();
      },
      onError: (error) =>
        setResponseMessage({
          error: error.message.replaceAll(/[\{\}]/g, ""),
          success: "",
        }),
    });

  const {
    mutate: reverseFundTransaction,
    isLoading: reversingFundTransaction,
  } = api.invest.reverseFundTransactionById.useMutation({
    onSuccess: () => {
      setResponseMessage({
        success: "Order reversal successful",
        error: "",
      });
      utils.invest.listAccountFundTransaction.invalidate();
      refetchFundTransaction();
    },
    onError: (error) =>
      setResponseMessage({
        error: error.message.replaceAll(/[\{\}]/g, ""),
        success: "",
      }),
  });

  const {
    mutate: approveFundTransaction,
    isLoading: approvingFundTransaction,
  } = api.invest.approveFundTransactionById.useMutation({
    onSuccess: () => {
      setResponseMessage({
        success: "Order approval successful",
        error: "",
      });
      utils.invest.listAccountFundTransaction.invalidate();
      refetchFundTransaction();
    },
    onError: (error) =>
      setResponseMessage({
        error: error.message.replaceAll(/[\{\}]/g, ""),
        success: "",
      }),
  });

  const {
    data: updatedFundTransaction,
    refetch: refetchFundTransaction,
    isLoading: findingFundTransaction,
  } = api.invest.findFundTransactionById.useQuery(id, {
    enabled: id != undefined,
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

  useEffect(() => {
    setStatus(updatedFundTransaction?.orderStatus);
  }, [updatedFundTransaction]);

  useEffect(() => {
    setStatus(orderStatus);
  }, []);

  return (
    <Transition appear show={fundModal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setResponseMessage({ success: "", error: "" });
          closeModal();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {status == FundTransaction.orderStatus.PENDING ? "Update Fund Transaction" : "View Fund Transaction"}
                </Dialog.Title>
                <button
                  className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
                  onClick={() => {
                    setResponseMessage({ success: "", error: "" });
                    closeModal();
                  }}
                  disabled={updatingFundTransaction}
                >
                  x
                </button>
                <Formik
                  onSubmit={handleFundSubmit}
                  initialValues={initialFundValues}
                  validationSchema={validateFundSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    resetForm,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mt-8 grid flex-auto grid-cols-2 gap-x-8 gap-y-8">
                        <div>
                          <MSelect
                            label="Order Type"
                            placeholder="SelectOption Order Type"
                            onChange={(choice) =>
                              setFieldValue("orderType", choice, true)
                            }
                            value={values.orderType}
                            disabled
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
                            className="outline-none focus:ring-0 focus:ring-offset-0"
                            onChange={handleChange}
                            disabled={
                              status != FundTransaction.orderStatus.PENDING
                            }
                            onBlur={handleBlur}
                            name="requestedQty"
                            error={
                              !!touched.requestedQty && !!errors.requestedQty
                            }
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
                            className="outline-none focus:ring-0 focus:ring-offset-0"
                            onChange={handleChange}
                            disabled={
                              status != FundTransaction.orderStatus.PENDING
                            }
                            onBlur={handleBlur}
                            name="requestedVal"
                            error={
                              !!touched.requestedVal && !!errors.requestedVal
                            }
                            value={values.requestedVal}
                          />
                          <span className="text-xs text-red-400">
                            {touched.requestedVal && errors.requestedVal}
                          </span>
                        </div>

                        <div>
                          <Input
                            label="Price"
                            crossOrigin={true}
                            type="number"
                            className="outline-none focus:ring-0 focus:ring-offset-0"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={
                              status != FundTransaction.orderStatus.PENDING
                            }
                            name="price"
                            error={!!touched.price && !!errors.price}
                            value={values.price}
                          />
                          <span className="text-xs text-red-400">
                            {touched.price && errors.price}
                          </span>
                        </div>

                        <div>
                          <Datepicker
                            asSingle
                            useRange={false}
                            value={values.requestDate}
                            disabled={
                              status != FundTransaction.orderStatus.PENDING
                            }
                            placeholder="Request Date"
                            onChange={(e) => {
                              setFieldValue("requestDate", e, true);
                            }}
                            inputClassName={
                              !!touched.requestDate && !!errors.requestDate
                                ? "w-full rounded-md border-red-400"
                                : "w-full rounded-md border-grey-200"
                            }
                          />
                          <span className="text-xs text-red-400">
                            {touched.requestDate && errors.requestDate}
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
                            disabled={
                              status != FundTransaction.orderStatus.PENDING
                            }
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
                        {updatingFundTransaction ? (
                          <LoadingSpinner
                            size="sm"
                            label="updating fund transaction"
                            lookup
                          />
                        ) : reversingFundTransaction ? (
                          <LoadingSpinner
                            size="sm"
                            label="reversing fund transaction"
                            lookup
                          />
                        ) : approvingFundTransaction ? (
                          <LoadingSpinner
                            size="sm"
                            label="approving fund transaction"
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
                        <div className="mt-1 flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>Estimated Total Cost</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {NumberFormatter(price * requestedQty)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="float-right mt-8"
                      >
                        {status == FundTransaction.orderStatus.PENDING && (
                          <>
                            {/* <button
                              type="button"
                              onClick={() => {
                                setResponseMessage({ success: "", error: "" });
                                approveFundTransaction(id);
                              }}
                              disabled={approvingFundTransaction}
                              className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                            >
                              Approve
                            </button> */}
                            <button
                              type="submit"
                              onClick={() =>
                                setResponseMessage({ success: "", error: "" })
                              }
                              disabled={updatingFundTransaction}
                              className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                            >
                              Submit
                            </button>
                          </>
                        )}

                        {/* {status != FundTransaction.orderStatus.PENDING && (
                          <button
                            type="button"
                            onClick={() => {
                              setResponseMessage({ success: "", error: "" });
                              reverseFundTransaction(id);
                            }}
                            disabled={reversingFundTransaction}
                            className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                          >
                            Reverse
                          </button>
                        )} */}
                      </div>
                    </form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditFundModal;
