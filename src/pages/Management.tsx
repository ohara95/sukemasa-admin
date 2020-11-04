import React, { FC, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import * as H from "history";
import { Sales, Buys, ToggleTable, CombineData } from "../types";
import { errorData } from "../recoil_atoms";
import { db, auth } from "../config/firebese";
import Header from "../components/Header";

import BuysTodo from "../components/buysTodo";
import ManagementGraph from "../components/ManagementGraph";
import SalesList from "../template/SalesList";
import BuysList from "../template/BuysList";
import SalesInput from "../template/SalesInput";
import BuysInput from "../template/BuysInput";
import { Label, IconPop, Alert } from "../atoms";
import {
  month,
  dbSumCalc,
  graphData,
  allMonthData,
  chooseGraphData,
  sort,
  errors,
  sumData,
} from "../utils";

type Props = {
  history: H.History;
};

const Management: FC<Props> = ({ history }) => {
  const [salesDate, setSalesDate] = useState("");
  const [buysDate, setBuysDate] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [buysPrice, setBuysPrice] = useState("");
  const [buysDetail, setBuysDetail] = useState("");

  const [editSales, setEditSales] = useState("");
  const [editBuys, setEditBuys] = useState("");

  const [toggleTable, setToggleTable] = useState<ToggleTable>("months");
  const [choiceMonth, setChoiceMonth] = useState("none");

  const [dbSales, setDbSales] = useState<Sales[]>([]);
  const [dbBuys, setDbBuys] = useState<Buys[]>([]);
  const [errorMessages, setErrorMessages] = useRecoilState(errorData);
  const setData = [...dbSales, ...dbBuys];
  const salesPriceArr = dbSales.map((data) => {
    return {
      date: data.date,
      price: data.salesPrice,
    };
  });
  const buysPriceArr = dbBuys.map((data) => {
    return {
      date: data.date,
      price: data.buysPrice,
    };
  });
  const managementRef = db.collection("management").doc("NcmaRejmRabdytHQfbKU");
  const salesRef = managementRef.collection("sales");
  const buysRef = managementRef.collection("buys");

  const sumSalesPrice = dbSumCalc(toggleTable, salesPriceArr, choiceMonth);
  const sumBuysPrice = dbSumCalc(toggleTable, buysPriceArr, choiceMonth);

  /** 売上計上 */
  const plusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!salesDate || !salesPrice) {
      setErrorMessages({
        isError: true,
        errorMessage: errors[1],
        errorName: "salesInput",
      });
      return;
    } else {
      setSalesPrice("");
      setSalesDate("");
      salesDB(salesDate, salesPrice);
      setErrorMessages({
        ...errorMessages,
        isError: false,
        errorMessage: "",
        errorName: "",
      });
    }
  };

  /** 経費計上 */
  const minusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!buysPrice || !buysDate || !buysDetail) {
      setErrorMessages({
        isError: true,
        errorMessage: errors[1],
        errorName: "buysInput",
      });
      return;
    } else {
      setBuysPrice("");
      setBuysDate("");
      setBuysDetail("");
      buysDB(buysDate, buysPrice, buysDetail);
      setErrorMessages({
        ...errorMessages,
        isError: false,
        errorMessage: "",
        errorName: "",
      });
    }
  };

  /** 売上をDBに登録 */
  const salesDB = (date: string, price: string) => {
    salesRef
      .add({
        date: new Date(date),
        salesPrice: parseInt(price),
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** 経費をDBに登録 */
  const buysDB = (date: string, price: string, detail: string) => {
    buysRef
      .add({
        date: new Date(date),
        buysPrice: parseInt(price),
        detail,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    /** salesData取得 */
    salesRef.orderBy("date").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDbSales(data as Sales[]);
    });

    /** buysData取得 */
    buysRef.orderBy("date").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDbBuys(data as Buys[]);
    });
  }, []);

  /** 差額表示 */
  const difference = () => {
    if (sumSalesPrice && sumBuysPrice) {
      return (sumSalesPrice as number) - (sumBuysPrice as number);
    } else {
      return 0;
    }
  };

  /** グラフ種類選択 */
  const chooseGraph = () => {
    //@ts-ignore
    const sortData = sort(makeSortData(sumData(setData)));
    switch (toggleTable) {
      case "months":
        //@ts-ignore
        return graphData(sortData);
      case "year":
        //@ts-ignore
        return allMonthData(setData);
      case "chooseMonth":
        if (choiceMonth !== "none") {
          //@ts-ignore
          return chooseGraphData(sortData, choiceMonth);
        }
      default:
        return;
    }
  };

  const makeSortData = (graphData: CombineData[]) => {
    return graphData.map((data) => {
      const salesSort = data.salesPrice;
      const buysSort = data.buysPrice;

      return {
        ...data,
        salesPrice: salesSort,
        buysPrice: buysSort,
      };
    });
  };

  useEffect(() => {
    if (toggleTable !== "chooseMonth") {
      setChoiceMonth("none");
    }
  }, [toggleTable]);

  return (
    <>
      <Header
        onClick={() => {
          history.push("/edit");
        }}
        title="管理画面"
        buttonText="HP編集"
        render={
          <button
            className="fas fa-sign-out-alt text-red-600"
            onClick={() => auth.signOut()}
          />
        }
        single
      />

      <div className="mt-10">
        {errorMessages?.isError && errorMessages.errorName === "graph" && (
          <Alert
            text={errorMessages.errorMessage}
            icon="fas fa-exclamation-circle"
            stylePlus="flex justify-center"
          />
        )}
        <div className="mx-auto my-2 w-2/12 md:w-2/6 md:justify-center flex">
          <button
            onClick={() => {
              setToggleTable("months");
            }}
            className={`${
              toggleTable === "months" ? "bg-teal-600" : "bg-teal-500"
            } text-white rounded-l md:py-3 md:px-5 focus:outline-none`}
          >
            月間
          </button>
          <button
            onClick={() => {
              setToggleTable("year");
            }}
            className={`${
              toggleTable === "year" ? "bg-teal-600" : "bg-teal-500"
            } text-white  md:py-3 md:px-5 focus:outline-none`}
          >
            年間
          </button>
          <select
            value={choiceMonth}
            onChange={(e) => {
              setChoiceMonth(e.target.value);
            }}
            onClick={() => {
              setToggleTable("chooseMonth");
            }}
            className={`${
              toggleTable === "chooseMonth" ? "bg-teal-600" : "bg-teal-500"
            } focus:outline-none md:p-3 rounded-r text-white`}
          >
            <option value="none">未選択</option>
            {month()}
          </select>
        </div>
        <ManagementGraph chooseGraph={chooseGraph()} />
      </div>

      <div className="flex w-11/12 mt-20 mx-auto bg-white rounded justify-between">
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={plusSubmit}>
          <SalesInput
            {...{
              setSalesDate,
              salesPrice,
              setSalesPrice,
              salesDate,
              errorMessages,
            }}
          />
        </form>
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={minusSubmit}>
          <BuysInput
            {...{
              setBuysPrice,
              buysDetail,
              setBuysDetail,
              buysDate,
              setBuysDate,
              buysPrice,
              errorMessages,
            }}
          />
        </form>

        <div className="md:w-5/12 p-3">
          <IconPop text="売上計" color="blue" icon="fas fa-plus">
            {`${sumSalesPrice?.toLocaleString()}円`}
          </IconPop>
          <IconPop text="経費計" color="red" icon="fas fa-minus">
            {`${sumBuysPrice?.toLocaleString()}円`}
          </IconPop>
          <IconPop text="差額" color="green" icon="fas fa-hand-holding-usd">
            {`${difference().toLocaleString()}円`}
          </IconPop>
        </div>
      </div>

      <div className="flex justify-around mx-auto w-11/12 my-5 bg-white px-8 mt-10">
        <div className="w-2/6">
          <Label text="売上表" />
          <div className="h-64 overflow-y-scroll">
            <SalesList
              {...{
                dbSales,
                toggleTable,
                choiceMonth,
                editSales,
                setEditSales,
              }}
            />
          </div>
        </div>
        <div className="w-2/6">
          <Label text="経費表" />
          <div className="h-64 overflow-y-scroll">
            <BuysList
              {...{
                dbBuys,
                buysDetail,
                setBuysDetail,
                toggleTable,
                choiceMonth,
                editBuys,
                setEditBuys,
              }}
            />
          </div>
        </div>
        <div className="w-2/6">
          <Label text="買い物リスト" />
          <BuysTodo />
        </div>
      </div>
    </>
  );
};
export default Management;
