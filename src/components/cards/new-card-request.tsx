import {
  Option,
  Select,
  Checkbox,
} from "@material-tailwind/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  CardBrand,
  CardFunding,
  CardType,
  DepositAccount,
} from "~/server/api/models/banking";
import { currencyOptions } from "~/components/util/currency-formatter";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import useMapper from "~/components/util/custom-hooks/use-mapper";
import { TitleCase } from "~/components/util/string-formatter";
import Modal from "~/components/navigation/modal";
import { Formik, FormikValues, useFormikContext } from "formik";
import * as yup from "yup";
import customToast from "../ui/custom-toast";
import { title } from "process";

export default function RequestCard({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // interface Array<T> {
  //   fill(value: T): Array<T>;
  // }

  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";

  const accounts_query = api.banking.getDepositAccountsForClient.useQuery(
    clientId,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const accounts: DepositAccount[] = accounts_query.data ?? [];

  const getCardAccounts = (currency: string) => {
    var arr: DepositAccount[] = [];
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i]?.currency === currency) {
        arr.push(accounts[i] as DepositAccount);
      }
    }

    return arr;
  };

  const [accountArr, setAccountArr] = useState<DepositAccount[]>([])

  const [checkedState, setCheckedState] = useState(
    new Array<boolean>(accountArr.length).fill(false)
  );


  const handleCardAccount = (idx: number) => {
    const updatedCheckedState = checkedState.map((item, index: number) =>
      index === idx ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const initialNewCardValues = {
    currency: "",
    cardType: "",
    cardFunding: "",
    issuer: ""
  }

  const validateNewCardSchema = yup.object().shape({
    currency: yup.string().required("Required"),
    cardType: yup.string().required("Required"),
    cardFunding: yup.string().required("Required"),
    issuer: yup.string().required("Required")
  })

  const handleNewCardSubmit = ({
    currency,
    cardType,
    cardFunding,
    issuer
  }: FormikValues) => {
    const cardContent = {
      label: accounts[0]?.accountLabel!,
      currency,
      accounts: getCardAccounts(currency).map(acct => acct.id),
      cardType,
      cardFunding,
      cardBrand: issuer,
    }
    addCard(cardContent)
  };

  const { mutate: addCard } = api.banking.addCard.useMutation({
    onSuccess(data) {
      setOpen(false)
      !data.success ? customToast({ title: "Request Card", message: data.message, variant: "error" }) :
        customToast({ title: "Request Card", message: data.message, variant: "success" })
    },
  })

  return (
    <>
      <Modal
        open={open}
        size="lg"
        handler={setOpen}
        reset={() => setOpen(false)}
        title="Request a new card"
      >
        <Formik
          initialValues={initialNewCardValues}
          validationSchema={validateNewCardSchema}
          onSubmit={handleNewCardSubmit}
        >{({
          values,
          setFieldValue,
          handleBlur,
          errors,
          touched,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid sm:gap-y-4 md:grid-cols-2 md:gap-10">
              <div className="space-y-5">
                <Select
                  label="Currency"
                  name="currency"
                  placeholder="SelectOption currency"
                  className="text-gray-900"
                  value={values.currency}
                  onBlur={handleBlur}
                  onChange={(choice) => {
                    setFieldValue("currency", choice!)
                    setAccountArr(getCardAccounts(choice!))
                  }}
                  error={!!touched.currency && !!errors.currency}
                >
                  {currencyOptions.map((currency, index) => (
                    <Option value={currency.value} key={index} className="option">
                      {currency.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Card Type"
                  name="cardType"
                  placeholder="SelectOption card type"
                  className="text-gray-900"
                  value={values.cardType}
                  onBlur={handleBlur}
                  onChange={(choice) => setFieldValue("cardType", choice!)}
                  error={!!touched.cardType && !!errors.cardType}
                >
                  {useMapper(CardType).map((type, index) => (
                    <Option value={type as string} key={index} className="option">
                      {TitleCase(type as string)}
                    </Option>
                  ))}
                </Select>

                <Select
                  label="Card Funding"
                  name="cardFunding"
                  placeholder="SelectOption card funding"
                  value={values.cardFunding}
                  onBlur={handleBlur}
                  onChange={(choice) => setFieldValue("cardFunding", choice!)}
                  error={!!touched.cardFunding && !!errors.cardFunding}
                >
                  {useMapper(CardFunding).map((funding, index) => (
                    <Option
                      value={funding as string}
                      key={index}
                      className="option"
                    >
                      {TitleCase(funding as string)}
                    </Option>
                  ))}
                </Select>

                <Select
                  label="Issuer"
                  name="issuer"
                  placeholder="SelectOption card issuer"
                  value={values.issuer}
                  onBlur={handleBlur}
                  onChange={(choice) => setFieldValue("issuer", choice!)}
                  error={!!touched.issuer && !!errors.issuer}
                >
                  {useMapper(CardBrand).map((brand, index) => (
                    <Option
                      value={brand as string}
                      key={index}
                      className="option"
                    >
                      {TitleCase(brand as string)}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-gray-700 shadow">
                <div className="text-md mb-5 font-semibold leading-6">
                  Product details
                </div>
                <div className="text-xs font-medium">
                  <ul className="space-y-4 ">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Currency</span>
                      <span>{values.currency}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Card Type</span>
                      <span>{TitleCase(values.cardType)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Card Funding</span>
                      <span>{TitleCase(values.cardFunding)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Card Issuer</span>
                      <span>{TitleCase(values.issuer)}</span>
                    </li>
                  </ul>
                  <hr className="my-4" />
                  <ul className="space-y-4 ">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Accounts</span>
                      <span>{checkedState.length}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {accountArr.length != 0 && (
                  <>
                    <p className="mb-4 text-sm font-semibold">
                      SelectOption card accounts
                    </p>
                    <div className="grid grid-flow-row grid-cols-2 gap-x-4 gap-y-2">
                      {accountArr.map((account, index) => (
                        <div
                          className=" flex items-center justify-start space-x-2"
                          key={index}
                        >
                          <Checkbox
                            checked={checkedState[index]}
                            crossOrigin="true"
                            id={`account-${index}`}
                            onChange={() => handleCardAccount(index)}
                          />
                          <label htmlFor={`account-${index}`}>
                            {account.accountNo} {index}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-8 grid place-items-center">
              <button className="primary-btn" type="submit">
                <span>Request Card</span>
                <span className="ml-2">
                  <HiArrowNarrowRight />
                </span>
              </button>
            </div>
          </form>
        )}
        </Formik>
      </Modal>
    </>
  );
}
