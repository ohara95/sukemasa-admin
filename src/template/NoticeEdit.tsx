import React, { FC, useState, useEffect } from "react";
import firebase, { db } from "../config/firebese";
import { Label, Select, Textarea } from "../atoms";
import { noticeCategory } from "../utils/optionData";

type selectedProps = "holiday" | "other" | "none";
type Notice = {
  holiday: string;
  other: string;
  [param: string]: string;
};

const NoticeEdit: FC = () => {
  const [holiday, setHoliday] = useState("");
  const [other, setOther] = useState("");
  const [selected, setSelected] = useState<selectedProps>("none");
  const [dbData, setDbData] = useState<Notice>();

  const noticeRef = db.collection("notice").doc("f3068OjZY4BqCj3QiLjO");
  useEffect(() => {
    noticeRef.onSnapshot((snap) => setDbData(snap.data() as Notice));
  }, []);

  const noticeObj = { none: "", holiday, other };

  const addDBNotice = () => {
    if (!noticeObj[selected]) {
      return alert("入力してください");
    } else {
      noticeRef
        .update({ [selected]: noticeObj[selected] })
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const selectChange = (value: string) => {
    switch (selected) {
      case "holiday":
        return setHoliday(value);
      case "other":
        return setOther(value);
      default:
        break;
    }
  };

  const onNoticeSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selected === "none") {
      return alert("選択して下さい");
    } else {
      setHoliday("");
      setOther("");
      addDBNotice();
    }
  };

  return (
    <>
      <div id="section4" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="休日・その他" size="xl" />
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="投稿内容" />
            </div>
            <div className="md:w-2/3 border-gray-400 border-2 rounded">
              <Select
                onChange={(e) => {
                  setSelected(e.target.value as selectedProps);
                }}
              >
                {noticeCategory.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="入力欄" />
            </div>
            <div className="md:w-2/3">
              <Textarea
                onChange={(e) => {
                  selectChange(e.target.value);
                }}
                value={noticeObj[selected]}
                placeholder={dbData?.[selected]}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3 flex justify-end">
              <button
                onClick={onNoticeSubmit}
                type="button"
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded "
              >
                送信
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NoticeEdit;
