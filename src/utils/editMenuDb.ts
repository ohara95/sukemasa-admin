import { db } from "../config/firebese";

export const editMenuDb = (
  item: string,
  price: string,
  selectMethod: "add" | "edit" | "delete" | "none" | "",
  selectCategory: string,
  name: string,
  id: string,
  clearItem: (param: string) => void,
  clearPrice: (param: string) => void
) => {
  const Ref = db
    .collection("menu")
    .doc("ya3NEbDICuOTwfUWcHQs")
    .collection(name);

  if (selectMethod === "add") {
    if (!item || !price) {
      return alert("入力漏れがあります");
    }
    Ref.add({
      item,
      price: parseInt(price),
      category: selectCategory,
    }).then(() => {
      clearItem("");
      clearPrice("");
    });
  } else if (selectMethod === "edit") {
    Ref.doc(id)
      .get()
      .then((res) => {
        if (!item && !price) {
          return alert("入力してください");
        } else if (!price) {
          res.ref.update({
            item,
          });
        } else if (!item) {
          res.ref.update({
            price: parseInt(price),
          });
        }
      })
      .then(() => {
        clearItem("");
        clearPrice("");
      });
  } else if (selectMethod === "delete") {
    Ref.doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      })
      .then(() => {
        clearItem("");
        clearPrice("");
      });
  }
};
