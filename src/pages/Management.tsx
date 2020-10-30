import React, { FC, useState, useEffect } from "react";
import * as H from "history";
import { Sales, Buys, ToggleTable } from "../types";
import { db } from "../config/firebese";
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
  sumPrice,
  sumData,
} from "../utils";

type Props = {
  history: H.History;
};

type Error = {
  [param: string]: 1 | 2 | 3 | 4;
};

type CombineData = {
  date: firebase.firestore.Timestamp;
  salesPrice: number | number[];
  buysPrice: number | number[];
  detail: string | string[];
  id: string;
};

const Management: FC<Props> = ({ history }) => {
  const [salesDate, setSalesDate] = useState("");
  const [buysDate, setBuysDate] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [buysPrice, setBuysPrice] = useState("");
  const [buysDetail, setBuysDetail] = useState("");

  const [editSales, setEditSales] = useState("");
  const [isSalesEdit, setIsSalesEdit] = useState(false);
  const [salesEditId, setSalesEditId] = useState("");
  const [editBuys, setEditBuys] = useState("");
  const [isBuysEdit, setIsBuysEdit] = useState(false);
  const [buysEditId, setBuysEditId] = useState("");

  const [toggleTable, setToggleTable] = useState<ToggleTable>("months");
  const [choiceMonth, setChoiceMonth] = useState("none");

  const [dbSales, setDbSales] = useState<Sales[]>([]);
  const [dbBuys, setDbBuys] = useState<Buys[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<Error[]>([]);
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
      setErrorMessages([...errorMessages, { salesInput: 1 }]);
      setIsError(true);
      return;
    } else {
      setSalesPrice("");
      setSalesDate("");
      salesDB(salesDate, salesPrice);
      setIsError(false);
    }
  };

  /** 経費計上 */
  const minusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!buysPrice || !buysDate || !buysDetail) {
      setIsError(true);
      setErrorMessages([...errorMessages, { buysInput: 1 }]);
      return;
    } else {
      setBuysPrice("");
      setBuysDate("");
      setBuysDetail("");
      buysDB(buysDate, buysPrice, buysDetail);
      setIsError(false);
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
    // const totalData = sumData(setData);
    // const beforeSortData = makeSortData(totalData)
    // const sortData = sort(beforeSortData)
    switch (toggleTable) {
      case "months":
        //@ts-ignore
        return graphData(sortData);
      case "year":
        //@ts-ignore
        return allMonthData(setData);
      case "chooseMonth":
        //@ts-ignore
        return chooseGraphData(sortData, choiceMonth);
      default:
        return;
    }
  };

  const makeSortData = (graphData: CombineData[]) => {
    return graphData.map((data) => {
      const salesSort =
        data.salesPrice instanceof Array
          ? sumPrice(data.salesPrice)
          : data.salesPrice;
      const buysSort =
        data.buysPrice instanceof Array
          ? sumPrice(data.buysPrice)
          : data.buysPrice;

      return {
        ...data,
        salesPrice: salesSort,
        buysPrice: buysSort,
      };
    });
  };
  //@ts-ignore
  //年間グラフどうにかする
  // console.log(allMonthData(makeSortData(sumData(setData))));

  //memo  他のボタン選択時に未選択(none)に変えたい
  //今はセレクト->表示でnoneに
  //その他表示セレクト選択->noneに
  //表示は未選択にはならない しかもデータ表示されない
  // const choiceBtn = (value: string) => {
  //   setChoiceMonth(value);
  //   console.log(toggleTable); //selectを押すとtoggleTableがnoneになる(そういう設定してない...)

  //   if (toggleTable !== "none") {
  //     setChoiceMonth("none");
  //   }
  // };

  useEffect(() => {
    if (toggleTable === "chooseMonth" && choiceMonth === "none") {
      setIsError(true);
      setErrorMessages([...errorMessages, { graph: 3 }]);
    } else if (
      toggleTable !== ("months" && "year" && "chooseMonth") &&
      choiceMonth !== "none"
    ) {
      //memo toggleTableがなにも選択されてない状態にerrorを出したい
      // setIsError(true);
      // setErrorMessages([...errorMessages, { graph: 4 }]);
    } else {
      setIsError(false);
    }
  }, [toggleTable]);
  const graphErr = errorMessages && errorMessages[0]?.graph;

  return (
    <>
      <Header
        onClick={() => {
          history.push("/edit");
        }}
        title="管理画面"
        buttonText="HP編集"
        logout
      />

      <div>
        {isError && graphErr && (
          <Alert
            text={errors[graphErr]}
            icon="fas fa-exclamation-circle"
            stylePlus="flex justify-center"
          />
        )}
        <div
          onClick={(e) => {
            setToggleTable((e.target as HTMLInputElement).value as ToggleTable);
          }}
          className="mx-auto my-2 w-2/12 flex"
        >
          <button
            value="months"
            className={`${
              toggleTable === "months" ? "bg-teal-600" : "bg-teal-500"
            } text-white px-3 rounded-l`}
          >
            月間
          </button>
          <button
            value="year"
            className={`${
              toggleTable === "year" ? "bg-teal-600" : "bg-teal-500"
            } text-white px-3 rounded-r`}
          >
            年間
          </button>
          <select
            onChange={(e) => {
              setChoiceMonth(e.target.value);
            }}
            className="bg-white"
          >
            <option value="none">未選択</option>
            {month()}
          </select>
          <button
            value="chooseMonth"
            className={`${
              toggleTable === "chooseMonth" ? "bg-teal-600" : "bg-teal-500"
            } text-white py-1 px-3 rounded`}
          >
            表示
          </button>
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
              isError,
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
              isError,
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
                isSalesEdit,
                setIsSalesEdit,
                salesEditId,
                setSalesEditId,
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
                isBuysEdit,
                setBuysEditId,
                buysDetail,
                setBuysDetail,
                setIsBuysEdit,
                buysEditId,
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
