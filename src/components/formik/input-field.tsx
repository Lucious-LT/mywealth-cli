import React from 'react'
import { Input } from '@material-tailwind/react'
import { FieldConfig, useField } from 'formik'

interface Props extends FieldConfig {
  label: string
  icon?: React.ReactNode
  placeholder?: string
}

const InputField = ({ icon, label, placeholder, ...props }: Props) => {
  // @ts-ignore
  const [field, meta] = useField(props)
  return (
    <div className='grid-cols-1'>
      {/* @ts-ignore */}
      <Input
        crossOrigin="true"
        {...field}
        {...props}
        placeholder={placeholder}
        label={label}
        icon={icon}
        className="outline-none focus:ring-0 focus:ring-offset-0"
        error={!!meta.touched && !!meta.error}
      />
      <span className="text-xs text-red-400">
        {meta.touched && meta.error}
      </span>
    </div>
  )
}

export default InputField
