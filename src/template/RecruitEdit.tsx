import React, { useState, useEffect } from "react";
import { db } from "../config/firebese";
import { Label, Select, Textarea } from "../atoms";
import { recruitCategory } from "../utils/optionData";

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

  const recruitRef = db.collection("recruit").doc("eTLykSLZuPvi6iJ48vNB");
  useEffect(() => {
    recruitRef.onSnapshot((snap) => setDbData(snap.data() as Recruit));
  }, []);

  const recruitObj = { none: "", work, wont, terms, time, welfare };

  const addDBRecruit = () => {
    if (!recruitObj[selected]) {
      return alert("入力してください");
    } else {
      db.collection("recruit")
        .doc("eTLykSLZuPvi6iJ48vNB")
        .update({ [selected]: recruitObj[selected] })
        .then()
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

  const onNoticeSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selected === "none") {
      return alert("選択してください");
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
    <>
      <div id="section4" className="p-8 mt-6 lg:mt-0 rounded">
        <form>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="求人" size="xl" />
            </div>
          </div>

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <Label text="投稿内容" />
            </div>
            <div className="md:w-2/3 border-gray-400 border-2 rounded">
              <Select
                onChange={(e) => {
                  setSelected(e.target.value as Select);
                }}
              >
                {recruitCategory.map((category) => (
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
                value={recruitObj[selected]}
                onChange={(e) => {
                  selectChange(e.target.value as Select);
                }}
                placeholder={dbData?.[selected]}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3 flex justify-end">
              <button
                onClick={onNoticeSubmit}
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                type="button"
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

export default RecruitEdit;
