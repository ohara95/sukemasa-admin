import React from "react";

export const month = () => {
  let monthArr = [];
  for (let i = 1; i <= 12; i++) {
    const formatDate = ("0" + i).slice(-2);
    monthArr.push(
      <option key={i.toString()} value={formatDate}>
        {formatDate}月
      </option>
    );
  }
  return monthArr;
};

// const today = new Date().toISOString().slice(0, 10);
const today = new Date();
export const toMonth = today.getMonth() + 1;
