import React, { FC, useState, useEffect } from "react";
import { db } from "../config/firebese";
import { ErrorDetail } from "../types";
import { noticeCategory } from "../utils";
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
  const [errorMessage, setErrorMessage] = useState<ErrorDetail>();

  const noticeRef = db.collection("notice").doc("f3068OjZY4BqCj3QiLjO");
  useEffect(() => {
    noticeRef.onSnapshot((snap) => setDbData(snap.data() as Notice));
  }, []);

  const noticeObj = { none: "", holiday, other };

  const addDBNotice = () => {
    if (!noticeObj[selected]) {
      return setErrorMessage({
        message: "入力してください",
      });
    } else {
      noticeRef
        .update({ [selected]: noticeObj[selected] })
        .then(() =>
          setErrorMessage({
            message: "",
          })
        )
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
      return setErrorMessage({
        message: "選択してください",
      });
    } else {
      setHoliday("");
      setOther("");
      addDBNotice();
    }
  };

  return (
    <EditStyle
      title="休日・その他"
      id="other"
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
      errorMessage={errorMessage ? errorMessage.message : ""}
    />
  );
};

export default NoticeEdit;
