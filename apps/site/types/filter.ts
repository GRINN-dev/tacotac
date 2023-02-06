export interface iSelectData {
  title: string;
  value: string;
  type?: string;
}

export interface iTypeFilter {
  title: string;
  value: string;
}

export interface iData {
  Nom: string;
  Lieu: string;
  "Commence le": string;
  "Debut inscription": string;
  "Fin inscription": string;
  Participants: number;
}

export interface iDataOrga {
  Nom: string;
  Description: string;
}

export enum Type {
  "string" = "string",
  "date" = "date",
}

export interface iHeader {
  title: string;
  value: string;
  type: Type;
}

export interface DataRow {
  [key: string]: any;
}