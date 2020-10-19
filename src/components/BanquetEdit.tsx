import React, { useState, useEffect } from "react";
import { db } from "../config/firebese";
import { Label, Select, Textarea } from "../atoms";
import SelectButton from "../molecules/SelectButton";
import ToggleButton from "../molecules/ToggleButton";
import { editBanquetDb } from "../utils/editBanquetDb";

type Detail = {
  detail: string;
  price: number;
  title: string;
  id: string;
};

type MethodProps = "add" | "edit" | "delete" | "none" | "";

const BanquetEdit = () => {
  const [dbData, setDbData] = useState<Detail[]>([]);
  const [method, setMethod] = useState<MethodProps>("");
  const [detail, setDetail] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [selectId, setSelectId] = useState("");

  /** DBデータ取得 */
  useEffect(() => {
    db.collection("banquetMenu").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDbData(data as Detail[]);
    });
  }, []);

  /** 金額一覧をセレクタに表示 */
  const selectMenu = () => {
    return dbData.map((select) => {
      return (
        <option key={select.id} value={select.id}>
          {select.title} ¥{select.price}
        </option>
      );
    });
  };

  const displayPlaceholder = () => {
    const findData = dbData.find((select) => select.id === selectId)?.detail;
    if (findData === undefined) {
      return;
    } else {
      return findData;
    }
  };

  const editMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (method !== "add" && selectId === "") {
      return alert("コースを選択してください");
    }
    editBanquetDb(
      method,
      course,
      price,
      detail,
      selectId,
      setCourse,
      setPrice,
      setDetail
    );
  };

  return (
    <>
      <div id="section2" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="コースメニュー" size="xl" />
            </div>
            <SelectButton setState={setMethod} select={method as MethodProps} />
          </div>

          {method !== "" && (
            <>
              {method !== "add" && (
                <div className="md:flex mb-6">
                  <div className="md:w-1/3">
                    <Label text="コース選択" />
                  </div>
                  <div className="md:w-2/3 border-gray-400 border-2 rounded">
                    <Select
                      onChange={(e) => {
                        setSelectId(e.target.value);
                      }}
                    >
                      <option value="none">選択して下さい</option>
                      {selectMenu()}
                    </Select>
                  </div>
                </div>
              )}
              {method !== "delete" && (
                <>
                  <div className="md:flex mb-6">
                    <div className="md:w-1/3">
                      <Label text="コース名" />
                    </div>
                    <div className="md:w-2/3 ">
                      <input
                        className="w-full border-gray-400 border-2 rounded py-3 px-3"
                        type="text"
                        value={course}
                        onChange={(e) => {
                          setCourse(e.target.value);
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
                        type="number"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="md:flex mb-6">
                      <div className="md:w-1/3">
                        <Label text="入力欄" />
                      </div>
                      <div className="md:w-2/3">
                        <Textarea
                          value={detail}
                          onChange={(e) => {
                            setDetail(e.target.value);
                          }}
                          placeholder={displayPlaceholder()}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3" />
                <ToggleButton select={method as MethodProps} func={editMenu} />
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default BanquetEdit;
