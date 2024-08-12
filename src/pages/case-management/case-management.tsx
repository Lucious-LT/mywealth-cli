import React, { useState } from 'react'
import CaseSlideOver from '~/components/navigation/case-slide-over'
import { CaseTable } from "~/components/ui/caseTable"

type Props = {}

const CaseManagement = (props: Props) => {
  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen(!open)
  return (
    <div>
      <CaseSlideOver open={open} handleClose={toggleModal} />
      <CaseTable toggleModal={toggleModal} />
    </div>
  )
}

export default CaseManagement
