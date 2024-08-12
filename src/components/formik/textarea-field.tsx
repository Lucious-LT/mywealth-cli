import React from 'react'
import { Textarea } from '@material-tailwind/react'
import { FieldConfig, useField } from 'formik'

interface Props extends FieldConfig {
  label: string
  rows: number
}

const TextareaField = ({ label, ...props }: Props) => {
  // @ts-ignore
  const [field, meta] = useField(props)
  return (
    <div className='col-span-2'>
      {/* @ts-ignore */}
      <Textarea
        label={label}
        className=' focus:ring-0'
        {...field}
        {...props}
        error={!!meta.touched && !!meta.error}
      />
      <span className="text-xs text-red-400">
        {meta.touched && meta.error}
      </span>
    </div>
  )
}

export default TextareaField
