import React from 'react'
import { Option, Select as MSelect } from '@material-tailwind/react'
import { FieldConfig, useField } from 'formik'
import { capitalize } from '~/utils/format'
import { ICity, ICountry, IState } from 'country-state-city'
import { PickListItem, PickListItemValue } from '~/server/api/models/administration'

interface Props extends FieldConfig {
  label: string
  options: (string | ICountry | IState | ICity)[] | PickListItem[] | PickListItemValue[]
}

function isArrayString(array: any[]): boolean {
  return array?.every(item => typeof item === 'string');
}

function isPickList(array: any[]): boolean {
  return array?.every((item: any) => Object.hasOwn(item, "pickListItemValues"));
}

function isCountryOrState(array: any[]): array is ICountry[] {
  return array?.every((item: any) => Object.hasOwn(item, "isoCode"));
}

function isArrayCity(array: any[]): array is ICity[] {
  return array?.every((item: any) => Object.hasOwn(item, "stateCode"));
}



const SelectOption = ({ options, label, ...props }: Props) => {
  // @ts-ignore
  const [field, meta, helpers] = useField(props)
  
  
  return (
    <div className='grid-cols-1'>
      {/* @ts-ignore */}
      <MSelect
        label={label}
        {...field}
        {...props}
        onChange={(value) => helpers.setValue(value as string)}
        error={!!meta.touched && !!meta.error}
      >
        {isCountryOrState(options) ? options?.map((option, index) => (
          <Option key={index} value={option?.isoCode}>
            {option?.name}
          </Option>
        )) : isArrayCity(options) ? options?.map((option, index) => (
          <Option key={index} value={option?.name}>
            {option?.name}
          </Option>
        )) : isArrayString(options) ? options?.map((option, index) => (
          // @ts-ignore
          <Option key={index} value={option}>{capitalize(option?.replaceAll("_", " "))}</Option>
        )) : isPickList(options) ? options?.map((option, index) => (
          // @ts-ignore
          <Option key={index} value={option?.label}>{option?.label}</Option>
        )) : options?.map((option, index) => (
          // @ts-ignore
          <Option key={index} value={option?.label}>{option?.label}</Option>
        ))}
      </MSelect>
      <span className="text-xs text-red-400">
        {meta.touched && meta.error}
      </span>
    </div>
  )
}

export default SelectOption
