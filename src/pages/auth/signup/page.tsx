/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */
import * as yup from "yup";
import { Suspense } from "react";
import { FormikContext, type FormikValues } from "formik";
import React, { useState } from "react";
import CardHeader from "~/components/layout/card-header";
import { api } from "~/utils/api";
import { type z } from "zod";
import { type SignUpRequestSchema } from "~/server/api/routers/crm";
import {
  Address,
  ClientRequest,
  ContactRequest,
} from "~/server/api/models/crm";
import MultiStepForm, { FormStep } from "~/components/formik/multistep";
import SelectOption from "~/components/formik/select-option";
import InputField from "~/components/formik/input-field";
import { City, Country, State } from "country-state-city";
import DatePicker from "~/components/formik/date-picker";
import { toast } from "react-hot-toast";
import { type DateValueType } from "react-tailwindcss-datepicker";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import Modal from "~/components/navigation/modal";
import { BsCheckCircleFill } from "react-icons/bs";
import { getTenantId } from "~/components/util/tenant";
import VerificationInput from "react-verification-input";
import customToast from "~/components/ui/custom-toast";
import { useRouter } from "next/router";
import SignupDetails from "~/components/formik/signup-details";

type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

const SignUpPage = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [show, setShow] = useState<boolean>(false);
  const [details, setDetails] = useState<{ show: boolean; values: any | null }>(
    { show: false, values: null }
  );
  const { mutate: convertLeadToClient } =
    api.crm.convertLeadToClient.useMutation();
  const { mutate: validateSignUpRequest } =
    api.crm.validateSignUpRequest.useMutation();
  const { mutate: verifyEmailToken } = api.crm.verifyEmailToken.useMutation();

  const router = useRouter();

  const handleTokenVerification = (values: FormikValues, next: any) => {
    const { email } = values;
    if (token == undefined) return;

    verifyEmailToken(
      {
        token: String(token),
        email: String(email),
        tenant: getTenantId(),
      },
      {
        onSuccess(data) {
          if (!data) {
            toast.error("Invalid token");
            return;
          }
          next(values);
        },
        onError(error) {
          toast.error(error.message);
          return;
        },
      }
    );
  };

  const handleTokenResend = (values: FormikValues) => {
    const {
      firstName,
      lastName,
      companyName,
      mobileNo,
      officeNo,
      email,
      clientType,
      password,
    } = values;
    const signUpRequest: SignUpRequest = {
      tenant: getTenantId(),
      firstName: String(firstName),
      lastName: String(lastName),
      organization: String(
        companyName ? companyName : `${String(firstName)} ${String(lastName)}`
      ),
      mobileNo: String(mobileNo),
      officeNo: officeNo != "" ? String(officeNo) : String(mobileNo),
      email: String(email),
      password: String(password),
      clientType: clientType as ClientRequest.clientType,
    };

    validateSignUpRequest(signUpRequest, {
      onSuccess: (data) =>
        data
          ? toast.success("Check your email for verification token!")
          : toast.error("Something went wrong, pls try again!"),
    });
  };

  const handleProfileSubmission = (values: FormikValues, next: any) => {
    const {
      firstName,
      lastName,
      companyName,
      mobileNo,
      officeNo,
      email,
      clientType,
      password,
    } = values;
    const signUpRequest: SignUpRequest = {
      tenant: getTenantId(),
      firstName: String(firstName),
      lastName: String(lastName),
      organization: String(
        companyName ? companyName : `${String(firstName)} ${String(lastName)}`
      ),
      mobileNo: String(mobileNo),
      officeNo: officeNo != "" ? String(officeNo) : String(mobileNo),
      email: String(email),
      password: String(password),
      clientType: clientType as ClientRequest.clientType,
    };

    validateSignUpRequest(signUpRequest, {
      onSuccess(data) {
        if (!data.value) {
          toast.error("An error occurred when sending the verification email");
          return;
        }
        next(values);
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  const createClientAccount = (values: FormikValues) => {
    const contactAddress = {
      id: undefined,
      addressLine1: values?.addressLine1,
      addressLine2: values?.addressLine2 ?? "",
      country: values?.country,
      state: values?.state,
      city: values?.city,
      postCode: values?.postCode,
      type: Address.type.PRIMARY,
    };

    const contact: ContactRequest = {
      address: contactAddress,
      annualIncomeRange:
        values.annualIncomeRange ??
        ContactRequest.annualIncomeRange.LESS_THAN_1B,
      birthDate: values?.birthDate?.startDate,
      criminalConviction: values.criminalConviction ?? false,
      email: values?.email,
      employerAddress: values.employerAddress,
      employerName: values.employerName,
      finIdNo: values?.finIdNo ?? "",
      firstName: values?.firstName,
      gender: values?.gender,
      grantLoginAccess: true,
      id: undefined,
      idExpDate: values?.idExpDate?.startDate as string,
      idNo: values?.idNo,
      idType: values?.idType,
      investmentExperience: values.investmentExperience,
      investmentObj: values?.investmentObj,
      label: `${values.firstName} ${values.lastName}`,
      lastName: values?.lastName,
      maritalStatus: values?.maritalStatus,
      middleName: values?.middleName,
      mobileNo: String(values?.mobileNo),
      moneyLaunderingRisk: values.moneyLaunderingRisk ?? false,
      nationality: values?.nationality,
      networthLiquidRange:
        values?.networthLiquidRange ??
        ContactRequest.networthLiquidRange.LESS_THAN_1B,
      networthTotalRange:
        values?.networthTotalRange ??
        ContactRequest.networthTotalRange.LESS_THAN_1B,
      notes: values?.notes ?? "",
      officeNo: values?.officeNo != "" ? values?.officeNo : values?.mobileNo,
      politicallyExposed: values?.politicallyExposed ?? false,
      profession: values?.profession,
      refCode: undefined,
      riskTolerance:
        values?.riskTolerance ?? ContactRequest.riskTolerance.MODERATE,
      role:
        values.clientType == ClientRequest.clientType.CORPORATE
          ? ContactRequest.role.BENEFICIAL_OWNER
          : ContactRequest.role.INDV_OWNER,
      sourceOfWealth:
        values.sourceOfWealth ?? ContactRequest.sourceOfWealth.OTHER_SOURCES,
      title: values?.title,
      username: undefined,
    };

    convertLeadToClient(
      { tenantId: getTenantId(), contact: contact },
      {
        onSuccess(data) {
          if (!data) {
            toast.error(
              "An error occurred when converting the lead to a client"
            );
            return;
          }
          customToast({
            title: "Account Creation",
            message:
              "Account created successfully, check your email for further instructions",
            variant: "success",
          });
          router.push("/auth/signin");
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  const initialClientValues = {
    clientType: "",
    firstName: "",
    lastName: "",
    companyName: "",
    mobileNo: "",
    officeNo: "",
    email: "",
    password: "",
    addressLine1: "",
    addressLIne2: "",
    country: "",
    state: "",
    city: "",
    postCode: "",
    // addressType: "",
    maritalStatus: "",
    gender: "",
    title: "",
    birthDate: {
      startDate: "",
      endDate: "",
    } as DateValueType,
    idType: null,
    idNo: null,
    idExpDate: {
      startDate: "",
      endDate: "",
    } as DateValueType,
    profession: null,
    nationality: null,
    totalNetworthRange: null,
    annualIncomeRange: null,
    liquidNetworthRange: null,
    sourceOfWealth: null,
    investmentExperience: null,
    riskTolerance: null,
    investmentObj: null,
    employerName: null,
    employerAddress: null,
    finIdNo: null,
  };

  const ValidateLeadSchema = yup.object().shape({
    clientType: yup.string().required("Required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    companyName: yup
      .string()
      .when("clientType", ([clientType], schema) =>
        clientType == "CORPORATE"
          ? schema.required("Required")
          : schema.notRequired()
      ),
    mobileNo: yup
      .string()
      .matches(/^\+\d{2,3}\d{10,15}$/, {
        message: "Invalid phone number format",
      })
      .required("Required"),
    officeNo: yup
      .string()
      .nullable()
      .matches(/^\+\d{2,3}\d{10,15}$/, {
        message: "Invalid phone number format.",
      })
      .notRequired(),
    email: yup.string().email().required("Required"),
    password: yup.string().required("Required"),
  });

  const ValidateAddressSchema = yup.object().shape({
    addressLine1: yup.string().required("Required"),
    addressLIne2: yup.string().notRequired(),
    country: yup.string().required("Required"), //todo has to match the values used in the back office
    state: yup.string().required("Required"), //todo has to match the values used in the back office
    city: yup.string().required("Required"), //todo has to match the values used in the back office
    postCode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Must be a valid postal code")
      .required("Required"),
    // addressType: yup.string().required("Required")
  });

  const ValidateContactSchema = yup.object().shape({
    maritalStatus: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    title: yup.string().required("Required"),
    birthDate: yup.object().shape({
      startDate: yup.string().required("Required"),
      endDate: yup.string().required("Required"),
    }),
    idType: yup.string().required("Required"),
    idNo: yup.string().required("Required"),
    idExpDate: yup.object().shape({
      startDate: yup.string().required("Required"),
      endDate: yup.string().required("Required"),
    }),
    profession: yup.string(),
    nationality: yup.string(), //todo make this a drop down so that it matches the back office
    totalNetworthRange: yup.string().notRequired(),
    annualIncomeRange: yup.string().notRequired(),
    liquidNetworthRange: yup.string().notRequired(),
    sourceOfWealth: yup.string().notRequired(),
    investmentExperience: yup.string().notRequired(),
    riskTolerance: yup.string().notRequired(),
    investmentObj: yup.string().notRequired(),
    employerName: yup.string().notRequired(),
    employerAddress: yup.string().notRequired(),
    finIdNo: yup.string().notRequired(),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={`flex ${
          !details.show && `items-center overflow-hidden`
        } h-screen justify-center font-nun`}
      >
        <Modal
          open={confirm}
          size="md"
          handler={() => setConfirm(!confirm)}
          title="Create Account"
        >
          <div className="flex flex-col items-center justify-center">
            <BsCheckCircleFill className="text-5xl font-bold text-success" />
            <span className="text-5xl font-bold">Success</span>
            <div className="text-center text-sm leading-5 tracking-wide">
              Your Account has been created successfully
            </div>
          </div>
        </Modal>
        {!details.show ? (
          <>
            <div className="flex h-full w-2/5 flex-col justify-center bg-[#1E293B] p-24 text-white ">
              <CardHeader title="Open an account" />
              <section className="mb-4 text-justify text-base font-[200] leading-7 2xl:leading-9">
                You will have to provide information based on the selected
                client type:
                <ul className="mt-3">
                  <li>
                    <strong className="font-extrabold">Individual: </strong>
                    Requires a beneficial owner and other contacts with a role
                    of next of kin or other.
                  </li>
                  <li>
                    <strong className="font-extrabold">Corporate: </strong>
                    Requires at least 1 beneficial owner and other contacts with
                    roles of corporate director, next of kin, or other.
                  </li>
                  <li>
                    <strong className="font-extrabold">Joint: </strong>Requires
                    the primary and secondary beneficiaries and other contacts
                    with a role of next of kin or other.
                  </li>
                  <li>
                    <strong className="font-extrabold">Trust: </strong>Requires
                    the beneficial owner and other contacts with roles of trust
                    administrator, next of kin, or other.
                  </li>
                </ul>
                <div className="mt-3">
                  The client profile must contain a valid email address, a valid
                  phone number, and at least 1 address designated as the primary
                  address.
                </div>
                <div className="mt-3">
                  Once the client profile is created and approved, you can use
                  this portal to submit your KYC documents for processing.
                </div>
              </section>
            </div>
            <div className="flex w-3/5 flex-col items-center p-24 font-nun">
              <MultiStepForm
                initialValues={initialClientValues}
                details={details}
                onSubmit={(values: FormikValues) => {
                  setDetails({ values: values, show: true });
                }}
              >
                <FormStep
                  stepName="Profile"
                  onSubmit={(values: FormikValues, next: any) =>
                    handleProfileSubmission(values, next)
                  }
                  validationSchema={ValidateLeadSchema}
                >
                  <SelectOption
                    label="Client Type"
                    name="clientType"
                    options={
                      Object.keys(ClientRequest.clientType) as Array<
                        keyof typeof ClientRequest.clientType
                      >
                    }
                  />
                  <InputField name="firstName" label="First Name" />
                  <InputField name="lastName" label="Last Name" />
                  <FormikContext.Consumer>
                    {({ values }) => (
                      <>
                        {values.clientType ==
                          ClientRequest.clientType.CORPORATE && (
                          <InputField name="companyName" label="Company Name" />
                        )}
                      </>
                    )}
                  </FormikContext.Consumer>
                  <InputField
                    name="mobileNo"
                    label="Mobile Number"
                    placeholder="+2348000000000"
                  />
                  <InputField
                    name="officeNo"
                    label="Office Number"
                    placeholder="+2348000000000"
                  />
                  <InputField name="email" label="Email" />
                  <InputField
                    name="password"
                    label="Password"
                    icon={
                      show ? (
                        <FaEyeSlash
                          className="cursor-pointer"
                          onClick={() => setShow(false)}
                        />
                      ) : (
                        <IoEyeSharp
                          className="cursor-pointer"
                          onClick={() => setShow(true)}
                        />
                      )
                    }
                    type={show ? "text" : "password"}
                  />
                </FormStep>
                <FormStep
                  stepName="Verify Token"
                  onSubmit={(values: FormikValues, next: any) =>
                    handleTokenVerification(values, next)
                  }
                >
                  <FormikContext.Consumer>
                    {({ values }) => (
                      <div className="col-span-3 flex flex-col items-center justify-center">
                        {/*https://www.npmjs.com/package/react-verification-input*/}
                        <div className="mb-4">
                          Enter the code that we sent to your email
                        </div>
                        <VerificationInput
                          validChars="0-9"
                          inputProps={{ inputMode: "numeric" }}
                          autoFocus={true}
                          onComplete={setToken}
                        />
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div className="mt-4 justify-center font-bold">
                          Didn't get the email?
                        </div>
                        <div className="mt-4">
                          Check your spam folder or{" "}
                          <span
                            onClick={() => handleTokenResend(values)}
                            className="cursor-pointer text-primary"
                          >
                            request another code
                          </span>
                        </div>
                      </div>
                    )}
                  </FormikContext.Consumer>
                </FormStep>
                <FormStep
                  stepName="Address"
                  validationSchema={ValidateAddressSchema}
                >
                  <InputField name="addressLine1" label="Address Line 1*" />
                  <InputField name="addressLIne2" label="Address Line 2" />

                  <SelectOption
                    label="Country*"
                    name="country"
                    options={Country.getAllCountries()}
                  />
                  <FormikContext.Consumer>
                    {({ values }) => (
                      <>
                        <SelectOption
                          label="State*"
                          name="state"
                          options={State.getStatesOfCountry(
                            String(values.country)
                          )}
                          value={values.state}
                        />
                        <SelectOption
                          label="City*"
                          name="city"
                          options={City.getCitiesOfState(
                            String(values.country),
                            String(values.state)
                          )}
                          value={values.city}
                        />
                      </>
                    )}
                  </FormikContext.Consumer>
                  <InputField name="postCode" label="Post Code*" />
                </FormStep>
                <FormStep
                  stepName="Bio Data"
                  validationSchema={ValidateContactSchema}
                >
                  <SelectOption
                    label="Title"
                    name="title"
                    options={
                      Object.keys(ContactRequest.title) as Array<
                        keyof typeof ContactRequest.title
                      >
                    }
                  />
                  <SelectOption
                    label="Gender"
                    name="gender"
                    options={
                      Object.keys(ContactRequest.gender) as Array<
                        keyof typeof ContactRequest.gender
                      >
                    }
                  />
                  <SelectOption
                    label="Marital Status"
                    name="maritalStatus"
                    options={
                      Object.keys(ContactRequest.maritalStatus) as Array<
                        keyof typeof ContactRequest.maritalStatus
                      >
                    }
                  />
                  <DatePicker
                    name="birthDate"
                    placeholder="Date Of Birth"
                    label="Date of Birth"
                  />
                  <SelectOption
                    label="Type of ID"
                    name="idType"
                    options={
                      Object.keys(ContactRequest.idType) as Array<
                        keyof typeof ContactRequest.idType
                      >
                    }
                  />
                  <InputField name="idNo" label="ID Number" />
                  <DatePicker
                    name="idExpDate"
                    placeholder="ID Expiration date"
                    label="ID Expiration Date"
                  />
                  <InputField name="profession" label="Profession" />
                  <InputField name="employerName" label="Employer Name" />
                  <InputField name="employerAddress" label="Employer Address" />
                  <SelectOption
                    label="Nationality*"
                    name="nationality"
                    options={Country.getAllCountries()}
                  />
                  <InputField name="finIdNo" label="Finance ID Number (BVN)" />
                  <SelectOption
                    label="Total Networth Range"
                    name="totalNetworthRange"
                    options={
                      Object.keys(ContactRequest.networthTotalRange) as Array<
                        keyof typeof ContactRequest.networthTotalRange
                      >
                    }
                  />
                  <SelectOption
                    label="Annual Income Range"
                    name="annualIncomeRange"
                    options={
                      Object.keys(ContactRequest.annualIncomeRange) as Array<
                        keyof typeof ContactRequest.annualIncomeRange
                      >
                    }
                  />
                  <SelectOption
                    label="Liquid Networth Range"
                    name="liquidNetworthRange"
                    options={
                      Object.keys(ContactRequest.networthLiquidRange) as Array<
                        keyof typeof ContactRequest.networthLiquidRange
                      >
                    }
                  />
                  <SelectOption
                    label="Source Of Wealth"
                    name="sourceOfWealth"
                    options={
                      Object.keys(ContactRequest.sourceOfWealth) as Array<
                        keyof typeof ContactRequest.sourceOfWealth
                      >
                    }
                  />
                  <SelectOption
                    label="Investment Experience"
                    name="investmentExperience"
                    options={
                      Object.keys(ContactRequest.investmentExperience) as Array<
                        keyof typeof ContactRequest.investmentExperience
                      >
                    }
                  />
                  <SelectOption
                    label="Risk Tolerance"
                    name="riskTolerance"
                    options={
                      Object.keys(ContactRequest.riskTolerance) as Array<
                        keyof typeof ContactRequest.riskTolerance
                      >
                    }
                  />
                  <SelectOption
                    label="Investment Objectives"
                    name="investmentObj"
                    options={
                      Object.keys(ContactRequest.investmentObj) as Array<
                        keyof typeof ContactRequest.investmentObj
                      >
                    }
                  />
                </FormStep>
              </MultiStepForm>
            </div>
          </>
        ) : (
          <>
            <SignupDetails
              values={details.values}
              setDetails={setDetails}
              onSubmit={createClientAccount}
            />
          </>
        )}
      </div>
    </Suspense>
  );
};
export default SignUpPage;
