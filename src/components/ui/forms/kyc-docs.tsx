import { Typography } from '@material-tailwind/react'
import React, { type Dispatch, type SetStateAction, useState } from 'react'
import { api } from '~/utils/api'
import { capitalizeWords, formatCreatedAt, formatFileSize } from '~/utils/format'
import { FaClock } from "react-icons/fa6";
import { FaBuildingColumns } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaCamera } from "react-icons/fa6";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDeleteModal from '../confirm-delete';
import { type KycDocument } from '~/server/api/models/crm';
import { LoadingSpinner } from '../spinner';
import dynamic from "next/dynamic";
const ViewImageModal = dynamic(() => import('../view-image-modal'), {
  ssr: false,
});

type Props = {
  clientId: string
  setKycUpdate: Dispatch<SetStateAction<{
    open: boolean,
    document: KycDocument | null
  }>>
  isActive: boolean
}

const kycDocs = ({ clientId, setKycUpdate, isActive }: Props) => {
  const { data: kycDocs } = api.profile.getKycDocumentsForClient.useQuery(clientId, {
    staleTime: 1000 * 60 * 5, // 5mins
  })
  const [modal, setModal] = useState({
    open: false,
    url: ""
  })
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    documentId: ""
  })

  const handleViewImage = (url: string | undefined = "") => {
    setModal({ open: true, url })
  }

  const handleDeleteDoc = (documentId: string | undefined = "") => {
    setDeleteModal({ open: true, documentId })
  }

  return (
    <ul className='divide-y-2'>
      <ViewImageModal setModal={setModal} modal={modal} />
      <ConfirmDeleteModal setModal={setDeleteModal} modal={deleteModal} />
      {kycDocs && kycDocs.length > 0 ? kycDocs.map((doc, index) => {
        const { recordType, idType, id, fileUrl, idExpDate, idNo, status, idIssuer, fileName, fileSize, createdAt } = doc
        return (
          <li className='flex justify-between px-2 py-1.5 items-center' key={index}>
            <div className='flex flex-col gap-1'>
              <Typography variant='h6' color='black' placeholder="">{capitalizeWords(recordType)} - {idType && capitalizeWords(idType)} - #{idNo}</Typography>
              <Typography variant='h6' color='teal' className='text-xs flex items-center' placeholder=""><FaClock className='mr-1' />{formatCreatedAt(createdAt)}   <span className='border-[1px] ml-2 text-white text-xs rounded-md bg-teal-500 px-1.5 py-1'>{status}</span></Typography>
              <Typography variant='h6' color='gray' className='text-sm flex items-center' placeholder=""><FaBuildingColumns className='mr-1' />{idIssuer} - <MdOutlineDateRange className='ml-1' />{idExpDate}</Typography>
              <Typography variant='h6' color='gray' className='text-xs flex items-center' placeholder=""><FaCamera className='mr-1' />{fileName} - {formatFileSize(fileSize!)}</Typography>
            </div>
            <div className='flex justify-between items-center'>
              <button
                onClick={() => handleViewImage(fileUrl)}
                className="bg-primary mr-2 flex items-center cursor-pointer py-1 px-3 border-primary border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-[4px] text-white transition duration-300 ease-in-out hover:text-primary"
              >
                <HiOutlineViewfinderCircle className='text-lg font-extrabold mr-1' /><span>View</span>
              </button>
              <button
                disabled={isActive}
                onClick={() => setKycUpdate({ open: true, document: doc })}
                className="bg-teal-500 mr-2 flex items-center cursor-pointer py-1 px-3 border-teal-500 border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-[4px] text-white transition duration-300 ease-in-out hover:text-teal-500"
              >
                <MdOutlineSystemUpdateAlt className='font-extrabold mr-1' /> <span>Update</span>
              </button>
              <button disabled={isActive} onClick={() => handleDeleteDoc(id)} className="bg-red-400 flex items-center cursor-pointer py-1 px-3 border-red-400 border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-[4px] text-white transition duration-300 ease-in-out hover:text-red-400">
                <MdDeleteOutline className='font-extrabold mr-1 text-lg' /><span>Delete</span>
              </button>
            </div>
          </li>
        )
      }) : kycDocs && kycDocs.length < 1 ? (
        <div className='flex justify-center items-center h-40 font-semibold'>No Kyc Document Submitted</div>
      ) : (
        <div className='flex justify-center items-center h-40'><LoadingSpinner size='lg' /></div>
      )}
    </ul>
  )
}

export default kycDocs
