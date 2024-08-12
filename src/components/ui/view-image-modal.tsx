import { DialogBody, Dialog as MDialog, DialogHeader } from '@material-tailwind/react'
import React, { Dispatch, SetStateAction } from 'react'
import { api } from '~/utils/api'
import { Document, Page, pdfjs } from 'react-pdf';
import { LoadingSpinner } from '../util/spinner';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

type Props = {
  setModal: Dispatch<SetStateAction<{ open: boolean, url: string }>>
  modal: {
    open: boolean
    url: string
  }
}

const ViewImageModal = ({ modal: { open, url }, setModal }: Props) => {
  const { data: kycImage, isLoading } = api.profile.loadKycDocument.useQuery({ url })

  function isFilePdf(url?: string) {
    return url && url.split('.')[1] === 'pdf';
  }

  return (
    <>
      <MDialog
        placeholder={""}
        open={open}
        size={"xxl"}
        handler={() => setModal({ open: !open, url: "" })}
        className="min-w-screen max-w-screen z-0 m-0 w-screen bg-gray-100"
      >
        <DialogHeader className="relative border-b-2 border-gray-300 font-nun" placeholder={""}>
          <span className='h-[32px]'></span>
          <button
            className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
            onClick={() => setModal({ open: false, url: "" })}
          >
            x
          </button>
        </DialogHeader>

        <DialogBody className={`${!kycImage ? `flex justify-center items-center h-full` : isFilePdf(url) ? `` : `w-[80%] h-[90%]`} bg-inherit mx-auto px-8 font-nun`} placeholder={""}>
          {(!isFilePdf(url) && kycImage) ? <img src={kycImage} className="w-full border-2 border-gray-100 h-full" /> : kycImage ? <Document file={kycImage} >
            <Page pageNumber={1} renderTextLayer={false} renderMode="canvas" height={670} className="w-full" renderAnnotationLayer={false} />
          </Document> : <LoadingSpinner size='lg' />}
        </DialogBody>
      </MDialog>
    </>
  )
}

export default ViewImageModal;
