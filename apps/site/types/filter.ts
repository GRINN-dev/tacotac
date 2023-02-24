export interface ISelectData {
  title: string;
  value: string;
  type?: string;
}

export interface ITypeFilter {
  title: string;
  value: string;
}

export interface IHeader {
  title: string;
  value: string;
  type: Type;
  isSortable: boolean;
  isVisible: boolean;
}

export interface IData {
  [key: string]: string | number | React.ReactElement;
}

export enum Type {
  "string" = "string",
  "date" = "date",
  "number" = "number",
}

export interface IHeader {
  title: string;
  value: string;
  type: Type;
}

export interface IDataRow {
  [key: string]: any;
}


//pour pr
export const initLimit = 2;
