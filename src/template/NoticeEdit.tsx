import React, { FC, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { errorData } from "../recoil_atoms";
import { db } from "../config/firebese";
import { noticeCategory, errors } from "../utils";
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
  const [errorMessages, setErrorMessages] = useRecoilState(errorData);

  const noticeRef = db.collection("notice").doc("f3068OjZY4BqCj3QiLjO");
  useEffect(() => {
    noticeRef.onSnapshot((snap) => setDbData(snap.data() as Notice));
  }, []);

  const noticeObj = { none: "", holiday, other };

  const addDBNotice = () => {
    if (!noticeObj[selected]) {
      return setErrorMessages({
        isError: true,
        errorMessage: errors[1],
        errorName: "notice",
      });
    } else {
      noticeRef
        .update({ [selected]: noticeObj[selected] })
        .then(() =>
          setErrorMessages({
            isError: false,
            errorMessage: "",
            errorName: "",
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
      return setErrorMessages({
        isError: true,
        errorMessage: errors[3],
        errorName: "notice",
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
      errorMessages={errorMessages}
      alertType="notice"
    />
  );
};

export default NoticeEdit;
