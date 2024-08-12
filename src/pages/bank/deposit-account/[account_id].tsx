import React, { useState } from "react";
import { type NextPage } from "next";
import { HiPlus } from "react-icons/hi";
import CardHeader from "~/components/layout/card-header";
import { NumberFormatter } from "~/components/util/number-formatter";
import Image from "next/image";
import visa from "../../../../public/images/visa.png";
import mastercard from "../../../../public/images/mastercard.png";
import chip from "../../../../public/images/chip.png";
import card_bg1 from "../../../../public/images/card_bg1.png";
import card_bg2 from "../../../../public/images/card_bg2.png";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type Card } from "~/server/api/models/banking";
import { today } from "~/components/util/today";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import RequestCard from "../../../components/cards/new-card-request";
import CardDetails from "../../../components/cards/card-details";
import AccountStatement from "./account-statement";

const Account_id: NextPage = () => {
  const router = useRouter();

  // ---Client account id
  const selectedAccountId = router.query.account_id as string;


  // ---Load the cards
  const { data: cards, isLoading: loadingCards } =
    api.banking.getCardsForAccountWithId.useQuery(selectedAccountId, {
      enabled: selectedAccountId !== "" && selectedAccountId !== undefined,
      staleTime: 1000 * 60 * 5,
    });

  // Load account balance
  const { data: accountBalance, isLoading: loadingBalance } = api.banking.getDepositAccountBalance.useQuery(
    { accountId: selectedAccountId, valueDate: today },
    {
      enabled: selectedAccountId !== "" && selectedAccountId !== undefined,
      staleTime: 1000 * 60 * 5,
    }
  );

  // Load account 
  // const { data: account, isLoading: loadingAccount } = api.banking.getDepositAccountById.useQuery(
  //   selectedAccountId,
  //   {
  //     enabled: selectedAccountId !== "" && selectedAccountId !== undefined,
  //     staleTime: 1000 * 60 * 5,
  //   }
  // );

  // This is the default Startdate used to load account statement and card transactions
  // current_date - 7 days
  const defaultStartDate = new Date(today.valueOf() - 604800000);

  // stmt options 

  const [cardOpen, setCardOpen] = useState(false);

  const [cardDetails, setCardDetails] = useState(cards?.[0] as Card);



  // ---Open card slide over and set card details
  const handleCardOpen = (index: number) => {
    setCardOpen(!cardOpen);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCardDetails(cards?.[index]);
  };

  // --- open card request modal
  const [requestCard, setRequestCard] = useState(false);

  return (
    <>
      {/* <RequestCard /> */}
      <RequestCard open={requestCard} setOpen={setRequestCard} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 p-4">
          <div className="mb-8 flex items-end justify-between">
            <CardHeader title="account statement" />
            <div className="flex items-center justify-end gap-12">
              {/* <div
                className={classNames(
                  loadingAccount ? "space-y-1" : "",
                  "flex flex-col"
                )}
              >
                {loadingAccount ? (
                  <>
                    <span className="skeleton-label "></span>
                    <span className="skeleton-label "></span>
                  </>
                ) : (
                  <>
                    <span className="text-base font-semibold">
                      {account?.accountLabel}
                    </span>
                    <div>
                      <span className="badges">
                        {maskAccountNumber(account?.accountNo)}
                      </span>
                    </div>
                  </>
                )}
              </div> */}
              <div className="flex flex-col space-y-2 ">
                {loadingBalance ? (
                  <div className="flex items-center justify-end">
                    <span className="skeleton-label"></span>
                  </div>
                ) : (
                  <div className="flex items-center justify-end text-base font-semibold">
                    <span>{CurrencyFormatter(accountBalance?.currency ?? "")}</span>
                    <span>{NumberFormatter(accountBalance?.amount ?? 0.00)}</span>
                  </div>
                )}

                <span className="sub-header text-right">Available Balance</span>
              </div>
            </div>
            {/* )} */}
          </div>
          {/* account stament  */}
          <AccountStatement
            id={selectedAccountId}
            startDate={defaultStartDate.toISOString().split("T")[0] as string}
          />
        </div>
        <div className="custom-card mb-20">
          <div className="mb-8 flex items-center justify-between">
            <CardHeader title="cards" />
            <div className="">
              <button
                className="primary-btn"
                onClick={() => setRequestCard(true)}
              >
                <HiPlus /> <span className="ml-2">Request Card</span>
              </button>
            </div>
          </div>

          <div className="h-auto overflow-y-auto overflow-x-hidden px-10">
            <div className="grid place-items-center space-y-4 ">
              {loadingCards ? (
                <div className="skeleton-card rounded-2xl"></div>
              ) : (
                cards != undefined &&
                cards.map((card, index) => (
                  <div
                    className="relative h-48 w-72 cursor-pointer overflow-hidden rounded-2xl font-mono text-gray-100 transition-all duration-500"
                    key={index}
                    onClick={() => handleCardOpen(index)}
                  >
                    <div className="absolute top-0 left-0 z-10">
                      <Image
                        src={
                          card.cardBrand == "VISA"
                            ? card_bg2
                            : card.cardBrand == "MASTERCARD"
                              ? card_bg1
                              : ""
                        }
                        alt="bg"
                        className=""
                      />
                    </div>
                    <div className="flex h-full w-full flex-col justify-center gap-6 bg-gradient-to-tr  from-gray-900 to-gray-600 p-6 shadow-lg transition-all delay-200 duration-100 hover:from-black hover:to-black">
                      {card.cardBrand == "VISA" ? (
                        <>
                          <div className="flex items-center justify-between">
                            <Image
                              src={chip}
                              alt="card chip"
                              className="w-12"
                            />
                            <Image src={visa} alt="Visa" className="w-12" />
                          </div>
                        </>
                      ) : card.cardBrand == "MASTERCARD" ? (
                        <>
                          <div className="flex items-center justify-between">
                            <Image
                              src={chip}
                              alt="card chip"
                              className="w-12"
                            />
                            <Image
                              src={mastercard}
                              alt="Visa"
                              className="w-12"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <Image
                              src={chip}
                              alt="card chip"
                              className="w-12"
                            />
                            <Image src={visa} alt="Visa" className="w-12" />
                          </div>
                        </>
                      )}

                      <div className="">
                        <span className="flex justify-center text-xl tracking-widest ">
                          {card.maskedCardNumber}
                        </span>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <div className="flex w-full flex-col">
                          <span className="text-xs text-gray-200">
                            Card holder
                          </span>
                          <span className="text-sm">{card.label}</span>
                        </div>

                        <div className="flex w-1/4 flex-col">
                          <span className="text-xs text-gray-200">Expires</span>
                          <span className="text-sm">{`${card.expiryMonth
                            }/${card.expiryYear.slice(2)}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card slide over */}
      <CardDetails
        open={cardOpen}
        setOpen={setCardOpen}
        details={cardDetails}
        startDate={defaultStartDate}
      />
    </>
  );
};

export default Account_id;
