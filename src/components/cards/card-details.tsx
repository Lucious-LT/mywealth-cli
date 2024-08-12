import { Input } from "@material-tailwind/react";
import classNames from "classnames";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { HiCog, HiDownload } from "react-icons/hi";
import Datepicker from "react-tailwindcss-datepicker";
import SlideOver from "~/components/navigation/slide-over";
import { NumberFormatter } from "~/components/util/number-formatter";
import {
  Card,
  CardStatus,
} from "~/server/api/models/banking";
import { api } from "~/utils/api";
import { today } from "~/components/util/today";
import Image from "next/image";
import visa from "../../../public/images/visa.png";
import mastercard from "../../../public/images/mastercard.png";
import chip from "../../../public/images/chip.png";
import card_bg1 from "../../../public/images/card_bg1.png";
import card_bg2 from "../../../public/images/card_bg2.png";
import PaginationButtons from "~/components/navigation/pagination-buttons";
import Modal from "~/components/navigation/modal";
import { ErrorDisplay } from "~/components/ui/error-display";

const CardDetails = ({
  open,
  setOpen,
  details,
  startDate,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  details: Card;
  startDate: Date;
}) => {
  const utils = api.useUtils();

  const [toggle, setToggle] = useState(false);
  const [rotate, setRotate] = useState(false);

  const toggleThis = (delay: number) => {
    setToggle(!toggle);
    return new Promise((res) => setTimeout(res, delay));
  };

  const animateDetails = () => {
    toggleThis(10000);
    setRotate(!rotate);
  };

  // Display card details
  const { data: cardForDisplay } =
    api.banking.getCardForDisplayByTokenId.useQuery(
      details?.cardTokenId as string,
      {
        enabled:
          details?.cardTokenId !== "" && details?.cardTokenId !== undefined,
        staleTime: 1000 * 60 * 5,
        // queryKey: ['b']
      }
    );

  // Set card transaction date states for Datepicker
  const [cardTransactionDate, setCardTransactionDate] = useState({
    startDate: startDate?.toISOString().split("T")[0] as string,
    endDate: today?.toISOString().split("T")[0] as string,
  });

  // Pagination parameters
  const [currentPage, setCurrentPage] = useState(0); //current page
  const [recordsPerPage, setRecordsPerPage] = useState(10); //no of records on each page

  // Load card transactions
  const { data: cardTransactions, isLoading: loadingCardTransactions } =
    api.banking.getTransactionsForCard.useQuery(
      {
        cardId: details?.id as string,
        startDate: cardTransactionDate.startDate, //todo get from date picker
        endDate: cardTransactionDate.endDate,
        page: currentPage, //todo add paging support
        size: recordsPerPage,
      },
      {
        enabled: details?.id !== "" && details?.id !== undefined,
        staleTime: 1000 * 60 * 5,
      }
    );

  // Set card transaction date range from datepicker
  const handleCardTransactionDate = (newDate: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setCardTransactionDate(newDate);
  };

  // --- Block Card
  const [isCardBlocked, setIsCardBlocked] = useState<boolean>();

  useEffect(() => {
    // if (details) setIsCardBlocked(details?.status == CardStatus.BLOCKED);

    details?.status == CardStatus.BLOCKED
      ? setIsCardBlocked(true)
      : setIsCardBlocked(false);
  }, [details]);

  const { mutate: blockCard } = api.banking.blockCardById.useMutation();
  const { mutate: unblockCard } = api.banking.unblockCardById.useMutation();

  console.log(isCardBlocked);

  const [authorize, setAuthorize] = useState(false);

  const [isError, setIsError] = useState(false);

  const [blockCardResponse, setBlockCardResponse] = useState<Card | string>();

  const handleBlockedCard = (isBlocked: boolean) => {
    isBlocked
      ? unblockCard(details?.id ?? "", {
        onSuccess: (data) => {
          setIsError(false);
          if (data) {
            setIsCardBlocked(data.status == CardStatus.BLOCKED);
            setBlockCardResponse(data);

            utils.banking.getCardForDisplayByTokenId.invalidate(
              data.cardTokenId
            );
          }
          setAuthorize(!authorize);
        },
        onError: (error) => {
          setIsError(true);
          setBlockCardResponse(error.message);
        },
      })
      : blockCard(details?.id ?? "", {
        onSuccess: (data) => {
          setIsError(false);
          if (data) {
            setIsCardBlocked(data.status == CardStatus.BLOCKED);
            setBlockCardResponse(data);

            utils.banking.getCardForDisplayByTokenId.invalidate(
              data.cardTokenId
            );
          }
          setAuthorize(!authorize);
        },

        onError: (error) => {
          setIsError(true);
          setBlockCardResponse(error.message);
        },
      });
  };

  // useTimer(isError, setIsError, setBlockCardResponse, setAuthorize);

  // Change card pin
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");

  let pinError = "";

  const { mutate: changeCardPin } = api.banking.changeCardPin.useMutation();

  const changPinData = {
    tokenId: details?.cardTokenId ?? "",
    oldPin: oldPin,
    newPin: newPin,
  };

  const handleChangePin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newPin == confirmNewPin
      ? changeCardPin(
        { ...changPinData },
        {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      )
      : (pinError = "Invalid Pin");
  };

  const [showCardSettings, setShowCardSettings] = useState(false);
  return (
    <>
      <SlideOver open={open} setOpen={setOpen} size="lg">
        <>
          <div className="mb-8">
            <div className="card z-40 transition-all">
              <div className="flex items-center py-4">
                <div className={classNames({ rotate: rotate })}>
                  <div className="relative h-48 w-72 overflow-hidden rounded-2xl font-mono text-gray-100 transition-all duration-500">
                    <div className="flex h-full w-full flex-col justify-center gap-6 bg-gradient-to-tr  from-gray-900 to-gray-600 p-6 shadow-lg transition-all delay-200 duration-100">
                      {details?.cardBrand == "VISA" ? (
                        <>
                          <div className="absolute left-0 top-0 z-10">
                            <Image src={card_bg2} alt="bg" className="" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Image
                              src={chip}
                              alt="card chip"
                              className="w-12"
                            />
                            <Image src={visa} alt="Visa" className="w-12" />
                          </div>
                        </>
                      ) : details?.cardBrand == "MASTERCARD" ? (
                        <>
                          <div className="absolute left-0 top-0 z-10">
                            <Image src={card_bg1} alt="bg" className="" />
                          </div>
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
                          {details?.maskedCardNumber}
                        </span>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <div className="flex w-full flex-col">
                          <span className="text-xs text-gray-200">
                            Card holder
                          </span>
                          <span className="text-sm">
                            {details?.label ?? ""}
                          </span>
                        </div>

                        <div className="flex w-1/4 flex-col">
                          <span className="text-xs text-gray-200">Expires</span>
                          <span className="text-sm">
                            {`${details?.expiryMonth
                              }/${details?.expiryYear.slice(2)}` ?? ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {toggle && (
                  <div className="ml-5 w-full text-xs tracking-wide">
                    <ul className="divide-y-1 divide-gray-200">
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">Card Type</span>
                        <span className="font-semibold text-gray-900">
                          {cardForDisplay?.cardType}
                        </span>
                      </li>
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">Card Funding</span>
                        <span className="font-semibold text-gray-900">
                          {cardForDisplay?.cardFunding}
                        </span>
                      </li>
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">Card Number</span>
                        <span className="font-semibold text-gray-900">
                          {cardForDisplay?.cardNumber}
                        </span>
                      </li>
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">Expiry Date</span>
                        <span className="font-semibold text-gray-900">
                          {cardForDisplay
                            ? `${cardForDisplay.cardExpiryMonth
                            }/${cardForDisplay.cardExpiryYear.slice(2)}`
                            : ""}
                        </span>
                      </li>
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">CVV</span>
                        <span className="font-semibold text-gray-900">
                          {cardForDisplay?.cardCvv}
                        </span>
                      </li>
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">Account #</span>
                        {/* TODO display all the account #s attached to the card ??*/}
                        <span className="font-semibold text-gray-900">
                          {/*{details?.accounts[0]?.accountNo} - todo extend this object and attach the account #s*/}
                          {details?.accountIds[0]}
                        </span>
                      </li>
                      <li className="flex justify-between py-1 pl-2">
                        <span className="text-gray-500">Status</span>
                        <span className="font-semibold text-gray-900">
                          {cardForDisplay?.cardStatus}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative mt-5">
                <button className="primary-btn " onClick={animateDetails}>
                  {toggle ? <>Hide details</> : <>View details</>}
                </button>
                <button
                  className="primary-btn absolute right-0 top-0 "
                  onClick={() => setShowCardSettings(!showCardSettings)}
                >
                  {!showCardSettings ? (
                    <>
                      <HiCog className="mr-2" />
                      Settings
                    </>
                  ) : (
                    <>
                      <span className="text-md mr-2 font-bold">x</span>
                      Close settings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {showCardSettings && (
          <>
            <div className="custom-card my-8 transition-all duration-500 ease-in-out">
              {/* <div className="text-md mb-8 truncate font-semibold leading-6 tracking-tight">
                  Card Settings
                </div> */}
              <div className="item-center mb-4 flex gap-32">
                <button
                  className={!isCardBlocked ? "error-btn" : "tertiary-btn"}
                  onClick={() => setAuthorize(!authorize)}
                >
                  {isCardBlocked ? "Unblock Card" : "Block Card"}
                </button>
              </div>

              <hr className="my-4" />
              <div className="flex flex-col space-y-4">
                <span className="text-sm font-semibold">Change Pin</span>
                <form onSubmit={(e) => handleChangePin(e)}>
                  <div className="space-y-4">
                    <Input
                      label="Old Pin"
                      className="text-xs"
                      onChange={(e) => setOldPin(e.target.value)}
                      crossOrigin={true}
                      type="numeric"
                      maxLength={4}
                    />
                    <Input
                      label="New Pin"
                      className="text-xs"
                      crossOrigin={true}
                      onChange={(e) => setNewPin(e.target.value)}
                      type="numeric"
                      maxLength={4}
                    />
                    <Input
                      label="Confirm New Pin"
                      className="text-xs"
                      crossOrigin={true}
                      onChange={(e) => setConfirmNewPin(e.target.value)}
                      type="numeric"
                      maxLength={4}
                    />
                    <button type="submit" className="secondary-btn">
                      change
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Modal
              open={authorize}
              handler={() => setAuthorize(!authorize)}
              size="xs"
            // reset={() => setAuthorize(false)}
            >
              <div className="grid place-items-center space-y-4">
                <span className="text-base font-bold">Authorize Action</span>
                <div className="text-center text-sm leading-5 tracking-wide">
                  <p>Please confirm that this is ok</p>
                </div>

                {/* <div className="mt-8"> */}
                <button
                  className="success-btn"
                  type="button"
                  onClick={() => handleBlockedCard(isCardBlocked as boolean)}
                >
                  Authorize
                </button>
                {/* </div> */}
              </div>

              {isError && (
                <ErrorDisplay>
                  <p>{blockCardResponse as string}</p>
                </ErrorDisplay>
              )}
            </Modal>
          </>
           )} 

          <div>
            {/* date form */}
            <div className="flex justify-between">
              <div className="text-md truncate font-semibold leading-6 tracking-tight">
                Card Transactions
              </div>
              <div className="flex space-x-5">
                <form className="flex items-center space-x-4">
                  <Datepicker
                    value={cardTransactionDate}
                    onChange={handleCardTransactionDate}
                    separator="to"
                    inputClassName="w-52 border-gray-300 rounded text-xs text-gray-600"
                    placeholder="Transaction Date Range"
                    useRange={false}
                  />
                </form>
                <button className="secondary-btn flex items-center">
                  <HiDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>
            <div className="relative my-10 overflow-hidden rounded bg-white p-0">
              {/* table */}

              <section className="text-gray-600 antialiased md:block">
                <div className="flex h-full flex-col justify-center">
                  {/* <!-- Table --> */}
                  <div className="shadow-xs mx-auto w-full rounded-sm bg-white">
                    <div className="overflow-x-auto">
                      <div className="w-auto">
                        <div className="bg-gray-50 text-xs font-semibold text-gray-500">
                          <div className="grid grid-cols-6 gap-2">
                            <div className="whitespace-nowrap p-2">
                              <div className="text-left font-semibold">
                                Date
                              </div>
                            </div>
                            <div className="col-span-2 whitespace-nowrap p-2">
                              <div className="text-left font-semibold">
                                Description
                              </div>
                            </div>
                            <div className="whitespace-nowrap p-2">
                              <div className="text-left font-semibold">
                                Channel
                              </div>
                            </div>
                            <div className="whitespace-nowrap p-2">
                              <div className="text-left font-semibold">
                                Type
                              </div>
                            </div>
                            <div className="w-10 whitespace-nowrap p-2">
                              <div className="text-left font-semibold">
                                Amount
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="divide-y divide-gray-100 text-xs">
                          {cardTransactions?.content?.map((line) => (
                            <div
                              key={line.transactionId}
                              className="grid grid-cols-6 gap-2"
                            >
                              <div className="whitespace-nowrap p-2">
                                <div className="text-left font-medium">
                                  {line.date}
                                </div>
                              </div>
                              <div className="col-span-2 whitespace-nowrap p-2">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">
                                    {line.description}
                                  </div>
                                </div>
                              </div>
                              <div className="whitespace-nowrap p-2">
                                <div className="text-left">{line.channel}</div>
                              </div>
                              <div className="whitespace-nowrap p-2">
                                <div className="text-left">{line.type}</div>
                              </div>
                              <div className="whitespace-nowrap p-2">
                                <div className="text-left">
                                  {NumberFormatter(line.amount)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <PaginationButtons
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={cardTransactions?.totalPages as number}
                setPageSize={setRecordsPerPage}
                pageSize={recordsPerPage}
              />
            </div>
          </div>
        </>
      </SlideOver>
    </>
  );
};
export default CardDetails;
