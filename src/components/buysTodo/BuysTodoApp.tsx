import React, { useState } from "react";
import BuysTodoForm from "./BuysTodoForm";
import BuysTodoList from "./BuysTodoList";

const BuysTodoApp = () => {
  const [content, setContent] = useState("");

  return (
    <>
      <BuysTodoForm content={content} setContent={setContent} />
      <div className="h-64 overflow-y-scroll">
        <BuysTodoList />
      </div>
    </>
  );
};

export default BuysTodoApp;
