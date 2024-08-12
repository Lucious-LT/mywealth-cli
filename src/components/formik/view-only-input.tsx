import { Input } from '@material-tailwind/react'
import React from 'react'

type Props = {
  label: string
  value: string
}

const ViewOnlyInput = ({ label, value }: Props) => {
  return (
    <div className='flex flex-col'>
      <label className='font-semibold text-sm mb-1'>{label}:</label>
      <Input
        size='md'
        crossOrigin={"true"}
        disabled
        value={value}
      />
    </div>
  )
}

export default ViewOnlyInput
