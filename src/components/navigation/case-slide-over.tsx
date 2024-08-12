import * as yup from "yup"
import React, { Fragment } from 'react'
import { Transition, Dialog } from "@headlessui/react";
import { Form, Formik, FormikContext, FormikHelpers, FormikValues } from "formik";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Typography } from "@material-tailwind/react";
import SelectOption from "../formik/select-option";
import TextareaField from "../formik/textarea-field";
import InputField from "../formik/input-field";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { TicketRequest } from "~/server/api/models/crm";
import customToast from "../ui/custom-toast";

type Props = {
  open: boolean
  handleClose: () => void
}

const CaseSlideOver = ({ open, handleClose }: Props) => {

  const { data: sessionData } = useSession()
  const utils = api.useUtils()

  const { data: pickList } = api.crm.listPickList.useQuery()
  const { mutate: createTicket } = api.crm.createTicket.useMutation()
  const { data: profile } = api.profile.findByClientId.useQuery({ clientId: sessionData?.user?.clientId! })

  const initialValues = {
    subject: "",
    category: "",
    subCategory: "",
    description: "",
  }

  const caseValidation = yup.object({
    subject: yup.string().required("Required"),
    category: yup.string().required("Required"),
    subCategory: yup.string().required("Required"),
    description: yup.string().required("Required"),
  })

  const handleCaseSubmit = (values: FormikValues, { resetForm }: FormikHelpers<any>) => {
    const { subject, subCategory, category, description } = values
    const ticketData: TicketRequest = {
      subject,
      category,
      subCategory,
      description,
      clientId: sessionData?.user?.clientId!,
      contactId: profile?.contact?.[0]?.id!,
      channel: TicketRequest.channel.WEB,
      priority: TicketRequest.priority.MEDIUM
    }
    createTicket({ requestBody: ticketData }, {
      onSuccess: () => {
        utils.crm.getTicketForClient.invalidate();
        resetForm()
        handleClose()
        customToast({ title: "Case Management", message: "Case added successfully", variant: "success" })
      },
      onError(error) {
        console.log(error)
      },
    })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-3xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className=" rounded-full bg-gray-800 p-1 text-xs font-medium text-white shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300 focus:outline-none"
                        onClick={() => { }}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={caseValidation}
                    onSubmit={handleCaseSubmit}
                  >
                    <div className="fixed flex flex-col items-center inset-0 p-20 bg-white overflow-hidden">
                      <Typography placeholder="" variant="h2" className="mb-10">Create a new case</Typography>
                      <Form className="h-fit grid grid-cols-2 gap-8 w-full">
                        <div className="col-span-2">
                          <InputField label="Subject" name="subject" />
                        </div>
                        <SelectOption label="Category" name="category" options={pickList?.[0]?.pickListItems ?? []} />
                        <FormikContext.Consumer>
                          {({ values }) => (<>
                            <SelectOption label="Sub Category" name="subCategory" options={pickList?.[0]?.pickListItems?.find(item => item.label == values.category)?.pickListItemValues! ?? []} />
                          </>)}
                        </FormikContext.Consumer>
                        <TextareaField label="Description" name="description" rows={7} />
                        <div className="w-full flex col-span-2 justify-end">
                          <button type="reset" onClick={handleClose} className="cursor-pointer border border-primary text-xs font-semibold uppercase tracking-wider text-primary transition duration-300 rounded-md ease-in-out py-3 px-6">Cancel</button>
                          <button type="submit" className="ml-3 cursor-pointer bg-primary text-xs font-semibold uppercase tracking-wider text-white transition duration-300 rounded-md ease-in-out py-3 px-6">Submit</button>
                        </div>
                      </Form>
                    </div>
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CaseSlideOver
