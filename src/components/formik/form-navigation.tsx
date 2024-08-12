import { FormikValues } from 'formik'
import React from 'react'

type Props = {
  hasPrevious?: boolean
  onBackClick: (values: FormikValues) => void
  isLastStep: boolean
}

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep }: Props) => {
  return (
    <div className={`${hasPrevious ? `justify-between` : `justify-end`} w-full mt-9 flex`}>
      {hasPrevious && <button
        className='secondary-btn hover:border-transparent border-[1px] hover:text-primary border-primary'
        type='button'
        onClick={onBackClick}
      >
        Back
      </button>}
      <button
        type='submit'
        className='secondary-btn hover:border-transparent border-[1px] hover:text-primary border-primary'
      >
        {isLastStep ? "Preview" : "Next"}
      </button>
    </div>
  )
}

export default FormNavigation
