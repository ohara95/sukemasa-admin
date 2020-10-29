import React, { FC, useState, useEffect } from "react";
import firebase, { db } from "../config/firebese";
import { Label, Select, Textarea } from "../atoms";
import { noticeCategory } from "../utils/optionData";
import EditStyle from "../organisms/EditStyle";

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
    <EditStyle
      title="休日・その他"
      onChangeSelect={(e) => {
        setSelected(e.target.value as selectedProps);
      }}
      selectCategory={noticeCategory}
      onChangeText={(e) => {
        selectChange(e.target.value);
      }}
      value={noticeObj[selected]}
      placeholder={dbData?.[selected]}
      onClick={onNoticeSubmit}
    />
  );
};

export default NoticeEdit;
