import { RadioGroup } from '@headlessui/react'
import {
  Dialog as MDialog,
  DialogHeader,
  DialogBody
} from '@material-tailwind/react'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FixedDepositProduct } from '~/server/api/models/investing'
import { formatMoney } from '~/utils/format'

type Props = {
  newFixedDeposit: boolean
  handleNewFixedDeposit: () => void
  fixedDepositProduct: FixedDepositProduct
  setFixedDepositProduct: Dispatch<SetStateAction<FixedDepositProduct | undefined>>
  fixedDepositProducts: FixedDepositProduct[] | undefined
  handleFixedDepositProduct: (product: FixedDepositProduct) => void
  selectedFixedDepositProduct: any
  handleContModal: () => void
}

const NewFixedDepositModal = ({ newFixedDeposit, handleNewFixedDeposit, fixedDepositProduct, setFixedDepositProduct, fixedDepositProducts, handleFixedDepositProduct, selectedFixedDepositProduct, handleContModal }: Props) => {
  return (
    <MDialog
      placeholder={""}
      open={newFixedDeposit}
      size={"lg"}
      handler={handleNewFixedDeposit}
      className=" bg-gray-100 "
    >
      <DialogHeader className="relative font-nun" placeholder={""}>
        <div className="flex flex-col">
          <span className=" font-bold">Fixed Deposit Product</span>
          <span className="text-sm text-gray-600">
            Choose an investment plan
          </span>
        </div>

        <button
          className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
          onClick={handleNewFixedDeposit}
        >
          x
        </button>
      </DialogHeader>
      <DialogBody className="h-full p-4 font-nun" placeholder={""}>
        <RadioGroup
          value={fixedDepositProduct}
          onChange={setFixedDepositProduct}
          className="flex justify-center cursor-pointer"
        >
          <RadioGroup.Label className="sr-only">
            Fixed Deposit Plans
          </RadioGroup.Label>
          <div className="carousel-center carousel space-x-6 p-4">
            {fixedDepositProducts?.map((product, index) => (
              <div className="carousel-item max-w-md" key={index}>
                <RadioGroup.Option value={product.label}>
                  {({ active, checked }) => (
                    <div
                      className={`${active ? "border-2 border-gray-500" : ""
                        } ${checked
                          ? "border-2 border-primary"
                          : " border-1 border-gray-300"
                        } divide-y-1 divide-gray-300`}
                      onClick={() => handleFixedDepositProduct(product)}
                    >
                      <div className="flex flex-col space-y-6 p-8 text-center">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-900">
                            {product.code}
                          </span>
                          <span className="mt-1 text-xs capitalize text-gray-600">
                            {product.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900">
                              {`${formatMoney(product.interestConfig.defaultRate!)}%`}
                            </span>
                            <span className="mt-0.5 text-xs text-gray-600">
                              Interest Rate
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900">
                              {product.minTenor + " - " + product.maxTenor}
                            </span>
                            <span className="mt-0.5 text-xs text-gray-600">
                              Tenor(days)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col p-8 text-xs font-semibold text-gray-900">
                        <ul className="space-y-4 ">
                          <li className="flex items-center justify-between">
                            <span>Min Amount</span>
                            <span>-</span>
                            <span>{formatMoney(product.minPrincipalAmount!)}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Max Amount</span>
                            <span>-</span>
                            <span>{formatMoney(product.maxPrincipalAmount!)}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="">Currency</span>
                            <span className=" ">-</span>
                            <span className="">{product.currency}</span>
                          </li>

                          <li className="flex items-center justify-between">
                            <span>Early Termination</span>
                            <span>-</span>
                            <span>{product.earlyTerminationRate ? "Yes" : "No"}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex justify-center p-4">
                        <button
                          className={`${active ? "bg-primary" : ""} ${checked
                            ? "bg-primary text-white shadow-lg shadow-gray-200"
                            : "bg-transparent text-gray-900 hover:bg-gray-50  hover:text-primary hover:shadow-lg hover:shadow-gray-200"
                            } rounded-lg px-5 py-3 text-sm font-bold uppercase `}
                        >
                          {`${checked ? "Selected Plan" : "Choose plan"}`}
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
          onClick={handleContModal}
          disabled={!selectedFixedDepositProduct}
          className={classNames(
            selectedFixedDepositProduct
              ? "bg-transparent text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
              : "cursor-not-allowed bg-gray-200 text-gray-500",
            "mx-2 flex items-center rounded-lg px-5 py-3 text-xs font-bold uppercase"
          )}
        >
          Continue
          <span className="ml-2">
            <HiArrowNarrowRight />
          </span>
        </button>
      </DialogBody>
    </MDialog>)
}

export default NewFixedDepositModal
