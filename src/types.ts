import firebase from "./config/firebese";

export type DBDATA = {
  date: firebase.firestore.Timestamp;
  buysPrice?: number[];
  salesPrice?: number[];
  detail?: string[];
  id: string;
}[];

export type Sales = {
  date: firebase.firestore.Timestamp;
  salesPrice: number;
  id: string;
  isChecked?: boolean;
};

export type Buys = {
  date: firebase.firestore.Timestamp;
  buysPrice: number;
  detail: string;
  id: string;
  isChecked?: boolean;
};

export type ToggleTable = "chooseMonth" | "months" | "year" | "none";

export type Todo = {
  content: string;
  id: string;
  isDone: boolean;
};

export type CombineData = {
  date: firebase.firestore.Timestamp;
  salesPrice: number;
  buysPrice: number;
  detail: string;
  id: string;
};

export type ErrorDetail = {
  message: string;
  type?: string;
};
