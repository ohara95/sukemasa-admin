import React, { useState, useEffect } from "react";
import { db } from "../config/firebese";
import { Label, Select } from "../atoms";
import { editMenuDb } from "../utils";
import SelectButton from "../molecules/SelectButton";
import {
  category,
  cuisineCategory,
  drinkCategory,
  recommendCategory,
} from "../utils/optionData";
import MiddleCategory from "./MiddleCategory";
import ToggleButton from "../molecules/ToggleButton";

type SalesDetail = {
  price: number;
  category: string;
  item: string;
  id: string;
};

type MethodProps = "add" | "edit" | "delete" | "none" | "";
type Category = "none" | "cuisine" | "drink" | "recommend";

const MenuEdit = () => {
  const [cuisine, setCuisine] = useState("");
  const [drink, setDrink] = useState("");
  const [recommend, setRecommend] = useState("");
  const [price, setPrice] = useState("");
  const [method, setMethod] = useState<MethodProps>("");

  const [dbData, setDbData] = useState<SalesDetail[]>([]);
  const [selectCuisine, setSelectCuisine] = useState("none");
  const [selectDrink, setSelectDrink] = useState("none");
  const [selectRecommend, setSelectRecommend] = useState("none");
  const [selectCategory, setSelectCategory] = useState<Category>("none");
  const [selectId, setSelectId] = useState("");

  const menuRef = db.collection("menu").doc("ya3NEbDICuOTwfUWcHQs");
  const methodObj = { none: "", cuisine, drink, recommend };

  /** DBからデータ取得*/
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

  useEffect(() => {
    if (method === "add") setSelectId("");
  }, [method]);

  /** 値セット&DBに追加関数発火 */
  const onMenuSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    //---バリデーション---//
    if (selectCategory === "none") {
      return alert("カテゴリーを選択してください(大)");
    } else if (
      selectCuisine === "none" &&
      selectDrink === "none" &&
      selectRecommend === "none"
    ) {
      return alert("カテゴリーを選択してください(中)");
    } else if (selectId === "" && method !== "add") {
      return alert("カテゴリーを選択してください(小)");
    }
    //----バリデーション---//

    //memo 短くしたい...
    switch (selectCategory) {
      case "cuisine":
        editMenuDb(
          cuisine,
          price,
          method,
          selectCuisine,
          selectCategory,
          selectId,
          setCuisine,
          setPrice
        );
        break;
      case "drink":
        editMenuDb(
          drink,
          price,
          method,
          selectDrink,
          selectCategory,
          selectId,
          setDrink,
          setPrice
        );
        break;
      case "recommend":
        editMenuDb(
          recommend,
          price,
          method,
          selectRecommend,
          selectCategory,
          selectId,
          setRecommend,
          setPrice
        );
        break;
      default:
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

  // 大分類に応じて中分類セレクトを出す
  const selected = () => {
    if (selectCategory === "cuisine") {
      return (
        <MiddleCategory
          setState={setSelectCuisine}
          optionData={cuisineCategory}
        />
      );
    }
    if (selectCategory === "drink") {
      return (
        <MiddleCategory setState={setSelectDrink} optionData={drinkCategory} />
      );
    }
    if (selectCategory === "recommend") {
      return (
        <MiddleCategory
          setState={setSelectRecommend}
          optionData={recommendCategory}
        />
      );
    }
  };

  /** 変更か削除だったらメニュー名と金額をみれるようにする */
  const editOption = () => {
    let item = "";
    switch (selectCategory) {
      case "cuisine":
        item = selectCuisine;
        break;
      case "drink":
        item = selectDrink;
        break;
      case "recommend":
        item = selectRecommend;
        break;
      default:
    }

    if (dbData) {
      const category = dbData.filter((el) => el.category === item);
      return category.map((el) => (
        <option key={el.id} value={el.id}>
          {el.item} ¥{el.price}
        </option>
      ));
    }
  };

  return (
    <>
      <div id="section1" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="メニュー" size="xl" />
            </div>
            <SelectButton setState={setMethod} select={method} />
          </div>
          {method !== "" && (
            <>
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <Label text="メニューカテゴリ(大分類)" />
                </div>
                <div className="md:w-2/3 border-gray-400 border-2 rounded">
                  <Select
                    onChange={(e) => {
                      setSelectCategory(e.target.value as Category);
                    }}
                  >
                    {category.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {selectCategory !== "none" && (
                <div className="md:flex mb-6">
                  <div className="md:w-1/3">
                    <Label text="メニューカテゴリ(中分類)" />
                  </div>
                  <div className="md:w-2/3 border-gray-400 border-2 rounded">
                    {selected()}
                  </div>
                </div>
              )}

              {(selectDrink !== "none" ||
                selectCuisine !== "none" ||
                selectRecommend !== "none") &&
                method !== "add" && (
                  <div className="md:flex mb-6">
                    <div className="md:w-1/3">
                      <Label text="メニューカテゴリ(小分類)" />
                    </div>
                    <div className="md:w-2/3 border-gray-400 border-2 rounded">
                      <Select onChange={(e) => setSelectId(e.target.value)}>
                        <option value="none">選択してください</option>
                        {editOption()}
                      </Select>
                    </div>
                  </div>
                )}

              {method !== "delete" && (
                <>
                  <div className="md:flex mb-6">
                    <div className="md:w-1/3">
                      <Label text="メニュー名" />
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="w-full border-gray-400 border-2 rounded py-3 px-3"
                        value={methodObj[selectCategory]}
                        onChange={(e) => {
                          controlChange(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:flex mb-6">
                    <div className="md:w-1/3">
                      <Label text="金額" />
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="w-full border-gray-400 border-2 rounded py-3 px-3"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        type="number"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="md:flex md:items-center">
                <div className="md:w-1/3 " />
                <ToggleButton select={method} func={onMenuSubmit} />
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default MenuEdit;
