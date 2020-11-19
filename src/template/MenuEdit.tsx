import React, { useState, useEffect } from "react";
import { ErrorDetail } from "../types";
import EditOutline from "../organisms/EditOutline";
import {
  editMenuDb,
  category,
  cuisineCategory,
  drinkCategory,
  recommendCategory,
} from "../utils";
import ToggleButton from "../molecules/ToggleButton";
import CategoryOutline from "../organisms/CategoryOutline";
import InputOutline from "../organisms/InputOutline";
import { db } from "../config/firebese";
import { useFirebaseSub } from "../hooks/useFirebaseSub";

type SalesDetail = {
  price: number;
  category: string;
  item: string;
  id: string;
};

type MethodProps = "add" | "edit" | "delete" | "";
type Category = "none" | "cuisine" | "drink" | "recommend";
type OptionData = { value: string; name: string }[];

const MenuEdit = () => {
  const [cuisine, setCuisine] = useState("");
  const [drink, setDrink] = useState("");
  const [recommend, setRecommend] = useState("");
  const [price, setPrice] = useState("");
  const [method, setMethod] = useState<MethodProps>("");

  const [selectCuisine, setSelectCuisine] = useState("none");
  const [selectDrink, setSelectDrink] = useState("none");
  const [selectRecommend, setSelectRecommend] = useState("none");
  const [selectCategory, setSelectCategory] = useState<Category>("none");
  const [selectId, setSelectId] = useState("");
  const [errorMessage, setErrorMessage] = useState<ErrorDetail>();
  // const dbData = useFirebaseSub<SalesDetail>(
  //   "menu",
  //   "ya3NEbDICuOTwfUWcHQs",
  //   selectCategory,
  //   selectCategory
  // );

  const [dbData, setDbData] = useState<SalesDetail[]>([]);
  const menuRef = db.collection("menu").doc("ya3NEbDICuOTwfUWcHQs");
  const methodObj = { none: "", cuisine, drink, recommend };

  useEffect(() => {
    if (method === "add") setSelectId("");
  }, [method]);

  useEffect(() => {
    menuRef.collection(selectCategory).onSnapshot((snap) => {
      const menu = snap.docs.map((doc) => {
        return {
          ...(doc.data() as SalesDetail),
          id: doc.id,
        };
      });
      setDbData(menu);
    });
  }, [selectCategory]);

  //---セレクタバリデーション---//
  useEffect(() => {
    if (!method) {
      setErrorMessage({
        message: "選択してください",
      });
    } else {
      if (selectCategory === "none") {
        setErrorMessage({
          message: "カテゴリーを選択してください(大分類)",
        });
      } else if (
        selectCuisine === "none" &&
        selectDrink === "none" &&
        selectRecommend === "none"
      ) {
        setErrorMessage({
          message: "カテゴリーを選択してください(中分類)",
        });
      } else if (method !== "add") {
        if (!selectId) {
          setErrorMessage({
            message: "カテゴリーを選択してください(小分類)",
          });
        }
      } else {
        setErrorMessage({ message: "" });
      }
    }
  }, [
    method,
    selectCategory,
    selectId,
    selectCuisine,
    selectDrink,
    selectRecommend,
  ]);

  /** 値セット&DBに追加関数発火 */
  const onMenuSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const callMenuDbType = (
      item: string,
      selectMethod: string,
      setter: (param: string) => void
    ) => {
      editMenuDb(
        item,
        price,
        method,
        selectMethod,
        selectCategory,
        selectId,
        setter,
        setPrice,
        setErrorMessage
      );
    };
    switch (selectCategory) {
      case "cuisine":
        return callMenuDbType(cuisine, selectCuisine, setCuisine);
      case "drink":
        return callMenuDbType(drink, selectDrink, setDrink);
      case "recommend":
        return callMenuDbType(recommend, selectRecommend, setRecommend);
      default:
        return;
    }
  };

  /** 大分類の値を制御 */
  const controlChange = (value: string) => {
    switch (selectCategory) {
      case "cuisine":
        return setCuisine(value);
      case "drink":
        return setDrink(value);
      case "recommend":
        return setRecommend(value);
      default:
    }
  };

  /** 中分類表示 */
  const selected = (selectCategory: Category) => {
    const selectType = (setter: (param: string) => void, data: OptionData) => {
      return (
        <CategoryOutline
          text="メニューカテゴリ(中分類)"
          onChange={(e) => {
            setter(e.target.value);
          }}
          optionData={data}
        />
      );
    };
    if (selectCategory === "cuisine") {
      return selectType(setSelectCuisine, cuisineCategory);
    } else if (selectCategory === "drink") {
      return selectType(setSelectDrink, drinkCategory);
    } else if (selectCategory === "recommend") {
      return selectType(setSelectRecommend, recommendCategory);
    }
  };

  /** 小分類表示 */
  const editOption = (type: Category) => {
    const selectOption = (option: string) => {
      if (dbData) {
        const category = dbData.filter((el) => el.category === option);

        return (
          <CategoryOutline
            text="メニューカテゴリ(小分類)"
            onChange={(e) => setSelectId(e.target.value)}
            dbData={category}
          />
        );
      }
    };
    switch (type) {
      case "cuisine":
        return selectOption(selectCuisine);
      case "drink":
        return selectOption(selectDrink);
      case "recommend":
        return selectOption(selectRecommend);
      default:
        return;
    }
  };

  return (
    <>
      <EditOutline
        title="メニュー"
        setState={setMethod}
        select={method}
        alertText={errorMessage ? errorMessage.message : ""}
        id="menu"
      >
        {method && (
          <>
            <CategoryOutline
              text="メニューカテゴリ(大分類)"
              onChange={(e) => {
                setSelectCategory(e.target.value as Category);
              }}
              optionData={category}
            />

            {selectCategory !== "none" && selected(selectCategory)}

            {(selectDrink !== "none" ||
              selectCuisine !== "none" ||
              selectRecommend !== "none") &&
              method !== "add" &&
              editOption(selectCategory)}

            {method !== "delete" && (
              <>
                <InputOutline
                  text="メニュー名"
                  value={methodObj[selectCategory]}
                  onChange={(e) => {
                    controlChange(e.target.value);
                  }}
                  type="text"
                />
                <InputOutline
                  text="金額"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  type="number"
                />
              </>
            )}

            <div className="md:flex md:items-center">
              <div className="md:w-1/3 " />
              <ToggleButton select={method} onClick={onMenuSubmit} />
            </div>
          </>
        )}
      </EditOutline>
    </>
  );
};

export default MenuEdit;
