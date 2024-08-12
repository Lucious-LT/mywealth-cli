import { FieldConfig, useField } from 'formik';
import React from 'react';
import Datepicker from "react-tailwindcss-datepicker";

interface Props extends FieldConfig {
  label: string
  placeholder: string
}

const DatePicker = ({ label, placeholder, ...props }: Props) => {
  const [field, meta, helper] = useField(props.name)
  return (
    <div className='flex flex-col'>
      <Datepicker
        asSingle
        useRange={false}
        {...props}
        value={field.value}
        placeholder={placeholder}
        onChange={(value) => {
          helper.setValue(value)
        }}
        inputClassName={
          !!meta.touched && !!meta.error
            ? "w-full py-2 pt-2.5 text-sm rounded-md placeholder-red-400 border-red-400"
            : "w-full py-2 pt-2.5 text-sm rounded-md border-grey-200"
        }
      />
      <span className='text-xs mt-1 text-error'>{meta.touched && meta.error && "Required"}</span>
    </div>
  )
}

export default DatePicker
