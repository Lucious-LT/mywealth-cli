import { Select, Option, Input, Textarea, Button } from '@material-tailwind/react'
import { FormikHelpers, FormikValues, useFormik } from 'formik'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import * as yup from "yup"
import { Contact, KycDocument } from '~/server/api/models/crm'
import { api } from '~/utils/api'
import { capitalize } from '~/utils/format'
import customToast from '../custom-toast'
import { pdfjs } from 'react-pdf';
import { MoneyMarketTransactionRequest } from '~/server/api/models/investing'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

type Props = {
  contact: Contact[]
  clientId: string
  setShowKycDocForm: Dispatch<SetStateAction<boolean>>
}

interface KycValues {
  recordType: string,
  contact: string,
  idType: string,
  idNo: string,
  idExpDate: DateValueType,
  idIssuer: string,
  notes: string,
  file: any,
}

const kycForm = ({ contact, clientId, setShowKycDocForm }: Props) => {
  const [preview, setPreview] = React.useState<{ type: "image" | "pdf", src: string } | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const fileRef = useRef(null)
  const utils = api.useUtils();

  const reader = new FileReader();

  function isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image';
  }

  function isFilePdf(file: File) {
    return file && file['type'].split('/')[1] === 'pdf';
  }

  const MAX_FILE_SIZE = 1024000; //2MB

  const validFileExtensions = ['jpg', 'png', 'jpeg', 'pdf'];

  function isValidFileType(fileName: string) {
    return fileName && validFileExtensions.indexOf(fileName.split('.').pop()!) > -1;
  }

  const initialKycValues = {
    recordType: "",
    contact: "",
    idType: "",
    idNo: "",
    idExpDate: {
      startDate: "",
      endDate: ""
    } as DateValueType,
    idIssuer: "",
    notes: "",
    file: undefined,
  }

  const validateKycSchema = yup.object().shape({
    recordType: yup.string().required("required"),
    contact: yup.string(),
    idType: yup.string(),
    idNo: yup.string(),
    idExpDate: yup.object().shape({
      startDate: yup.string().nullable()
        .when("recordType", ([recordType], schema) =>
          recordType == KycDocument.recordType.IDENTITY
            ? schema.required("Required")
            : schema.notRequired()
        ),
      endDate: yup.string().nullable()
    }),
    idIssuer: yup.string().required("required")
      .when("recordType", ([recordType], schema) =>
        recordType == KycDocument.recordType.IDENTITY
          ? schema.required("Required")
          : schema.notRequired()
      ),
    notes: yup.string(),
    file: yup.mixed()
      .required("Required")
      .test("is-valid-type", "Not a valid image type",
        // @ts-ignore
        (value) => isValidFileType(value && value.name.toLowerCase())!)
      .test("is-valid-size", "Max allowed size is 1MB",
        // @ts-ignore
        (value) => value && value.size <= MAX_FILE_SIZE)
  })

  const handleKycSubmit = ({
    idType,
    recordType,
    idNo,
    idIssuer,
    idExpDate,
    notes,
    contact,
    file: {
      name: fileName,
      size: fileSize,
      type: fileType
    }
  }: FormikValues, { resetForm }: FormikHelpers<KycValues>) => {
    if (values.recordType === KycDocument.recordType.IDENTITY && values.idExpDate?.startDate == "") return
    uploadKycDocument({
      clientId,
      idType,
      recordType,
      idNo: String(idNo),
      fileContent: preview?.src?.split(",")[1],
      contactId: contact,
      idIssuer,
      idExpDate: idExpDate.startDate,
      fileType,
      fileName,
      fileSize,
      notes,
    }, {
      onSuccess: () => {
        utils.profile.getKycDocumentsForClient.invalidate()
        customToast({
          title: "Kyc Document Upload",
          message: "Upload successful",
          variant: "success"
        })
        resetForm()
        setShowKycDocForm(false)
        // @ts-ignore
        fileRef.current.value = "";
        setPreview(null);
      },
      onError: (error) => customToast({
        title: "Kyc Document Upload",
        message: error.message,
        variant: "error"
      }),
    });
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialKycValues,
    validationSchema: validateKycSchema,
    onSubmit: handleKycSubmit
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return
    const file = e.currentTarget.files[0];
    setFieldValue("file", file);
    if (file != null) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(isFileImage(file) ? { type: "image", src: reader?.result as string } : isFilePdf(file) ? { type: "pdf", src: reader?.result as string } : null);
      };
    }
  }

  const { mutate: uploadKycDocument, isLoading: uploadingKycDoc } = api.profile.createKycDocument.useMutation()

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 w-full gap-5'>
          <div className='grid grid-cols-2 gap-6'>
            <div className=''>
              <Select
                placeholder="Record Type"
                label="Record Type"
                onChange={(choice) =>
                  setFieldValue("recordType", choice, true)
                }
                value={values.recordType}
                name="recordType"
                onBlur={handleBlur}
                error={!!touched.recordType && !!errors.recordType}
              >
                {(Object.keys(KycDocument.recordType) as Array<
                  keyof typeof KycDocument.recordType>).map((option, index) => (
                    <Option key={index} value={option}>
                      {capitalize(option)}
                    </Option>
                  ))}
              </Select>
              <span className="text-xs text-red-400">
                {touched.recordType && errors.recordType}
              </span>
            </div>
            <div className=''>
              <Select
                placeholder="Contact"
                label="Contact"
                onChange={(choice) =>
                  setFieldValue("contact", choice, true)
                }
                value={values.contact}
                name="contact"
                onBlur={handleBlur}
                error={!!touched.contact && !!errors.contact}
              >
                {contact.map((option, index) => (
                  <Option key={index} value={option.id}>
                    {capitalize(option.label)}
                  </Option>
                ))}
              </Select>
              <span className="text-xs text-red-400">
                {touched.contact && errors.contact}
              </span>
            </div>
            <div className=''>
              <Select
                placeholder="ID Type"
                label="ID Type"
                onChange={(choice) =>
                  setFieldValue("idType", choice, true)
                }
                value={values.idType}
                name="idType"
                onBlur={handleBlur}
                error={!!touched.idType && !!errors.idType}
              >
                {(Object.keys(KycDocument.idType) as Array<
                  keyof typeof KycDocument.idType>).map((option, index) => (
                    <Option key={index} value={option}>
                      {capitalize(option.replaceAll("_", " "))}
                    </Option>
                  ))}
              </Select>
              <span className="text-xs text-red-400">
                {touched.idType && errors.idType}
              </span>
            </div>
            <div>
              <Input
                label="ID No."
                crossOrigin="true"
                type="number"
                value={values.idNo}
                className="outline-none focus:ring-0 focus:ring-offset-0"
                onChange={handleChange}
                onBlur={handleBlur}
                name="idNo"
                error={!!touched.idNo && !!errors.idNo}
              />
              <span className="text-xs text-red-400">
                {touched.idNo && errors.idNo}
              </span>
            </div>
            <div>
              <Datepicker
                asSingle
                useRange={false}
                value={values.idExpDate}
                placeholder="ID Expiration Date"
                onChange={(e) => {
                  setFieldValue("idExpDate", e, true);
                }}
                inputClassName={
                  !!touched.idExpDate && values.recordType === KycDocument.recordType.IDENTITY && values.idExpDate?.startDate == ""
                    ? "w-full py-2 pt-2.5 text-sm rounded-md border-red-400"
                    : "w-full py-2 pt-2.5 text-sm rounded-md border-grey-200"
                }
              />
              <span className="text-xs text-red-400">
                {/* @ts-ignore */}
                {touched.idExpDate && values.recordType === KycDocument.recordType.IDENTITY && values.idExpDate?.startDate == "" && "Required"}
              </span>
            </div>
            <div>
              <Input
                label="ID Issuer"
                crossOrigin="true"
                type="text"
                value={values.idIssuer}
                className="outline-none focus:ring-0 focus:ring-offset-0"
                onChange={handleChange}
                onBlur={handleBlur}
                name="idIssuer"
                error={!!touched.idIssuer && !!errors.idIssuer}
              />
              <span className="text-xs text-red-400">
                {touched.idIssuer && errors.idIssuer}
              </span>
            </div>
            <div className='col-span-2'>
              <Textarea
                label='notes'
                className=' focus:ring-0'
                name='notes'
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.notes && !!errors.notes}
              />
            </div>
          </div>
          <div className='relative'>
            <div className='h-[83.5%]'>
              <Input
                crossOrigin="true"
                label='SelectOption a file'
                type="file"
                name='file'
                value={undefined}
                inputRef={fileRef}
                accept='image/png, image/jpg, image/jpeg, application/pdf'
                onChange={handleFileChange}
                onBlur={handleBlur}
                error={!!touched.file && !!errors.file}
              />
              <span className="text-xs text-red-400">
                {touched.file && errors.file}
              </span>
              <div className={`mt-2 ${preview?.type == "pdf" ? ` w-[80%] flex justify-center items-center` : `h-[330px]`}`}>
                {preview?.type == "image" ? <img src={preview.src} className='object-fill h-full w-[82%] rounded-md' alt="Preview" /> : preview?.type == "pdf" ? <Document file={preview.src} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} height={320} renderTextLayer={false} renderMode="canvas" renderAnnotationLayer={false} />
                </Document> : ""}
              </div>
            </div>
            <Button
              className='secondary-btn cursor-pointer py-1 px-3 border-primary border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-md text-primary transition duration-300 ease-in-out hover:text-primary float-right clear-left'
              placeholder=""
              disabled={uploadingKycDoc}
              type='submit'
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default kycForm
