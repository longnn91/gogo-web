import { ENV } from "@/constants/app.const";
import axios, { AxiosResponse } from "axios";
// import { getSession } from "next-auth/react";

const apiBaseUrl = ENV.API_URI as string;

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const TIMEOUT = 5 * 60 * 1000; // 5 minutes

const axiosRequest = (props?: {
  headerOptions?: any;
  onDownloadProgress?: (progressEvent: any) => void;
}) => {
  const { headerOptions, onDownloadProgress } = props || {};
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
    onDownloadProgress,
  });

  // @ts-ignore
  axiosInstance.interceptors.request.use(async (request) => {
    // const session = await getSession();
    // const token = session?.backendTokens?.accessToken;

    // @ts-ignore
    request.headers = {
      ...request.headers,
      ...headerOptions,
    };

    // if (token) {
    //   request.headers.Authorization = `Bearer ${token}`;
    // }

    return request;
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    async (error: any) => {
      const { data } = error?.response || {};

      return Promise.reject(data);
    }
  );
  return axiosInstance;
};

export { axiosRequest };
