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
};

export type Buys = {
  date: firebase.firestore.Timestamp;
  buysPrice: number;
  detail: string;
  id: string;
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

export type Error = {
  1: "入力してください";
  2: "データがありません";
  3: "選択してください";
  4: "ボタンをクリックしてください";
  5: "カテゴリーを選択してください(大分類)";
  6: "カテゴリーを選択してください(中分類)";
  7: "カテゴリーを選択してください(小分類)";
  8: "入力漏れがあります";
  9: "コースを選択してください";
};

export type ErrorDetail = {
  isError: boolean;
  errorMessage: string;
  errorName: string;
};

// type ErrorType =
//   | "notInput"
//   | "notData"
//   | "select"
//   | "click"
//   | "major"
//   | "middle"
//   | "sub";
//   | "omission";
//   type ErrorMessage = "入力してください"|"データがありません"|"選択してください"|"ボタンをクリックしてください"|"カテゴリーを選択してください(大分類)"|"カテゴリーを選択してください(中分類)"|"カテゴリーを選択してください(小分類)"|"入力漏れがあります";
