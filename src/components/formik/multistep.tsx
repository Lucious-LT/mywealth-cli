import { Step, Stepper } from '@material-tailwind/react';
import { Form, Formik, FormikConfig, FormikHelpers, FormikValues } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react'
import Cancel from '../layout/cancel';
import FormNavigation from './form-navigation';

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  onSubmit: any
  details: any
}

const MultiStepForm = ({ children, initialValues, details, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(details.values ? 3 : 0);

  const steps = React.Children.toArray(children) as React.ReactElement[];

  const [snapShot, setSnapShot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setSnapShot(values)
    setStepNumber(stepNumber + 1)
  };

  const previous = (values: FormikValues) => {
    setSnapShot(values);
    setStepNumber(stepNumber - 1)
  };

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    if (step?.props.onSubmit) {
      await step.props.onSubmit(values, next)
    } else if (!step?.props.onSubmit && !isLastStep) {
      actions.setTouched({});
      next(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions)
    }
  }

  return (
    <Formik
      initialValues={details.values ?? snapShot}
      onSubmit={handleSubmit}
      validationSchema={step?.props.validationSchema}
      enableReinitialize
    >

      {formik =>
        <Form className='w-full'>
          <Cancel />

          <Stepper activeStep={stepNumber} activeLineClassName="bg-primary" className="mb-20 mt-10" placeholder="My Stepper">
            {steps.map((step, index) => (
              <Step activeClassName='bg-primary' completedClassName='bg-primary' placeholder={step?.props.stepName} key={index}>
                {index + 1}
                <span className='absolute top-12 inline w-[250%] text-center text-primary'>{step?.props.stepName}</span>
              </Step>
            ))}
          </Stepper>

          {step}
          <FormNavigation
            isLastStep={isLastStep}
            onBackClick={() => previous(formik.values)}
            hasPrevious={stepNumber > 0}
          />
        </Form>}
    </Formik>
  )
}

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }: any) => {
  return <div className="grid mt-5 grid-cols-3 w-full gap-6">{children}</div>
};
