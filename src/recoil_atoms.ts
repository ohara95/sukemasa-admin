import { atom } from "recoil";
import { Todo } from "./types";

export const todoData = atom<Todo[]>({
  key: "todoData",
  default: [],
});

export const todoIsEdit = atom({
  key: "todoIsEdit",
  default: false,
});

export const todoEditId = atom({
  key: "todoEditId",
  default: "",
});

export const todoEdit = atom({
  key: "todoEdit",
  default: "",
});
