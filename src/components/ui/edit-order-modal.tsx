import { Dialog, Transition } from "@headlessui/react";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import {
  Input,
  Select as MSelect,
  Option,
  Switch,
} from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { Order, OrderRequest } from "~/server/api/models/investing";
import { api } from "~/utils/api";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { capitalize } from "~/utils/format";
import { LoadingSpinner } from "./spinner";
import { NumberFormatter } from "../util/number-formatter";
import { OrdersView } from "~/server/api/routers/order";

type Props = {
  orderModal: { isOpen: boolean; order: OrdersView | null };
  closeModal: () => void;
};

const EditOrderModal = ({ orderModal, closeModal }: Props) => {
  const utils = api.useUtils();

  let responseMessageTimeout: NodeJS.Timeout;

  const [responseMessage, setResponseMessage] = useState({
    success: "",
    error: "",
  });

  const {
    side,
    limitPrice,
    requestedQty,
    tif,
    accountId,
    marketCode,
    secId,
    currency,
    assetType,
    numberOfLegs,
    notes,
    orderStrategy,
    expires, orderStatus
  } = orderModal.order! || {};

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

  const handleOrderSubmit = ({
    orderType,
    limitPrice,
    quantity,
    duration,
    orderStrategy,
    expirationDate,
    notes,
    noOfLegs,
  }: FormikValues) => {
    const orderContent: OrderRequest = {
      side: orderType as OrderRequest.side,
      tif: duration  as OrderRequest.tif,
      requestedQty:Number(quantity),
      limitPrice: limitPrice != "" ? Number(limitPrice) : undefined,
      numberOfLegs: noOfLegs ? Number(noOfLegs) : 1,
      assetType,
      orderStrategy: orderStrategy ? orderStrategy as OrderRequest.orderStrategy : undefined,
      notes :  notes ? notes as string : "",
      expires:
        duration != OrderRequest.tif.GOOD_TILL_DATE
          ? ""
          : (expirationDate.startDate as string),
      autoApprove: false,
      accountId,
      marketCode,
      secId,
      currency,
      allOrNone: false
    };

    updateOrder({
      orderId: orderModal?.order?.id!,
      requestBody: orderContent,
    });
  };

  const initialOrderValues = {
    orderType: side,
    priceType: limitPrice ? "LIMIT" : "MARKET",
    limitPrice: limitPrice ? limitPrice : "",
    quantity: requestedQty,
    duration: tif ? tif : "",
    noOfLegs: numberOfLegs,
    orderStrategy,
    expirationDate: expires
      ? { startDate: expires, endDate: expires }
      : (null as unknown as DateValueType),
    notes,
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
    orderStrategy: yup.string().notRequired(),
    notes: yup.string(),
    expirationDate: yup
      .object()
      .when("duration", ([duration], schema) =>
        duration == OrderRequest.tif.GOOD_TILL_DATE
          ? schema.required("Required")
          : schema.notRequired()
      ),
  });

  const { mutate: updateOrder, isLoading: updatingOrder } =
    api.order.editOrderById.useMutation({
      onSuccess: () => {
        setResponseMessage({
          error: "",
          success: "Order updated successfully",
        });
        utils.order.listAccountOrders.invalidate();
      },
      onError: (error) =>
        setResponseMessage({
          error: error.message.replaceAll(/[\{\}]/g, ""),
          success: "",
        }),
    });

  return (
    <Transition appear show={orderModal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setResponseMessage({ error: "", success: "" });
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
                  {orderStatus == Order.orderStatus.NEW ? "Update Order" : "View Order"}
                </Dialog.Title>
                <button
                  className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
                  onClick={() => {
                    setResponseMessage({ error: "", success: "" });
                    closeModal();
                  }}
                >
                  x
                </button>
                <Formik
                  onSubmit={handleOrderSubmit}
                  initialValues={initialOrderValues}
                  validationSchema={validateOrderSchema}
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
                            onChange={(value) => {
                              setFieldValue("orderType", value!, true);
                            }}
                            value={values.orderType}
                            name="orderType"
                            onBlur={handleBlur}
                            disabled
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
                          <span className="text-sm text-red-400">
                            {touched.orderType && errors.orderType}
                          </span>
                        </div>
                        <div>
                          <MSelect
                            name="priceType"
                            placeholder="SelectOption Price Type"
                            value={values.priceType}
                            label="Price Type"
                            disabled={orderStatus != Order.orderStatus.NEW}
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
                              disabled={orderStatus != Order.orderStatus.NEW}
                              error={
                                !!touched.limitPrice && !!errors.limitPrice
                              }
                              value={values.limitPrice}
                            />
                            <span className="text-sm text-red-400">
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
                            disabled={orderStatus != Order.orderStatus.NEW}
                            name="quantity"
                            error={!!touched.quantity && !!errors.quantity}
                            value={values.quantity}
                          />
                          <span className="text-sm text-red-400">
                            {touched.quantity && errors.quantity}
                          </span>
                        </div>
                        <div>
                          <Input
                            label="No of Legs"
                            crossOrigin={true}
                            type="number"
                            className="outline-none focus:ring-0 focus:ring-offset-0"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={orderStatus != Order.orderStatus.NEW}
                            name="noOfLegs"
                            error={!!touched.noOfLegs && !!errors.noOfLegs}
                            value={values.noOfLegs}
                          />
                          <span className="text-sm text-red-400">
                            {touched.noOfLegs && errors.noOfLegs}
                          </span>
                        </div>

                        <div>
                          <MSelect
                            label="Order Strategy"
                            placeholder="SelectOption Order Strategy"
                            name="orderStrategy"
                            onChange={(choice) => {
                              setFieldValue("orderStrategy", choice!, true);
                            }}
                            onBlur={handleBlur}
                            disabled={orderStatus != Order.orderStatus.NEW}
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
                          <span className="text-sm text-red-400">
                            {touched.orderStrategy && errors.orderStrategy}
                          </span>
                        </div>
                        <div>
                          <MSelect
                            label="Duration"
                            placeholder="SelectOption Duration"
                            name="duration"
                            onChange={(choice) => {
                              setFieldValue("duration", choice!, true);
                            }}
                            onBlur={handleBlur}
                            disabled={orderStatus != Order.orderStatus.NEW}
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
                          <span className="text-sm text-red-400">
                            {touched.duration && errors.duration}
                          </span>
                        </div>
                        {values.duration == OrderRequest.tif.GOOD_TILL_DATE && (
                          <div>
                            <Datepicker
                              asSingle
                              useRange={false}
                              disabled={orderStatus != Order.orderStatus.NEW}
                              value={values.expirationDate}
                              onChange={(e) => {
                                setFieldValue("expirationDate", e, true);
                              }}
                              inputClassName={
                                !!touched.expirationDate &&
                                  !!errors.expirationDate
                                  ? "w-full rounded-md border-red-400"
                                  : "w-full rounded-md border-grey-200"
                              }
                            />
                            <span className="text-sm text-red-400">
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
                            disabled={orderStatus != Order.orderStatus.NEW}
                            error={!!touched.notes && !!errors.notes}
                            value={values.notes}
                          />
                          <span className="text-sm text-red-400">
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
                        {updatingOrder ? (
                          <LoadingSpinner
                            size="sm"
                            label="updating order"
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

                        <div className="mt-2 flex flex-col place-items-center space-y-1">
                          <span className="sub-header">
                            <h2>Estimated Total Cost</h2>
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-extrabold">
                              {NumberFormatter(
                                (Number(values.limitPrice) ?? 0) *
                                Number(values.quantity)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="float-right mt-8">
                        {orderStatus == Order.orderStatus.NEW && <button
                          type="submit"
                          disabled={updatingOrder}
                          onClick={() =>
                            setResponseMessage({ success: "", error: "" })
                          }
                          className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                        >
                          Submit
                        </button>}
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

export default EditOrderModal;
