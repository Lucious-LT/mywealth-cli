import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  HiArrowNarrowRight,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
import {
  DateToStringFormatter,
} from "~/components/util/date-formatter";
import Modal from "~/components/navigation/modal";
import { RadioGroup } from "@headlessui/react";
import {
  Input,
} from "@material-tailwind/react";
import classNames from "classnames";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";
import {
  getIntDays,
  today,
  todayAsString,
} from "~/components/util/today";
import { LoanAccount, LoanProduct } from "~/server/api/models/banking";
import { api } from "~/utils/api";
import {
  RemoveUnderScore,
  TitleCase,
} from "~/components/util/string-formatter";
import { LoadingSpinner } from "~/components/ui/spinner";
import { paymentSchedule } from "~/components/data/loan-data";
import { InlineError } from "~/components/ui/error-display";
import { useQueryClient } from "@tanstack/react-query";
import { LoanRequestType } from "~/server/api/routers/banking";

const NewLoanApplication = ({
  open,
  setOpen,
  confirm,
  setConfirm,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}) => {
  const utils = api.useUtils()
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.clientId ?? "";
  const queryClient = useQueryClient();

  const { data: branches } = api.banking.getBranches.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  //Get Loan products
  const { data: loanProducts, isLoading: gettingLoanProducts } =
    api.banking.getLoanProducts.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  const [loanProduct, setLoanProduct] = useState(loanProducts?.content?.[0]);

  const [selectedLoanProduct, setSelectedLoanProduct] = useState(loanProduct);
  // SelectOption loan product
  const handleLoanProduct = (product: LoanProduct) => {
    setSelectedLoanProduct((selectedLoanProduct) => ({
      ...selectedLoanProduct,
      ...product,
    }));
  };

  // Continue to loan application form
  const [contLoanApplication, setContLoanApplication] = useState(false);

  const handleLoanApplication = () => {
    setOpen(!open);
    setContLoanApplication(!contLoanApplication);
  };

  // Loan application form inputs
  const [dueDay, setDueDay] = useState("");
  const [amount, setAmount] = useState("");
  const [tenor, setTenor] = useState("");

  const errors = {
    dueDay: dueDay != "" && (Number(dueDay) < 1 || Number(dueDay) > 31),
    amount:
      amount != "" &&
      (Number(amount) < (selectedLoanProduct?.minAmount as number) ||
        Number(amount) > (selectedLoanProduct?.maxAmount as number)),
    tenor:
      tenor != "" &&
      (Number(tenor) < (selectedLoanProduct?.minTenor as number) ||
        Number(tenor) > (selectedLoanProduct?.maxTenor as number)),
  };

  // const isError = !errors.amount && !errors.dueDay

  //submit
  const { mutate: addLoanApplication, isLoading: processingApplication } =
    api.banking.addLoanApplication.useMutation();
  const { data: accountGroups } = api.banking.getAccountGroups.useQuery()

  const loanFormData = {
    accountLabel: sessionData?.user.clientLabel as string,
    accountGroupId: accountGroups?.[0] ?? null,
    clientId: sessionData?.user.clientId as string,
    productId: selectedLoanProduct?.id as string,
    branchId: branches?.content[0]?.id as string,
    principalAmount: Number(amount),
    applicationDate: today.toISOString().split("T")[0],
    accountOpenDate: today.toISOString().split("T")[0],
    balloonAmount: 0,
    disbursementDate: today.toISOString().split("T")[0],
    interestGracePeriod: 0,
    note: "",
    principalGracePeriod: 0,
    refCode: null,
    status: null,
    tranches: [],
    tenor: Number(tenor) ?? null,
    paymentDay: Number(dueDay),
  };

  const [response, setResponse] = useState<LoanAccount>();

  const submitLoanApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addLoanApplication({ ...loanFormData } as LoanRequestType, {
      onSuccess(data) {
        // setResponse(data);
      },
      onError(error) {
      },
      // onSettled() {
      //   queryClient.invalidateQueries()
      // }
    });
  };

  const resetLoanApplication = () => {
    setOpen(false);
    setContLoanApplication(false);
    setSelectedLoanProduct(undefined);
    setLoanProduct(loanProducts?.content?.[0]);
    setDueDay("");
    setAmount("");
  };

  const icon = {
    yes: <HiOutlineCheckCircle className="text-lg text-success" />,
    no: <HiOutlineXCircle className="text-lg text-error" />,
  };

  const handleChangeProduct = () => {
    setContLoanApplication(false);
  };

  return (
    <>
      <Modal
        open={open}
        handler={handleLoanApplication}
        size={(loanProducts?.totalCount as number) > 1 ? "lg" : "md"}
        title="Loan Product"
        subtitle="Choose a loan product"
        reset={resetLoanApplication}
      >
        {gettingLoanProducts ? (
          <LoadingSpinner label="Fetching Loan Products" size="lg" />
        ) : (
          <>
            <RadioGroup
              value={loanProduct}
              onChange={setLoanProduct}
              className="flex justify-center"
            >
              <RadioGroup.Label className="sr-only">
                Fixed Deposit Plans
              </RadioGroup.Label>
              <div className="carousel carousel-center space-x-6 p-4">
                {loanProducts?.content?.map((product) => (
                  <div className="carousel-item" key={product.id}>
                    <RadioGroup.Option value={product.id}>
                      {({ active, checked }) => (
                        <div
                          className={`${active ? "border-2 border-gray-500" : ""
                            } ${checked
                              ? "border-2 border-primary"
                              : " border-1 border-gray-300"
                            } w-[300px] divide-y-1 divide-gray-300`}
                          onClick={() => handleLoanProduct(product)}
                        >
                          <div className="flex flex-col space-y-6 p-8 text-center">
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-gray-900">
                                {product.label}
                              </span>
                              <span className="header mt-1">
                                {product.code}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <div className="flex flex-col space-y-0.5">
                                <span className="text-lg font-bold text-gray-900">
                                  {`${product.interestConfig.minRate} - ${product.interestConfig.maxRate}%`}
                                </span>
                                <span className="sub-header">
                                  Interest Rate
                                </span>
                              </div>
                              <div className="flex flex-col space-y-0.5">
                                <span className="text-xl font-bold text-gray-900">
                                  {`${product.minTolerance} - ${product.maxTolerance}`}
                                </span>
                                <span className="sub-header">Tolerance</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col p-8 text-xs font-semibold text-gray-900">
                            <ul className="space-y-1 ">
                              <li className="flex justify-between py-2 pl-2">
                                <span className="text-gray-500">Loan Type</span>
                                <span className="font-semibold text-gray-900">
                                  {TitleCase(
                                    RemoveUnderScore(product.loanType)
                                  )}
                                </span>
                              </li>
                              <li className="flex justify-between py-2 pl-2">
                                <span className="text-gray-500">Category</span>
                                <span className="font-semibold text-gray-900">
                                  {TitleCase(product.category)}
                                </span>
                              </li>
                              <li className="flex justify-between py-2 pl-2">
                                <span className="text-gray-500">Currency</span>
                                <span className="font-semibold text-gray-900">
                                  {product.currency}
                                </span>
                              </li>
                              <li className="flex justify-between py-2 pl-2">
                                <span className="text-gray-500">Status</span>
                                <span className="font-semibold capitalize text-gray-900">
                                  {TitleCase(product.status)}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex justify-center p-4">
                            <button
                              className={`${active ? "bg-primary" : ""} ${checked
                                ? "bg-primary text-white shadow-lg shadow-gray-200"
                                : "bg-transparent text-gray-900 hover:bg-gray-50  hover:text-primary hover:shadow-lg hover:shadow-gray-200"
                                } rounded-lg px-5 py-3 text-xs font-bold uppercase `}
                            >
                              {`${checked ? "Selected Product" : "Choose Product"
                                }`}
                            </button>
                          </div>
                        </div>
                      )}
                    </RadioGroup.Option>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <button
              onClick={handleLoanApplication}
              // className="mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200 disable-btn"
              className={classNames(
                selectedLoanProduct == undefined ? "disable-btn" : "primary-btn"
                // "font-bold"
              )}
              disabled={selectedLoanProduct === undefined}
            >
              Continue
              <span className="ml-2">
                <HiArrowNarrowRight />
              </span>
            </button>
          </>
        )}
      </Modal>

      <Modal
        open={contLoanApplication}
        handler={handleLoanApplication}
        size="lg"
        title="Continue loan application..."
        reset={resetLoanApplication}
      >
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-3 space-y-10">
            <button className="sub-btn" onClick={handleChangeProduct}>
              change product
            </button>
            <form onSubmit={(e) => submitLoanApplication(e)}>
              {selectedLoanProduct != undefined && (
                <>
                  <div className="item-center flex ">
                    <span className="header-lg">{`${selectedLoanProduct.label} (${selectedLoanProduct.code})`}</span>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                      <div className="relative flex w-full">
                        <Input crossOrigin={true}
                          size="md"
                          label="Loan Amount"
                          type="number"
                          onChange={(e) => setAmount(e.target.value!)}
                        />
                        <div className="!absolute right-1 top-1 rounded bg-blue-gray-50 px-3 py-2 text-lg font-semibold">
                          {CurrencyFormatter(selectedLoanProduct?.currency)}
                        </div>
                      </div>
                      {errors.amount && (
                        <InlineError
                          message={`Amount should be between ${NumberFormatter(
                            selectedLoanProduct.minAmount
                          )} and ${NumberFormatter(
                            selectedLoanProduct.maxAmount
                          )}`}
                        />
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Input
                        crossOrigin={true}
                        label="Due Day"
                        size="md"
                        type="number"
                        className=""
                        onChange={(e) => setDueDay(e.target.value!)}
                      />
                      {errors.dueDay && <InlineError message="Invalid day" />}
                    </div>
                    {selectedLoanProduct.loanType != "REVOLVING_CREDIT" && (
                      <>
                        <Input crossOrigin={true}
                          label="Tenor"
                          size="md"
                          className=""
                          onChange={(e) => setTenor(e.target.value!)}
                        />
                        {errors.tenor &&
                          (selectedLoanProduct?.minTenor as number) > 0 && (
                            <InlineError
                              message={`Tenor should be between ${selectedLoanProduct?.minTenor} and ${selectedLoanProduct?.maxTenor}`}
                            />
                          )}
                      </>
                    )}
                  </div>
                </>
              )}

              <div className="mt-2 grid place-items-center">
                {processingApplication ? (
                  <LoadingSpinner label="Processing ..." size="md" />
                ) : (
                  <button
                    className="disable-btn mx-2  mt-4  flex cursor-pointer items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                    type="submit"
                  >
                    <span>Confirm & proceed</span>
                    <span className="ml-2">
                      <HiArrowNarrowRight />
                    </span>
                  </button>
                )}
              </div>
            </form>

            <section>
              <div className="header-sm">Payment Schedule</div>
              <table className="table-main">
                <thead>
                  <tr className="modal-table-header">
                    <th className="table-header-item">Principal</th>
                    <th className="table-header-item">Interest</th>
                    <th className="table-header-item">Total</th>
                    <th className="table-header-item">Balance</th>
                    <th className="table-header-item">Due Date</th>
                  </tr>
                </thead>
                <tbody className="modal-table-body">
                  {paymentSchedule.payments.map((item) => (
                    <tr className="table-row">
                      <td className="table-row-item">{item.principalAmount}</td>
                      <td className="table-row-item">{item.interestAmount}</td>
                      <td className="table-row-item">{item.totalAmount}</td>
                      <td className="table-row-item">
                        {item.remainingBalance}
                      </td>
                      <td className="table-row-item">
                        {DateToStringFormatter(item.dueDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <div className="col-span-2 rounded-xl bg-gray-50 p-4 text-gray-700 shadow">
            <div className="text-md mb-5 font-semibold leading-6">
              Your application details
            </div>
            <div className="text-xs font-medium">
              {selectedLoanProduct != undefined && (
                <>
                  <ul className="grid-flex-row grid grid-cols-2 gap-4  ">
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Product</span>
                      <span>{selectedLoanProduct.label}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Loan Type </span>
                      <span>
                        {TitleCase(
                          RemoveUnderScore(selectedLoanProduct.loanType)
                        )}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Currency</span>
                      <span>{selectedLoanProduct.currency}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Default Amount</span>
                      <span>
                        {NumberFormatter(
                          selectedLoanProduct.defaultAmount as number
                        )}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Mininum Amount</span>
                      <span>
                        {NumberFormatter(selectedLoanProduct.minAmount)}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Maximum Amount</span>
                      <span>
                        {NumberFormatter(selectedLoanProduct.maxAmount)}
                      </span>
                    </li>
                  </ul>
                  <hr className="my-4" />
                  <div className="flex items-center justify-between space-x-1.5">
                    <div className="flex items-center space-x-2">
                      <span>Cards</span>
                      <span>{icon.yes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Tranfers</span>
                      <span>{icon.yes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Bill Pay</span>
                      <span>{icon.no}</span>
                    </div>
                  </div>
                  <div className="my-4 flex items-center justify-between space-x-2 font-semibold">
                    <hr className="w-full " />
                    <span className="w-full text-[10px] ">
                      Interest Configuration
                    </span>
                    <hr className="w-full" />
                  </div>
                  <ul className="grid-flex-row grid grid-cols-2 gap-4 ">
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Interest Type </span>
                      <span>
                        {TitleCase(selectedLoanProduct.interestConfig.rateType)}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Default Rate</span>
                      <span>{`${NumberFormatter(
                        selectedLoanProduct.interestConfig.defaultRate
                      )}%`}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Minimum Rate</span>
                      <span>{`${NumberFormatter(
                        selectedLoanProduct.interestConfig.minRate
                      )}%`}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Maximum Rate</span>
                      <span>{`${NumberFormatter(
                        selectedLoanProduct.interestConfig.maxRate
                      )}%`}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Payment Frequency</span>
                      <span>
                        {TitleCase(
                          selectedLoanProduct.interestConfig.paymentFrequency
                        )}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Balance Type</span>
                      <span>
                        {TitleCase(
                          RemoveUnderScore(
                            selectedLoanProduct.interestConfig.balanceType
                          )
                        )}
                      </span>
                    </li>
                  </ul>
                  {selectedLoanProduct.loanType != "REVOLVING_CREDIT" && (
                    <>
                      <hr className="my-4" />
                      <ul className="grid-flex-row grid grid-cols-3 gap-4 ">
                        <li className="flex flex-col space-y-0.5">
                          <span className="text-gray-500">Default Tenor </span>
                          <span>
                            {`${selectedLoanProduct.defaultTenor} days`}
                          </span>
                        </li>
                        <li className="flex flex-col space-y-0.5">
                          <span className="text-gray-500">Minimum Tenor </span>
                          <span>{`${selectedLoanProduct.minTenor} days`}</span>
                        </li>
                        <li className="flex flex-col space-y-0.5">
                          <span className="text-gray-500">Maximum Tenor </span>
                          <span>{`${selectedLoanProduct.maxTenor} days`}</span>
                        </li>
                      </ul>
                    </>
                  )}

                  <hr className="my-4" />
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Loan Amount</span>
                      <span>{NumberFormatter(+amount)}</span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Due Day</span>
                      <span>{dueDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tenor</span>
                      <span>{tenor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Application Date</span>
                      <span>{DateToStringFormatter(todayAsString)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Disbursal Date</span>
                      <span>
                        {DateToStringFormatter(
                          today.valueOf() +
                          getIntDays(
                            selectedLoanProduct.defaultTenor as number
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  {/* <hr className="my-4" />
                    <div className="flex justify-between">
                      <span className="text-gray-700">New Balance</span>
                      <span className="text-gray-900">
                        {NumberFormatter(+invstAmount)}
                      </span>
                    </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default NewLoanApplication;
