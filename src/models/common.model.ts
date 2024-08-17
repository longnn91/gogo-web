import { Palette } from '@mui/material';

export interface BaseItem<T> {
  text: string;
  value: T;
}

export interface GraphqlResponse<T> {
  data: {
    [key: string]: T;
  };
}

export type OrderType = 'asc' | 'desc';

export interface SortConfig {
  name: string;
  type: OrderType | null;
}

export interface FilterOptions {
  [key: string]: string[];
}
export interface PaginationParams {
  pageSize: number;
  total: number;
}

export interface ErrorResponse {
  data: {
    tradCode: string;
    message?: string;
  };
}
export interface QueryParams {
  status?: number;
  limit?: number;
  text?: string;
  page?: number;
  type?: string;
  sort?: {
    order: 'asc' | 'desc';
    byKey: string;
  };
  order?: OrderType;
  id?: string;

  [key: string]: any;
}
export interface TBD<T> {
  [key: string]: T;
}

export enum FileTypes {
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  IMAGE = 'IMAGE',
  UPLOAD_VIDEO = 'UPLOAD_VIDEO',
  UNKNOW = 'UNKNOW',
  IFRAME = 'IFRAME',
}

export type FunctionType<T extends any[] = []> = (...arg: T) => void;

export type ValidFileType = { isValid: boolean; errorMessage: string };
export interface Option {
  label: string;
  [key: string]: any;
}

type AppConfigItem = {
  active: boolean;
  value?: any;
};
export interface AppConfig {
  title: string;
  themeConfig: Palette;
}

export interface MenuNode {
  name: string;
  disabled?: boolean;
  order?: number;
  icon: (props: React.HTMLAttributes<SVGSVGElement>) => JSX.Element;
  route?: (params?: { [key: string]: string }) => string;
  onClick?: () => void;
}

export type IGender = 'male' | 'female';

export type BrowserType =
  | 'Chrome'
  | 'Firefox'
  | 'Trident'
  | 'Opera'
  | 'UCBrowser';
