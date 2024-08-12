import { DialogBody, Dialog as MDialog, DialogHeader, Typography } from '@material-tailwind/react'
import React, { Dispatch, SetStateAction } from 'react'
import { IoWarningOutline } from "react-icons/io5";
import { api } from '~/utils/api'
import customToast from './custom-toast';

type Props = {
  setModal: Dispatch<SetStateAction<{ open: boolean, documentId: string }>>
  modal: {
    open: boolean
    documentId: string
  }
}

const ConfirmDeleteModal = ({ modal: { open, documentId }, setModal }: Props) => {
  const utils = api.useUtils()
  const { mutate: DeleteKycDoc, isLoading: isDeleting } = api.profile.deleteKycDocument.useMutation({
    onSuccess: () => {
      setModal({ open: false, documentId: "" });
      customToast({ title: "Delete Document", message: "Document deleted successfully", variant: "success" });
      utils.profile.getKycDocumentsForClient.invalidate();
    },
    onError: (error) => {
      customToast({ title: "Delete Document", message: error.message, variant: "error" })
    }
  })
  return (
    <>
      <MDialog
        placeholder={""}
        open={open}
        size={"md"}
        handler={() => setModal({ open: !open, documentId: "" })}
        className="min-w-screen max-w-screen pb-8 z-0 m-0 w-screen bg-gray-100"
      >
        <DialogHeader className="relative font-nun" placeholder={""}>
          <span>Delete document</span>
          <button
            className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
            onClick={() => setModal({ open: false, documentId: "" })}
          >
            x
          </button>
        </DialogHeader>

        <DialogBody className="bg-inherit p-8 font-nun" placeholder={""}>
          <div className='flex items-center'>
            <div className='p-3 bg-red-100 mr-4 text-red-600 rounded-full text-2xl'>
              <IoWarningOutline />
            </div>
            <div>
              <Typography variant='h6' placeholder="" color='gray'>
                Are you sure you want to delete this document? This action cannot be undone!
              </Typography>
            </div>
          </div>
          <div className='flex float-right mt-8 items-center justify-between'>
            <button onClick={() => setModal({ open: !open, documentId: "" })} disabled={isDeleting} className='flex items-center mr-4 cursor-pointer py-1 px-3 border-gray-400 font-bold hover:bg-gray-600 hover:text-white border-[1px] disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-[4px] transition duration-300 ease-in-out'>Cancel</button>
            <button onClick={() => DeleteKycDoc(documentId)} disabled={isDeleting} className='bg-red-400 flex items-center cursor-pointer py-1 px-3 font-bold border-red-400 border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-[4px] text-white transition duration-300 ease-in-out hover:text-red-400'>Delete</button>
          </div>
        </DialogBody>
      </MDialog>
    </>
  )
}

export default ConfirmDeleteModal;
