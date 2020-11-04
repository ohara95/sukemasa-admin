import React, { useState, useEffect } from "react";
import { db } from "../config/firebese";
import { ErrorDetail } from "../types";
import { Select } from "../atoms";
import { recruitCategory } from "../utils/optionData";
import EditStyle from "../organisms/EditStyle";

type Recruit = {
  work: string;
  wont: string;
  terms: string;
  time: string;
  welfare: string;
  [param: string]: string;
};

type Select = "work" | "wont" | "terms" | "time" | "welfare" | "none";

const RecruitEdit = () => {
  const [selected, setSelected] = useState<Select>("none");

  const [work, setWork] = useState("");
  const [wont, setWont] = useState("");
  const [terms, setTerms] = useState("");
  const [time, setTime] = useState("");
  const [welfare, setWelfare] = useState("");
  const [dbData, setDbData] = useState<Recruit>();
  const [errorMessage, setErrorMessage] = useState<ErrorDetail>();

  const recruitRef = db.collection("recruit").doc("eTLykSLZuPvi6iJ48vNB");
  useEffect(() => {
    recruitRef.onSnapshot((snap) => setDbData(snap.data() as Recruit));
  }, []);

  const recruitObj = { none: "", work, wont, terms, time, welfare };

  const addDBRecruit = () => {
    if (!recruitObj[selected]) {
      return setErrorMessage({
        message: "入力してください",
      });
    } else {
      db.collection("recruit")
        .doc("eTLykSLZuPvi6iJ48vNB")
        .update({ [selected]: recruitObj[selected] })
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

  const selectChange = (value: Select) => {
    switch (selected) {
      case "work":
        return setWork(value);
      case "wont":
        return setWont(value);
      case "terms":
        return setTerms(value);
      case "time":
        return setTime(value);
      case "welfare":
        return setWelfare(value);
      default:
        break;
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (selected === "none") {
      return setErrorMessage({
        message: "選択してください",
      });
    } else {
      addDBRecruit();
      setWork("");
      setWont("");
      setTerms("");
      setTime("");
      setWelfare("");
    }
  };

  return (
    <EditStyle
      title="求人"
      id="recruit"
      onChangeSelect={(e) => {
        setSelected(e.target.value as Select);
      }}
      selectCategory={recruitCategory}
      onChangeText={(e) => {
        selectChange(e.target.value as Select);
      }}
      value={recruitObj[selected]}
      placeholder={dbData?.[selected]}
      onClick={onSubmit}
      errorMessage={errorMessage?.message ? errorMessage.message : ""}
    />
  );
};

export default RecruitEdit;
