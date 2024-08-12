import { Card, Checkbox, Typography } from '@material-tailwind/react'
import React, { type ChangeEvent, type Dispatch, type SetStateAction, useState } from 'react'
import ViewOnlyInput from '~/components/formik/view-only-input'
import CardHeader from '~/components/layout/card-header'
import { capitalize } from '~/utils/format'

type Props = {
  setDetails: Dispatch<SetStateAction<{ values: any, show: boolean }>>
  values: signupForm
  onSubmit: any
}

type signupForm = {
  clientType: string,
  firstName: string,
  lastName: string,
  companyName: string,
  mobileNo: string,
  officeNo: string,
  email: string,
  password: string,
  addressLine1: string,
  addressLIne2: string,
  country: string,
  state: string,
  city: string,
  postCode: string,
  maritalStatus: string,
  gender: string,
  title: string,
  birthDate: {
    startDate: string,
    endDate: string
  },
  idType: string | undefined | null,
  idNo: string | undefined | null,
  idExpDate: {
    startDate: string,
    endDate: string
  },
  profession: string | undefined | null,
  nationality: string | undefined | null,
  totalNetworthRange: string | undefined | null,
  annualIncomeRange: string | undefined | null,
  liquidNetworthRange: string | undefined | null,
  sourceOfWealth: string | undefined | null,
  investmentExperience: string | undefined | null,
  riskTolerance: string | undefined | null,
  investmentObj: string | undefined | null,
  employerName: string | undefined | null,
  employerAddress: string | undefined | null,
  finIdNo: string | undefined | null
}

const SignupDetails = ({ values, onSubmit, setDetails }: Props) => {
  const [agreed, setAgreed] = useState<boolean>()
  const {
    clientType,
    firstName,
    lastName,
    companyName,
    mobileNo,
    officeNo,
    email,
    addressLine1,
    addressLIne2,
    country,
    state,
    city,
    postCode,
    title,
    gender,
    maritalStatus,
    birthDate,
    idType,
    idNo,
    idExpDate,
    employerName,
    employerAddress,
    profession,
    finIdNo,
    nationality,
    totalNetworthRange,
    annualIncomeRange,
    liquidNetworthRange,
    sourceOfWealth,
    investmentExperience,
    riskTolerance,
    investmentObj
  } = values

  return (
    <div className='w-full p-10'>
      <div>
        <CardHeader title='Profile Information' />
        <Card placeholder="" className='grid grid-cols-4 p-5 gap-6'>
          <ViewOnlyInput label='Client Type' value={capitalize(clientType)} />
          <ViewOnlyInput label='First Name' value={firstName} />
          <ViewOnlyInput label='Last Name' value={lastName} />
          {
            companyName && <ViewOnlyInput label='Company Name' value={companyName} />
          }
          <ViewOnlyInput label='Mobile Number' value={mobileNo} />
          <ViewOnlyInput label='Office Number' value={officeNo} />
          <ViewOnlyInput label='Email' value={email} />
        </Card>
      </div>
      <div className='mt-4'>
        <CardHeader title='Address Information' />
        <Card placeholder="" className='grid grid-cols-4 p-5 gap-6'>
          <ViewOnlyInput label='AddressLine 1' value={addressLine1} />
          {
            addressLIne2 && <ViewOnlyInput label='AddressLine 2' value={addressLIne2} />
          }
          <ViewOnlyInput label='Country' value={country} />
          <ViewOnlyInput label='State' value={state} />
          <ViewOnlyInput label='City' value={city} />
          <ViewOnlyInput label='Postal Code' value={postCode} />
        </Card>
      </div>
      <div className='mt-4'>
        <CardHeader title='Bio/Investment Information' />
        <Card placeholder="" className='grid grid-cols-4 p-5 gap-6'>
          <ViewOnlyInput label='Title' value={capitalize(title)} />
          <ViewOnlyInput label='Gender' value={capitalize(gender)} />
          <ViewOnlyInput label='Marital Status' value={capitalize(maritalStatus)} />
          <ViewOnlyInput label='Birth of Birth' value={birthDate.startDate} />
          <ViewOnlyInput label='Type of ID' value={capitalize(idType?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Id Number' value={idNo!} />
          <ViewOnlyInput label='Id Expiration Date' value={idExpDate.startDate} />
          <ViewOnlyInput label='Profession' value={profession!} />
          <ViewOnlyInput label='Employer Name' value={employerName!} />
          <ViewOnlyInput label='Employer Address' value={employerAddress!} />
          <ViewOnlyInput label='Finance ID Number (BVN)' value={finIdNo!} />
          <ViewOnlyInput label='Nationality' value={nationality!} />
          <ViewOnlyInput label='Total Networth Range' value={capitalize(totalNetworthRange?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Annual Income Range' value={capitalize(annualIncomeRange?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Liquid Networth Range' value={capitalize(liquidNetworthRange?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Source of wealth' value={capitalize(sourceOfWealth?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Investment Experience' value={capitalize(investmentExperience?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Risk Tolerance' value={capitalize(riskTolerance?.replaceAll("_", " ")!)} />
          <ViewOnlyInput label='Investment Objectives' value={capitalize(investmentObj?.replaceAll("_", " ")!)} />
        </Card>
      </div>
      <div>
        <Card placeholder="" className='p-3 mt-5'>
          <Checkbox crossOrigin={"false"} color="blue" onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)} label={<Typography placeholder="" color="blue-gray" className="flex font-medium">
            I acknowledge that I read and agree with the
            <Typography
              placeholder=""
              as="a"
              href="#"
              color='blue'
              className="font-medium mr-1 transition-colors hover:text-blue-700"
            >
              &nbsp;terms and conditions
            </Typography>
            concerning the use of this platform.
          </Typography>} />
        </Card>
      </div>
      <div className='w-full py-5 flex items-center justify-between'>
        <button onClick={() => setDetails(prev => ({ ...prev, show: false }))} className='btn-primary px-4 py-2 rounded-md'>Back</button>
        <div className='flex'>
          <button onClick={() => setDetails({ show: false, values: null })} className='border-[1px] border-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 disabled:bg-gray-500 rounded-md mr-3'>Cancel</button>
          <button onClick={() => onSubmit(values)} disabled={!agreed} className='btn-primary px-4 py-2 disabled:bg-gray-500 rounded-md'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default SignupDetails 
