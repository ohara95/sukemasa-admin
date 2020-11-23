import { atom, selector } from "recoil";
import { Todo } from "./types";
import { db } from "./config/firebese";

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

// export const firebaseSelector = selector({
//   key: "firebaseSelector",
//   get: ({ get }) => {
//     db.collection("todos")
//       .get()
//       .then((res) => {
//         res.docs.map((doc) => get(doc.data() as any));
//       });
//   },
// });
