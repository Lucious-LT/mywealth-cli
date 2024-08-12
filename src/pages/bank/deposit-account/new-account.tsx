import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "~/utils/api";
import {
  Input,
  Option,
  Select as MSelect,
} from "@material-tailwind/react";
import { NumberFormatter } from "~/components/util/number-formatter";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSession } from "next-auth/react";
import {
  DepositAccount,
  AccountStatus,
  Branch,
} from "~/server/api/models/banking";
import { DepositAccountRequestType } from "~/server/api/routers/banking";
import { LoadingSpinner } from "~/components/ui/spinner";
import SuccessDisplay from "~/components/ui/table/success-display";
import { ErrorDisplay } from "~/components/ui/error-display";
import Modal from "~/components/navigation/modal";
import { FormikHelpers, FormikValues, useFormik } from "formik";
import * as yup from "yup";
import customToast from "~/components/ui/custom-toast";

export default function NewAccount({
  open,
  setOpen,
  confirm,
  setConfirm,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.clientId ?? "";
  const { data: products } = api.banking.getDepositProducts.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const util = api.useUtils();

  const [branch, setBranch] = useState<Branch | null>();

  const { data: getBranch } = api.banking.getBranches.useQuery(undefined, {
    staleTime: 30000,
  });

  let branches: Branch[] | null = null;

  if (getBranch) {
    branches = getBranch?.content;
  }

  useEffect(() => {
    if (branches && branches[0]) {
      setBranch(branches[0]);
    } else {
      setBranch(null);
    }
  }, [getBranch]);

  const handleConfirmModal = () => {
    setOpen(!open);
    setConfirm(!confirm);
  };

  const resetAddAcctForm = () => {
    setConfirm(false);
    setOpen(false);
  };

  const [addAcctResponse, setAddAcctResponse] = useState<
    DepositAccount | string
  >();

  const [isError, setIsError] = useState(false);

  const { mutate: addDepositAccount, isLoading: creatingAccount } =
    api.banking.addDepositAccount.useMutation();

  const getSelectedProduct = (id: string) => {
    return products?.content.find(product => product.id === id)
  }

  const handleNewProductSubmit = ({ product: productId, overDraftLimit }: FormikValues, { resetForm }: FormikHelpers<any>) => {
    const product = getSelectedProduct(productId)
    const addDepositAccountData: DepositAccountRequestType = {
      accountLabel: sessionData?.user.clientLabel,
      notes: null,
      clientId: userId,
      productId: product?.id as string,
      branchId: branch?.id!,
      accountGroupId: null,
      status: AccountStatus.PENDING,
      overdraftInterestRate: product?.allowOverDrafts
        ? product?.overDraftInterestConfig?.defaultRate
        : null,
      overdraftLimit: product?.allowOverDrafts
        ? overDraftLimit
        : null,
      depositInterestRate: product?.payInterest
        ? product?.depositInterestConfig?.defaultRate
        : null,
    };
    addDepositAccount(addDepositAccountData, {
      onSuccess: () => {
        resetForm();
        setOpen(false);
        customToast({ title: "Add New Account", message: "Account Added Successfully", variant: "success" })
      }
    })
  }

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues: {
      product: "",
      overDraftLimit: ""
    },
    validationSchema: yup.object().shape({
      product: yup.string().required("Required"),
      overDraftLimit: yup.string().when("product", ([product], schema) =>
        getSelectedProduct(product)?.overDraftLimit ? schema.required("Required") : schema.notRequired()
      )
    }),
    onSubmit: handleNewProductSubmit
  })

  return (
    <>
      <Modal
        open={open}
        handler={() => setOpen(!open)}
        title="Open a New Account"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid sm:gap-y-4 md:grid-cols-2 md:gap-10">
            <div className="space-y-5">
              <MSelect
                label="Product"
                name="product"
                value={values.product}
                onChange={(value) => setFieldValue("product", value)}
                onBlur={handleBlur}
                error={!!touched.product && !!errors.product}
                placeholder=""
              >
                {products &&
                  products.content.map((product, index) => (
                    <Option
                      className="option"
                      value={product.id}
                      key={index}
                    >
                      {product.label}
                    </Option>
                  ))}
              </MSelect>
              {getSelectedProduct(values.product)?.allowOverDrafts && (
                <>
                  <span className="text-xs font-semibold ">
                    This product allows OVERDRAFT.
                  </span>
                  <Input crossOrigin="true"
                    label="Set Overdraft limit"
                    name="overDraftLimit"
                    type="number"
                    value={values.overDraftLimit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.overDraftLimit && !!errors.overDraftLimit}
                    className="focus:ring-0 text-xs"
                  />
                  {+values.overDraftLimit > (getSelectedProduct(values.product)?.overDraftLimit as number) && (
                    <div className="inline-error">
                      Overdraft limit is{" "}
                      <span className="font-extrabold">
                        {NumberFormatter(getSelectedProduct(values.product)?.overDraftLimit as number)}
                      </span>
                    </div>
                  )}
                </>
              )}
              <div className="mt-8 grid place-items-center">
                {creatingAccount ? (
                  <LoadingSpinner size="md" label="Processing ..." />
                ) : (
                  <button className="primary-btn" type="submit">
                    <span>Add account</span>
                    <span className="ml-2">
                      <HiArrowNarrowRight />
                    </span>
                  </button>
                )}

                {isError && (
                  <ErrorDisplay>
                    <p>{addAcctResponse as string}</p>
                  </ErrorDisplay>
                )}
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-gray-700 shadow">
              <div className="text-md mb-5 font-semibold leading-6">
                Product details
              </div>
              <div className="text-xs font-medium">
                <ul className="grid-flex-row grid grid-cols-2 gap-4 ">
                  <li className="flex flex-col space-y-0.5">
                    <span className="text-gray-500">Product</span>
                    <span>{getSelectedProduct(values.product)?.label}</span>
                  </li>
                  <li className="flex flex-col space-y-0.5">
                    <span className="text-gray-500">Category</span>
                    <span>{getSelectedProduct(values.product)?.category}</span>
                  </li>
                  <li className="flex flex-col space-y-0.5">
                    <span className="text-gray-500">Currency</span>
                    <span>{getSelectedProduct(values.product)?.currency}</span>
                  </li>
                  <li className="flex flex-col space-y-0.5">
                    <span className="text-gray-500">Deposit Type</span>
                    <span>{getSelectedProduct(values.product)?.depositType}</span>
                  </li>
                </ul>
                {getSelectedProduct(values.product)?.allowOverDrafts && (
                  <>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                      <span className="text-gray-500">Overdraft Limit</span>
                      {NumberFormatter(getSelectedProduct(values.product)?.overDraftLimit as number)}
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Set Overdraft Limit
                        </span>
                        {NumberFormatter(+values.overDraftLimit)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        open={confirm}
        handler={handleConfirmModal}
        reset={resetAddAcctForm}
        size="md"
      >
        <div className="mx-10 grid place-items-center space-y-4">
          {addAcctResponse != undefined && (
            <SuccessDisplay>
              <div className="text-center text-sm leading-5 tracking-wide">
                <span>Account opening process has been initiated.</span>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Account Number: </span>
                    <span>{(addAcctResponse as DepositAccount).accountNo}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Status: </span>
                    <span>{(addAcctResponse as DepositAccount).status}</span>
                  </li>
                </ul>
              </div>
            </SuccessDisplay>
          )}
        </div>
      </Modal>
    </>
  );
}
