import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { errorData } from "../recoil_atoms";
import { db } from "../config/firebese";
import { Select } from "../atoms";
import { recruitCategory, errors } from "../utils/optionData";
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
  const [errorMessages, setErrorMessages] = useRecoilState(errorData);

  const recruitRef = db.collection("recruit").doc("eTLykSLZuPvi6iJ48vNB");
  useEffect(() => {
    recruitRef.onSnapshot((snap) => setDbData(snap.data() as Recruit));
  }, []);

  const recruitObj = { none: "", work, wont, terms, time, welfare };

  const addDBRecruit = () => {
    if (!recruitObj[selected]) {
      return setErrorMessages({
        isError: true,
        errorMessage: errors[1],
        errorName: "recruit",
      });
    } else {
      db.collection("recruit")
        .doc("eTLykSLZuPvi6iJ48vNB")
        .update({ [selected]: recruitObj[selected] })
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
      return setErrorMessages({
        isError: true,
        errorMessage: errors[3],
        errorName: "recruit",
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
      errorMessages={errorMessages}
      alertType="recruit"
    />
  );
};

export default RecruitEdit;
