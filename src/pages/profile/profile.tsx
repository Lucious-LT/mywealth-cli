import React, { useEffect, useRef, useState } from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import profileImage from "public/images/avatar.jpg";
import { TbEdit } from "react-icons/tb";
import { Input, Tooltip, Option, Select as MSelect } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { capitalize, capitalizeWords } from "~/utils/format";
import CardHeader from "~/components/layout/card-header";
import * as yup from "yup";
import { type FormikValues, useFormik } from "formik";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";
import { Country, State, City } from "country-state-city";
import { Address, Client, ClientRequest, ContactRequest, KycDocument } from "~/server/api/models/crm";
import toast from "react-hot-toast";
import KycDocs from "~/components/ui/forms/kyc-docs";
import UpdateKycForm from "~/components/ui/forms/update-kyc-form";
import dynamic from "next/dynamic";
const KycForm = dynamic(() => import('~/components/ui/forms/kyc-form'), {
  ssr: false,
});

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;
  const [editUserDetails, setEditUserDetails] = useState(false)
  const [editUserAddress, setEditUserAddress] = useState(false)
  const [editUserContacts, setEditUserContacts] = useState(false)
  const [showKycDocForm, setShowKycDocForm] = useState(false)
  const [showKycUpdateForm, setShowKycUpdateForm] = useState<{
    open: boolean,
    document: KycDocument | null
  }>({
    open: false,
    document: null
  })
  const updateButtonRef = useRef<HTMLButtonElement>(null);

  const { data: profile } = api.profile.findByClientId.useQuery({ clientId: user?.clientId! })
  const { data: picture } = api.profile.loadClientPicture.useQuery({ clientId: user?.clientId! })

  const turnOffEditAll = () => {
    setEditUserDetails(false);
    setEditUserAddress(false);
    setEditUserContacts(false)
  }

  const turnOnEditAll = () => {
    setEditUserDetails(true);
    setEditUserAddress(true);
    setEditUserContacts(true)
  }

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: ""
  });

  // Set timeout for error or success messages
  useEffect(() => {
    if (responseMessage.error) toast.error(responseMessage.error);
    if (responseMessage.success) toast.success(responseMessage.success);
  }, [responseMessage]);

  const utils = api.useUtils();

  const handleProfileSubmit = (
    values: FormikValues) => {
    const address = {
      id: profile?.address?.[0]?.id,
      addressLine1: values?.address,
      addressLine2: values?.addressLine2 ?? profile?.contact[0]?.address?.addressLine2 ?? "",
      country: values?.country,
      state: values?.state,
      city: values?.city,
      postCode: values?.postCode,
      type: values?.addressType,
    }

    const contactAddress = {
      id: profile?.contact[0]?.address?.id,
      addressLine1: values?.contactAddress,
      addressLine2: values?.addressLine2 ?? profile?.contact[0]?.address?.addressLine2 ?? "",
      country: values?.contactCountry,
      state: values?.contactState,
      city: values?.contactCity,
      postCode: values?.contactPostCode,
      type: values?.contactAddressType,
    }

    const contact = {
      address: contactAddress,
      annualIncomeRange: profile?.contact[0]?.annualIncomeRange ?? ContactRequest.annualIncomeRange.LESS_THAN_1B,
      birthDate: values?.birthDate?.startDate,
      crimanalConviction: profile?.contact[0]?.criminalConviction,
      email: values?.email,
      employerAddress: profile?.contact[0]?.employerAddress,
      employerName: profile?.contact[0]?.employerName,
      finIdNo: profile?.contact[0]?.finIdNo ?? "",
      firstName: values?.firstName,
      gender: profile?.contact[0]?.gender!,
      grantLoginAccess: profile?.contact[0]?.grantLoginAccess!,
      id: profile?.contact[0]?.id,
      idExpDate: profile?.contact[0]?.idExpDate ?? "",
      idNo: profile?.contact[0]?.idNo,
      idType: profile?.contact[0]?.idType,
      investmentExperience: profile?.contact[0]?.investmentExperience ?? ContactRequest.investmentExperience.INTERMEDIATE,
      investmentObj: profile?.contact[0]?.investmentObj ?? ContactRequest.investmentObj.CAPITAL_PRESERVATION,
      label: `${values.firstName} ${values.lastName}`,
      lastName: values?.lastName,
      maritalStatus: values?.maritalStatus,
      middleName: values?.middleName,
      mobileNo: String(values?.phone),
      moneyLaunderingRisk: profile?.contact[0]?.moneyLaunderingRisk,
      nationality: profile?.contact[0]?.nationality,
      networthLiquidRange: profile?.contact[0]?.networthLiquidRange ?? ContactRequest.networthLiquidRange.LESS_THAN_1B,
      networthTotalRange: profile?.contact[0]?.networthTotalRange ?? ContactRequest.networthTotalRange.LESS_THAN_1B,
      notes: profile?.contact[0]?.notes ?? "",
      officeNo: profile?.contact[0]?.officeNo ?? "08100000000",
      politicallyExposed: profile?.contact[0]?.politicallyExposed,
      profession: profile?.contact[0]?.profession,
      refCode: profile?.contact[0]?.refCode,
      riskTolerance: profile?.contact[0]?.riskTolerance ?? ContactRequest.riskTolerance.MODERATE,
      role: profile?.contact[0]?.role!,
      sourceOfWealth: profile?.contact[0]?.sourceOfWealth ?? ContactRequest.sourceOfWealth.OTHER_SOURCES,
      title: profile?.contact[0]?.title!,
      username: profile?.contact[0]?.username,
    }

    const profileContent = {
      address: [address],
      advisorGroupId: profile?.advisorGroup?.id,
      businessStructure: profile?.businessStructure ?? ClientRequest.businessStructure.OTHER,
      clientType: profile?.clientType!,
      contact: [contact],
      email: values.email,
      groupId: profile?.group?.id!,
      // @ts-ignore
      kycTierId: profile?.kycTier,
      label: `${values.firstName} ${values.lastName}`,
      mobileNo: String(values.phone),
      notes: profile?.notes,
      notificationEmail: profile?.notificationEmail,
      officeNo: profile?.officeNo ?? "08100000000",
      picture: profile?.pictureUrl ?? "",
      refCode: profile?.refCode,
      relationshipStartDate: profile?.relationshipStartDate,
      stlBankAccountName: undefined,
      stlBankAccountNo: undefined,
      stlBankAccountOpenDate: undefined,
      stlBankAddress: undefined,
      stlBankBranch: undefined,
      stlBankName: undefined,
      stlBankRoutingNo: undefined,
      stlBankSwiftCode: undefined,
      valuationCurrency: profile?.valuationCurrency!,
    }
    updateClient({ clientId: user?.clientId!, requestBody: profileContent },
      {
        onSuccess: () => {
          turnOffEditAll()
          setResponseMessage({ success: "Update successful", error: "" }),
            utils.profile.findByClientId.invalidate()
        },
        onError: (error) =>
          setResponseMessage({ success: "", error: error.message.replaceAll(/[\{\}]/g, "") }),
      })
  }

  const initialProfileValues = {
    firstName: profile?.contact[0]?.firstName ?? "",
    username: profile?.contact[0]?.username ?? "",
    middleName: profile?.contact[0]?.middleName ?? "",
    lastName: profile?.contact[0]?.lastName ?? "",
    email: profile?.contact[0]?.email ?? "",
    phone: profile?.contact[0]?.mobileNo ?? "",
    birthDate: {
      startDate: profile?.contact[0]?.birthDate,
      endDate: profile?.contact[0]?.birthDate
    } as DateValueType ?? { startDate: new Date(), endDate: new Date() } as DateValueType,
    gender: profile?.contact[0]?.gender ?? "",
    maritalStatus: profile?.contact[0]?.maritalStatus ?? "",
    // Address Information
    country: profile?.address && profile?.address[0] && profile?.address[0]?.country,
    state: profile?.address && profile?.address[0] && profile?.address[0]?.state,
    city: profile?.address && profile?.address[0] && profile?.address[0]?.city,
    address: profile?.address ? profile?.address[0]?.addressLine1 ?? "" : "",
    postCode: profile?.address && profile?.address[0] && profile?.address[0]?.postCode,
    addressType: profile?.address && profile?.address[0] && profile?.address[0]?.type,
    // Contact Information
    contactAddress: profile?.contact[0]?.address?.addressLine1,
    contactCity: profile?.contact[0]?.address?.city,
    contactState: profile?.contact[0]?.address?.state,
    contactCountry: profile?.contact[0]?.address?.country,
    contactPostCode: profile?.contact[0]?.address?.postCode,
    contactAddressType: profile?.contact[0]?.address?.type,
  };

  const validateProfileSchema = yup.object().shape({
    // User Details
    firstName: yup.string().notRequired(),
    username: yup.string().notRequired(),
    middleName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    email: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    birthDate: yup.object().notRequired(),
    gender: yup.string().notRequired(),
    maritalStatus: yup.string().notRequired(),
    // Address Information
    country: yup.string().notRequired(),
    state: yup.string().notRequired(),
    city: yup.string().notRequired(),
    address: yup.string().notRequired(),
    postCode: yup.string().notRequired(),
    addressType: yup.string().notRequired()
  });

  const {
    resetForm,
    setValues,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialProfileValues,
    onSubmit: handleProfileSubmit,
    validationSchema: validateProfileSchema,
  });

  const toggleEditUserDetails = () => {
    if (editUserDetails) {
      setEditUserDetails(false);
      //Reset User Details section
      setValues({
        ...values,
        firstName: profile?.contact[0]?.firstName ?? "",
        username: profile?.contact[0]?.username ?? "",
        middleName: profile?.contact[0]?.middleName ?? "",
        lastName: profile?.contact[0]?.lastName ?? "",
        email: profile?.contact[0]?.email ?? "",
        phone: profile?.contact[0]?.mobileNo ?? "",
        birthDate: {
          startDate: profile?.contact[0]?.birthDate,
          endDate: profile?.contact[0]?.birthDate
        } as DateValueType ?? { startDate: new Date(), endDate: new Date() } as DateValueType,
        gender: profile?.contact[0]?.gender ?? "",
        maritalStatus: profile?.contact[0]?.maritalStatus ?? "",
      })
    } else {
      setEditUserDetails(true)
    }
  }

  const toggleEditUserContact = () => {
    if (editUserContacts) {
      setEditUserContacts(false);
      //Reset User Contacts section
      setValues({
        ...values,
        contactAddress: profile?.contact[0]?.address?.addressLine1,
        contactCity: profile?.contact[0]?.address?.city,
        contactState: profile?.contact[0]?.address?.state,
        contactCountry: profile?.contact[0]?.address?.country,
        contactPostCode: profile?.contact[0]?.address?.postCode,
        contactAddressType: profile?.contact[0]?.address?.type,
      })
    } else {
      setEditUserContacts(true)
    }
  }

  const toggleEditUserAddress = () => {
    if (editUserAddress) {
      setEditUserAddress(false);
      //Reset Address section
      setValues({
        ...values,
        country: profile?.address && profile?.address[0] && profile?.address[0]?.country,
        state: profile?.address && profile?.address[0] && profile?.address[0]?.state,
        city: profile?.address && profile?.address[0] && profile?.address[0]?.city,
        address: profile?.address ? profile?.address[0]?.addressLine1 ?? "" : "",
        postCode: profile?.address && profile?.address[0] && profile?.address[0]?.postCode,
        addressType: profile?.address && profile?.address[0] && profile?.address[0]?.type,
      })
    } else {
      setEditUserAddress(true)
    }
  }
  const { mutate: updateClient, isLoading: updatingClient } = api.crm.updateClient.useMutation()

  return (
    <>
      <section className="custom-card my-4 flex items-center justify-between ">
        <div className="flex items-center  gap-20">
          <div className="flex items-center gap-8">
            <div className="h-24 w-24 rounded-full p-1 ring-2 ring-gray-400">
              <Image src={picture != null ? picture : profileImage} width={100} height={100} alt="profile" className="rounded-full" />
            </div>
            <div className=" col-span-4">
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm font-semibold">
                  {profile?.contact[0]?.label}
                </span>
                <span className="text-xs text-gray-600">
                  {profile?.code}
                </span>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => {
            if (editUserDetails && editUserAddress && editUserContacts) {
              resetForm()
              turnOffEditAll()
            }
            else turnOnEditAll()
          }} className="secondary-btn disabled:opacity-25 disabled:cursor-auto flex items-center hover:text-primary hover:border-primary border-[1px] border-transparent space-x-2">
            <TbEdit />
            <span>{editUserDetails && editUserAddress && editUserContacts ? `Discard` : `Edit all`}</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="radial-progress text-success"
            // @ts-ignore
            style={{ "--value": 60 }}
          >
            60%
          </div>
          <div>
            <p className="font-bold text-sm">KYC</p>
            <p className="text-gray-500 text-xs">Complete your KYC to unlock all features. </p>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <section className="mt-5">
          <div className="mb-1">
            <CardHeader title="Personal Information" />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="custom-card col-span-3 my-4">
              <div className="relative pb-4 ">
                <span className="text-sm font-bold text-primary">
                  User Details
                </span>
                <Tooltip
                  content="Edit user details"
                  placement="left"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-gray-600 text-xs"
                >
                  <button type="button" onClick={() => toggleEditUserDetails()} className="absolute top-0 right-0 cursor-pointer p-1 text-primary transition duration-300 ease-in-out hover:text-gray-900">
                    <TbEdit />
                  </button>
                </Tooltip>
              </div>

              <div className="grid grid-flow-row grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">username</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {values.username}
                    </span></>}
                  {(editUserDetails) && <Input
                    label="username"
                    crossOrigin="true"
                    type="text"
                    value={values.username}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    error={!!touched.username && !!errors.username}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">first name</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {values.firstName}
                    </span></>}
                  {(editUserDetails) && <Input
                    label="first name"
                    crossOrigin="true"
                    type="text"
                    value={values.firstName}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">middle name</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {values.middleName}
                    </span></>}
                  {(editUserDetails) && <Input
                    label="middle name"
                    crossOrigin="true"
                    type="text"
                    value={values.middleName}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="middleName"
                    error={!!touched.middleName && !!errors.middleName}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">last name</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.lastName}
                    </span></>}
                  {(editUserDetails) && <Input
                    label="last name"
                    crossOrigin="true"
                    type="text"
                    value={values.lastName}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">email address</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.email}
                    </span></>}
                  {(editUserDetails) && <Input
                    label="email address"
                    crossOrigin="true"
                    type="text"
                    value={values.email}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    error={!!touched.email && !!errors.email}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">phone number</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.mobileNo}
                    </span></>}
                  {(editUserDetails) && <Input
                    label="phone number"
                    crossOrigin="true"
                    type="number"
                    value={values.phone}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">date of birth</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.birthDate}
                    </span></>}
                  {(editUserDetails) && <Datepicker
                    asSingle
                    useRange={false}
                    value={values.birthDate}
                    placeholder="Birth Date"
                    onChange={(e) => {
                      setFieldValue("birthDate", e, true);
                    }}
                    inputClassName={
                      !!touched.birthDate && !!errors.birthDate
                        ? "w-full py-2 pt-2.5 text-sm rounded-md border-red-400"
                        : "w-full py-2 pt-2.5 text-sm rounded-md border-grey-200"
                    }
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">gender</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.gender && capitalize(profile?.contact[0]?.gender)}
                    </span></>}
                  {(editUserDetails) && <MSelect
                    placeholder="gender"
                    label="gender"
                    onChange={(choice) =>
                      setFieldValue("gender", choice, true)
                    }
                    value={values.gender}
                    name="gender"
                    onBlur={handleBlur}
                    error={!!touched.gender && !!errors.gender}
                  >
                    {["MALE", "FEMALE"].map((option, index) => (
                      <Option key={index} value={option}>
                        {capitalize(option)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserDetails) && <><span className="sub-header">marital status</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.maritalStatus && capitalize(profile?.contact[0]?.maritalStatus)}
                    </span></>}
                  {(editUserDetails) && <MSelect
                    placeholder="marital status"
                    label="marital status"
                    onChange={(choice) =>
                      setFieldValue("maritalStatus", choice, true)
                    }
                    value={values.maritalStatus}
                    name="maritalStatus"
                    onBlur={handleBlur}
                    error={!!touched.maritalStatus && !!errors.maritalStatus}
                  >
                    {["SINGLE", "MARRIED", "DEVORCED"].map((option, index) => (
                      <Option key={index} value={option}>
                        {capitalize(option)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Identifier Type</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.contact[0]?.idType && capitalizeWords(profile?.contact[0]?.idType)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Identifier no.</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.contact[0]?.idNo}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Identifier exp. date</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.contact[0]?.idExpDate}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Referral Code</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.referralCode}
                  </span>
                </div>
              </div>
            </div>
            <div className="custom-card col-span-2 my-4">
              <div className="relative pb-4 ">
                <span className="text-sm font-bold text-primary">
                  Address Information
                </span>
                <Tooltip
                  content="Edit address information"
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-gray-600 text-xs"
                >
                  <button type="button" onClick={() => toggleEditUserAddress()} className="absolute top-0 right-0 cursor-pointer p-1 text-primary transition duration-300 ease-in-out hover:text-gray-900">
                    <TbEdit />
                  </button>
                </Tooltip>
              </div>
              <div className="grid grid-flow-row grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  {(!editUserAddress) && <><span className="sub-header">address</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.address && profile?.address[0] && profile?.address[0]?.addressLine1}
                    </span></>}
                  {(editUserAddress) && <Input
                    label="address"
                    crossOrigin="true"
                    type="text"
                    value={values.address}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="address"
                    error={!!touched.address && !!errors.address}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserAddress) && <><span className="sub-header">city</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.address && profile?.address[0] && profile?.address[0]?.city}
                    </span></>}
                  {(editUserAddress) && <MSelect
                    placeholder="city"
                    label="city"
                    onChange={(choice) =>
                      setFieldValue("city", choice, true)
                    }
                    value={values.city}
                    name="city"
                    onBlur={handleBlur}
                    error={!!touched.city && !!errors.city}
                  >
                    {City.getCitiesOfState(values?.country!, values?.state!).map((option, index) => (
                      <Option key={index} value={option.name}>
                        {capitalize(option.name)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserAddress) && <><span className="sub-header">state</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.address && profile?.address[0] && profile?.address[0]?.state}
                    </span></>}
                  {(editUserAddress) && <MSelect
                    placeholder="state"
                    label="state"
                    onChange={(choice) =>
                      setFieldValue("state", choice, true)
                    }
                    value={values.state}
                    name="state"
                    onBlur={handleBlur}
                    error={!!touched.state && !!errors.state}
                  >
                    {State.getStatesOfCountry(values?.country).map((option, index) => (
                      <Option key={index} value={option.isoCode}>
                        {capitalize(option.name)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserAddress) && <><span className="sub-header">country</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.address && profile?.address[0] && profile?.address[0]?.country}
                    </span></>}
                  {(editUserAddress) && <MSelect
                    placeholder="country"
                    label="country"
                    onChange={(choice) =>
                      setFieldValue("country", choice, true)
                    }
                    value={values.country}
                    name="country"
                    onBlur={handleBlur}
                    error={!!touched.country && !!errors.country}
                  >
                    {Country.getAllCountries().map((option, index) => (
                      <Option key={index} value={option.isoCode}>
                        {capitalize(option.name)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserAddress) && <><span className="sub-header">post code</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.address && profile?.address[0] && profile?.address[0]?.postCode}
                    </span></>}
                  {(editUserAddress) && <Input
                    label="post code"
                    crossOrigin="true"
                    type="text"
                    value={values.postCode}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="postCode"
                    error={!!touched.postCode && !!errors.postCode}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserAddress) && <><span className="sub-header">address type</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.address && profile?.address[0] && profile?.address[0]?.type && capitalize(profile?.address[0]?.type)}
                    </span></>}
                  {(editUserAddress) && <MSelect
                    placeholder="address type"
                    label="Address Type"
                    onChange={(choice) =>
                      setFieldValue("addressType", choice, true)
                    }
                    value={values.addressType}
                    name="addressType"
                    onBlur={handleBlur}
                    error={!!touched.addressType && !!errors.addressType}
                  >
                    {(Object.keys(Address.type) as Array<
                      keyof typeof Address.type>).map((option, index) => (
                        <Option key={index} value={option}>
                          {capitalize(option)}
                        </Option>
                      ))}
                  </MSelect>}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <div className="mb-1">
            <CardHeader title="Account Information" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="custom-card my-4">
              <div className="relative pb-4 ">
                <span className="text-sm font-bold text-primary">
                  Account Details
                </span>
                {/* <Tooltip */}
                {/*   content="Edit account details" */}
                {/*   placement="right" */}
                {/*   animate={{ */}
                {/*     mount: { scale: 1, y: 0 }, */}
                {/*     unmount: { scale: 0, y: 25 }, */}
                {/*   }} */}
                {/*   className="bg-gray-600 text-xs" */}
                {/* > */}
                {/*   <button type="button" disabled className="absolute top-0 right-0 cursor-pointer p-1 text-primary transition duration-300 ease-in-out hover:text-gray-900"> */}
                {/*     <TbEdit /> */}
                {/*   </button> */}
                {/* </Tooltip> */}
              </div>

              <div className="grid grid-flow-row grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Account no</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.code}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Account status</span>
                  <span className={`text-sm font-bold ${profile?.status == Client.status.ACTIVE ? `text-success font-extrabold` : `text-error`} `}>
                    {profile?.status && capitalize(profile?.status)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Valuation currency</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.valuationCurrency}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">client type</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.clientType && capitalize(profile?.clientType)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">Risk Tolerance</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.contact[0]?.riskTolerance && capitalize(profile?.contact[0]?.riskTolerance)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">investment Objectives</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.contact[0]?.investmentObj && capitalizeWords(profile?.contact[0]?.investmentObj)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="sub-header">investment Experience</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {profile?.contact[0]?.investmentExperience && capitalize(profile?.contact[0]?.investmentExperience)}
                  </span>
                </div>
              </div>
            </div>

            <div className="custom-card my-4">
              <div className="relative pb-4 ">
                <span className="text-sm font-bold text-primary">
                  Contact Information
                </span>
                <Tooltip
                  content="Edit contact information"
                  placement="right"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-gray-600 text-xs"
                >
                  <button type="button" onClick={() => toggleEditUserContact()} className="absolute top-0 right-0 cursor-pointer p-1 text-primary transition duration-300 ease-in-out hover:text-gray-900">
                    <TbEdit />
                  </button>
                </Tooltip>
              </div>
              <div className="grid grid-flow-row grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  {(!editUserContacts) && <><span className="sub-header">address</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.address.addressLine1}
                    </span></>}
                  {(editUserContacts) && <Input
                    label="Contact Address"
                    crossOrigin="true"
                    type="text"
                    value={values.contactAddress}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="contactAddress"
                    error={!!touched.contactAddress && !!errors.contactAddress}
                  />}</div>
                <div className="flex flex-col space-y-1">
                  {(!editUserContacts) && <><span className="sub-header">city</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {values.contactCity}
                    </span></>}
                  {(editUserContacts) && <MSelect
                    placeholder="city"
                    label="city"
                    onChange={(choice) =>
                      setFieldValue("contactCity", choice, true)
                    }
                    value={values.contactCity}
                    name="contactCity"
                    onBlur={handleBlur}
                    error={!!touched.contactCity && !!errors.contactCity}
                  >
                    {City.getCitiesOfState(values?.contactCountry!, values?.contactState!).map((option, index) => (
                      <Option key={index} value={option.name}>
                        {capitalize(option.name)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserContacts) && <><span className="sub-header">state</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {values.contactState}
                    </span></>}
                  {(editUserContacts) && <MSelect
                    placeholder="state"
                    label="state"
                    onChange={(choice) =>
                      setFieldValue("contactState", choice, true)
                    }
                    value={values.contactState}
                    name="contactState"
                    onBlur={handleBlur}
                    error={!!touched.contactState && !!errors.contactState}
                  >
                    {State.getStatesOfCountry(values?.contactCountry).map((option, index) => (
                      <Option key={index} value={option.isoCode}>
                        {capitalize(option.name)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserContacts) && <><span className="sub-header">country</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {values.contactCountry}
                    </span></>}
                  {(editUserContacts) && <MSelect
                    placeholder="country"
                    label="country"
                    onChange={(choice) =>
                      setFieldValue("contactCountry", choice, true)
                    }
                    value={values.contactCountry}
                    name="contactCountry"
                    onBlur={handleBlur}
                    error={!!touched.contactCountry && !!errors.contactCountry}
                  >
                    {Country.getAllCountries().map((option, index) => (
                      <Option key={index} value={option.isoCode}>
                        {capitalize(option.name)}
                      </Option>
                    ))}
                  </MSelect>}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserContacts) && <><span className="sub-header">post code</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.address.postCode}
                    </span></>}
                  {(editUserContacts) && <Input
                    label="post code"
                    crossOrigin="true"
                    type="text"
                    value={values.contactPostCode}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="contactPostCode"
                    error={!!touched.contactPostCode && !!errors.contactPostCode}
                  />}
                </div>
                <div className="flex flex-col space-y-1">
                  {(!editUserContacts) && <><span className="sub-header">address type</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {profile?.contact[0]?.address.type && capitalize(profile?.contact[0]?.address?.type)}
                    </span></>}
                  {(editUserContacts) && <MSelect
                    placeholder="address type"
                    label="Address Type"
                    onChange={(choice) =>
                      setFieldValue("contactAddressType", choice, true)
                    }
                    value={values.contactAddressType}
                    name="contactAddressType"
                    onBlur={handleBlur}
                    error={!!touched.contactAddressType && !!errors.contactAddressType}
                  >
                    {(Object.keys(Address.type) as Array<
                      keyof typeof Address.type>).map((option, index) => (
                        <Option key={index} value={option}>
                          {capitalize(option)}
                        </Option>
                      ))}
                  </MSelect>}
                </div>
              </div>
            </div>
            <button type="submit" ref={updateButtonRef} hidden></button>
          </div>
        </section>
      </form>
      <section className="mt-5">
        <div className="mb-2 flex justify-between">
          <CardHeader title="Kyc Documents" />
          {(editUserDetails || editUserAddress || editUserContacts) && <div className="">
            <button onClick={() => updateButtonRef?.current?.click()} disabled={updatingClient} className="secondary-btn cursor-pointer py-1 px-3 border-primary border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-md text-primary transition duration-300 ease-in-out hover:text-primary">
              <span>Save</span>
            </button>
          </div>}
          {(!editUserDetails && !editUserAddress && !editUserContacts) && <div className="">
            <button onClick={() => {
              showKycDocForm ? setShowKycDocForm(false) : showKycUpdateForm.open ? setShowKycUpdateForm({ open: false, document: null }) : setShowKycDocForm(true)
            }}
              className="secondary-btn cursor-pointer py-1 px-3 border-primary border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-md text-primary transition duration-300 ease-in-out hover:text-primary">
              <span>{(showKycDocForm || showKycUpdateForm.open) ? "Cancel" : "Upload Document"}</span>
            </button>
          </div>}
        </div>
        <div className="grid col-span-5 gap-4">
          <div className="custom-card my-4">
            {showKycDocForm ? <KycForm setShowKycDocForm={setShowKycDocForm} contact={profile?.contact ? profile?.contact : []} clientId={user?.clientId!} />
              : showKycUpdateForm.open ? <UpdateKycForm contact={profile?.contact ? profile.contact : []} document={showKycUpdateForm.document!} /> : <KycDocs clientId={user?.clientId!} isActive={profile?.status == Client.status.ACTIVE} setKycUpdate={setShowKycUpdateForm} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
