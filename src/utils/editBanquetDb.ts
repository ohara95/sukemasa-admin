import { db } from "../config/firebese";
import { errors } from "../utils";
import { ErrorDetail } from "../types";

export const editBanquetDb = (
  select: "add" | "edit" | "delete" | "none" | "",
  title: string,
  price: string,
  detail: string,
  id: string,
  clearTitle: (param: string) => void,
  clearPrice: (param: string) => void,
  clearDetail: (param: string) => void,
  setErrorMessages: (param: ErrorDetail) => void
) => {
  const banquetRef = db.collection("banquetMenu");
  const reset = () => {
    setErrorMessages({
      isError: false,
      errorMessage: "",
      errorName: "",
    });
  };
  //バリデーション
  if (select === "add") {
    if (!title || !price || !detail) {
      return setErrorMessages({
        isError: true,
        errorMessage: errors[8],
        errorName: "course",
      });
    } else {
      banquetRef
        .add({
          title,
          price: parseInt(price),
          detail,
        })
        .then(() => {
          clearTitle("");
          clearPrice("");
          clearDetail("");
          reset();
        });
    }
  } else if (select === "edit") {
    if (!title && !price && !detail) {
      return setErrorMessages({
        isError: true,
        errorMessage: errors[1],
        errorName: "course",
      });
    } else {
      banquetRef
        .doc(id)
        .get()
        .then((res) => {
          if (title) {
            res.ref.update({ title }).then(() => {
              clearTitle("");
              reset();
            });
          } else if (price) {
            res.ref.update({ price: parseInt(price) }).then(() => {
              clearPrice("");
              reset();
            });
          } else if (detail) {
            res.ref.update({ detail }).then(() => {
              clearDetail("");
              reset();
            });
          }
        });
    }
  } else if (select === "delete") {
    banquetRef
      .doc(id)
      .delete()
      .then(() => reset());
  }
};
