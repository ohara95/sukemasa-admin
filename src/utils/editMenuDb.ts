import { db } from "../config/firebese";
import { errors } from "../utils";
import { ErrorDetail } from "../types";

export const editMenuDb = (
  item: string,
  price: string,
  selectMethod: "add" | "edit" | "delete" | "none" | "",
  selectCategory: string,
  name: string,
  id: string,
  clearItem: (param: string) => void,
  clearPrice: (param: string) => void,
  setErrorMessage: (param: ErrorDetail) => void
) => {
  const Ref = db
    .collection("menu")
    .doc("ya3NEbDICuOTwfUWcHQs")
    .collection(name);

  const reset = () =>
    setErrorMessage({ isError: false, errorMessage: "", errorName: "" });

  if (selectMethod === "add") {
    if (!item || !price) {
      return setErrorMessage({
        isError: true,
        errorMessage: errors[8],
        errorName: "menu",
      });
    }
    Ref.add({
      item,
      price: parseInt(price),
      category: selectCategory,
    }).then(() => {
      clearItem("");
      clearPrice("");
      reset();
    });
  } else if (selectMethod === "edit") {
    if (!item && !price) {
      return setErrorMessage({
        isError: true,
        errorMessage: errors[1],
        errorName: "menu",
      });
    } else {
      Ref.doc(id)
        .get()
        .then((res) => {
          if (!price) {
            res.ref.update({ item });
          } else if (!item) {
            res.ref.update({ price: parseInt(price) });
          }
        })
        .then(() => {
          clearItem("");
          clearPrice("");
          reset();
        });
    }
  } else if (selectMethod === "delete") {
    Ref.doc(id)
      .get()
      .then((res) => res.ref.delete())
      .then(() => reset());
  }
};
