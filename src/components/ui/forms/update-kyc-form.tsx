import { Select, Option, Input, Textarea, Button } from '@material-tailwind/react'
import { FormikValues, useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import * as yup from "yup"
import { Contact, KycDocument } from '~/server/api/models/crm'
import { api } from '~/utils/api'
import { capitalize } from '~/utils/format'
import customToast from '../custom-toast'
import { LoadingSpinner } from '../spinner'

type Props = {
  contact: Contact[]
  document: KycDocument
}


const UpdateKycForm = ({ contact, document }: Props) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null)
  const utils = api.useUtils();

  const reader = new FileReader();

  function isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image';
  }

  function isUrlPdf(url?: string) {
    return url && url.split('.').pop() === 'pdf';
  }

  function isFilePdf(file: File) {
    return file && file['type'].split('/')[1] === 'pdf';
  }

  const MAX_FILE_SIZE = 2048000; //2MB

  const validFileExtensions = ['jpg', 'png', 'jpeg', 'pdf'];

  function isValidFileType(fileName: string) {
    return fileName && validFileExtensions.indexOf(fileName.split('.').pop()!) > -1;
  }

  const { clientId, recordType, fileUrl: url, fileName: oldFileName, fileType: oldFileType, fileSize: oldFileSize, contactId, idType, id: documentId, idNo, idExpDate, idIssuer, notes } = document || {};
  const [isImage, setIsImage] = useState<boolean>(!isUrlPdf(url) as boolean)

  const initialKycValues = {
    recordType: recordType ?? "",
    contact: contactId ?? "",
    idType: idType ?? "",
    idNo: idNo ?? "",
    idExpDate: {
      startDate: idExpDate ?? "",
      endDate: idExpDate ?? ""
    } as DateValueType,
    idIssuer: idIssuer ?? "",
    notes: notes ?? "",
    file: undefined,
  }
  console.log(idExpDate)
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
    file: yup
      .mixed()
      .test("validate-file", "File validation error", function(value) {
        if (value === undefined) return true; // Skip validation if value is undefined
        // @ts-ignore
        if (!isValidFileType(value && value.name.toLowerCase())) {
          throw this.createError({
            path: `${this.path}`,
            message: "Not a valid image type"
          });
        }
        // @ts-ignore
        if (value.size > MAX_FILE_SIZE) {
          throw this.createError({
            path: `${this.path}`,
            message: "Max allowed size is 2MB"
          });
        }

        return true;
      })
  })

  const handleKycSubmit = (values: FormikValues) => {
    if (values.recordType === KycDocument.recordType.IDENTITY && values.idExpDate?.startDate == "") return
    const {
      idType,
      recordType,
      idNo,
      idIssuer,
      idExpDate,
      notes,
      contact,
    } = values
    const {
      name: fileName,
      size: fileSize,
      type: fileType
    } = values.file || {}

    updateKycDocument({
      documentId,
      requestBody: {
        clientId: clientId ?? "",
        idType,
        recordType,
        idNo: String(idNo),
        fileContent: preview?.split(",")[1],
        contactId: contact,
        idIssuer,
        idExpDate: idExpDate.startDate,
        fileName: fileName ?? oldFileName,
        fileType: fileType ?? oldFileType,
        fileSize: fileSize ?? oldFileSize,
        notes,
      }
    }, {
      onSuccess: () => {
        utils.profile.getKycDocumentsForClient.invalidate()
        customToast({
          title: "Kyc Document Update",
          message: "Update successful",
          variant: "success"
        })
      },
      onError: (error) => customToast({
        title: "Kyc Document Update",
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
    enableReinitialize: true,
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
        setIsImage(isFileImage(file))
        setPreview((isFileImage(file) || isFilePdf(file)) ? reader?.result as string : "");
      };
    }
  }

  const { mutate: updateKycDocument, isLoading: updatingKycDoc } = api.profile.updateKycDocument.useMutation()
  const { isLoading } = api.profile.loadKycDocument.useQuery({ url: url! }, {
    onSuccess(data) {
      setPreview(data)
    },
    refetchOnWindowFocus: false
  })


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
              <div className={`${(!preview || !isImage) && `flex items-center justify-center`} mt-2 h-[330px]`}>
                {(isImage && !isLoading && preview) ? <img src={preview ?? ""} className='object-fill h-full w-[82%] rounded-md' alt="Preview" /> : (!isImage && !isLoading && preview) ? <Document file={preview}>
                  <Page pageNumber={1} height={320} renderTextLayer={false} renderMode="canvas" renderAnnotationLayer={false} />
                </Document> : <LoadingSpinner size='lg' />}
              </div>
            </div>
            <Button
              className='secondary-btn cursor-pointer py-1 px-3 border-primary border-[1px] hover:bg-transparent disabled:bg-gray-200 disabled:cursor-auto disabled:text-black disabled:border-transparent rounded-md text-primary transition duration-300 ease-in-out hover:text-primary float-right clear-left'
              placeholder=""
              disabled={updatingKycDoc}
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

export default UpdateKycForm;
