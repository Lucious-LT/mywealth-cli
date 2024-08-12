/* eslint-disable */
import { type AxiosError } from "axios";
import { type AppMessage } from "~/server/api/models/investing";
import { type ApiError } from "~/server/api/models/investing";
import { getApiErrorMessage } from "~/server/api/routers/util";

const isApiError = (error: ApiError | AxiosError): error is ApiError => {
  return (<ApiError>error).body !== undefined;
};

const isAxiosError = (error: ApiError | AxiosError): error is AxiosError => {
  return <AxiosError>error !== undefined;
};

export const analyzeError = (error: ApiError | AxiosError | any): AppMessage | undefined => {
  if (isApiError(error)) {
    return error.body as AppMessage;
  } else if (isAxiosError(error)) {
    return getApiErrorMessage(error);
  } else {
    return error;
  }
};
