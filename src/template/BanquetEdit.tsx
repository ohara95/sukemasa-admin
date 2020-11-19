import React, { useState, useEffect } from "react";
import { Label, Textarea } from "../atoms";
import { ErrorDetail } from "../types";
import ToggleButton from "../molecules/ToggleButton";
import { editBanquetDb } from "../utils";
import EditOutline from "../organisms/EditOutline";
import CategoryOutline from "../organisms/CategoryOutline";
import { useFirebase } from "../hooks/useFirebase";

type Detail = {
  detail: string;
  price: number;
  title: string;
  id: string;
};

type MethodProps = "add" | "edit" | "delete" | "";

const BanquetEdit = () => {
  const dbData = useFirebase<Detail>("banquetMenu");
  const [method, setMethod] = useState<MethodProps>("");
  const [detail, setDetail] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [selectId, setSelectId] = useState("");
  const [errorMessage, setErrorMessage] = useState<ErrorDetail>();

  const displayPlaceholder = (data: Detail[]) => {
    const findData = data.find((select) => select.id === selectId)?.detail;
    if (findData) return findData;
  };

  useEffect(() => {
    if (!method) {
      setErrorMessage({ message: "選択してください" });
    } else {
      if (method !== "add") {
        if (!selectId) {
          setErrorMessage({
            message: "コースを選択してください",
          });
        } else {
          setErrorMessage({ message: "" });
        }
      } else {
        setErrorMessage({ message: "" });
      }
    }
  }, [method, selectId]);

  const editMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage({ message: "" });
    //バリエーション
    editBanquetDb(
      method,
      course,
      price,
      detail,
      selectId,
      setCourse,
      setPrice,
      setDetail,
      setErrorMessage
    );
  };

  return (
    <>
      <EditOutline
        title="コースメニュー"
        id="banquet"
        setState={setMethod}
        select={method}
        alertText={errorMessage ? errorMessage.message : ""}
      >
        {method && (
          <>
            {method !== "add" && (
              <CategoryOutline
                text="コース選択"
                onChange={(e) => {
                  setSelectId(e.target.value);
                }}
                dbData={dbData}
              />
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
                        placeholder={
                          method === "edit" ? displayPlaceholder(dbData) : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3" />
              <ToggleButton select={method} onClick={editMenu} />
            </div>
          </>
        )}
      </EditOutline>
    </>
  );
};

export default BanquetEdit;
